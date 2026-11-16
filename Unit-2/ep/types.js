/* Unit 2 exam prep: new question types (norm, assemble, grid, decode) and generated drills.
   Self-contained: the engine only needs to call
     U2T.has(type)                     -> true for the four types here
     U2T.render(item, box, done)       practice mode; calls done(ok, conf) once
     U2T.test(item, box, st)           test mode, no feedback; writes st.resp
     U2T.mark(item, resp)              -> {got, max}
     U2T.max(item)                     -> max marks in the final test
     U2T.gen(item)                     -> a fresh mcq object for items with item.gen, else the item itself
*/
"use strict";
const U2T=(function(){
const CSS=`
.u2 .chips{display:flex;flex-wrap:wrap;gap:6px}
.u2 .chip{border:1px solid var(--line);background:var(--bg);border-radius:6px;padding:5px 9px;cursor:pointer;font:inherit;color:inherit}
.u2 .chip.on{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.u2 .chip.used{opacity:.55}
.u2 .chip.cue{outline:2px solid var(--ok)}
.u2 .chip.miss{outline:2px dashed var(--bad)}
.u2 .boxes{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}
.u2 .tbox{border:2px solid var(--line);border-radius:8px;padding:8px;min-height:70px;background:var(--surface)}
.u2 .tbox.target{border-color:var(--accent);cursor:pointer}
.u2 .tbox h4{margin:0 0 6px;font-family:var(--mono);font-size:.9rem}
.u2 .fld{display:flex;justify-content:space-between;gap:6px;align-items:center;border:1px solid var(--line);border-radius:5px;padding:2px 6px;margin:3px 0;font-size:.9rem;background:var(--bg)}
.u2 .fld.err{border-color:var(--bad);background:var(--bad-soft)}
.u2 .fld button{border:0;background:none;cursor:pointer;color:inherit;padding:0 2px}
.u2 .fld .k{font-weight:700}
.u2 .built{min-height:44px;border:2px dashed var(--line);border-radius:8px;padding:6px;display:flex;flex-wrap:wrap;gap:6px;font-family:var(--mono)}
.u2 .built .chip{font-family:var(--mono)}
.u2 .tiles .chip{font-family:var(--mono)}
.u2 table.qbe{border-collapse:collapse;font-size:.88rem}
.u2 table.qbe th{text-align:left;padding:4px 6px;background:var(--bg);border:1px solid var(--line);white-space:nowrap}
.u2 table.qbe td{border:1px solid var(--line);padding:3px}
.u2 table.qbe select{font:inherit;font-size:.85rem;max-width:170px;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:4px}
.u2 .scroll{overflow-x:auto}
.pts li.ok::marker{content:"✓  ";color:var(--ok)}
.pts li.no::marker{content:"✗  ";color:var(--bad)}
.fb{border-radius:8px;padding:12px 14px;display:grid;gap:6px}
.fb.ok{background:var(--ok-soft)} .fb.no{background:var(--bad-soft)} .fb.part{background:var(--warn-soft)}
.u2 .relrow{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:4px 0}
.u2 .relrow select{font:inherit;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:4px;padding:3px}
.u2 .hint{font-size:.88rem;color:var(--muted)}
`;
if(typeof document!=="undefined"){const s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s);}
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
function h(tag,attrs,...kids){const e=document.createElement(tag);for(const k in (attrs||{})){const v=attrs[k];if(v==null||v===false)continue;if(k.startsWith("on"))e[k]=v;else if(k==="html")e.innerHTML=v;else if(k==="text")e.textContent=v;else e.setAttribute(k,v===true?"":v);}kids.flat().forEach(c=>{if(c==null)return;e.append(c.nodeType?c:document.createTextNode(c));});return e;}
const btn=(text,cls,on)=>h("button",{type:"button",class:cls||"btn",onclick:on},text);
const sameSet=(a,b)=>a.length===b.length&&a.every(x=>b.includes(x));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const ctxOf=it=>typeof it.ctx==="function"?it.ctx():it.ctx;

/* Confidence row then reveal (practice only). Matches the Unit 11 Sure/Unsure/Guess scale. */
function askConf(box,onPick){const r=h("div",{class:"row"},h("span",{class:"small muted"},"How sure are you? "));
  [["sure","Sure"],["unsure","Unsure"],["guess","Guess"]].forEach(([k,l])=>r.append(btn(l,"btn ghost",()=>{r.remove();onPick(k);})));box.append(r);}
function fb(box,state,title,html){box.append(h("div",{class:"fb "+state,role:"status"},h("b",{},title),h("div",{html})));}

/* ============ norm ============ */
function normUI(it,box){
  const S={place:{},pk:{},rel:[["",""],["",""],["",""]]};
  it.extract.cols.forEach(f=>S.place[f]=[]);it.tables.forEach(t=>S.pk[t]=[]);
  let picked=null;const wrap=h("div",{class:"u2"});
  const chipsEl=h("div",{class:"chips","aria-label":"Fields from the extract"}),boxesEl=h("div",{class:"boxes"}),relEl=h("div");
  function draw(){
    chipsEl.innerHTML="";boxesEl.innerHTML="";
    it.extract.cols.forEach(f=>{const c=btn(f,"chip"+(picked===f?" on":"")+(S.place[f].length?" used":""),()=>{picked=picked===f?null:f;draw();});c.setAttribute("aria-pressed",picked===f);chipsEl.append(c);});
    it.tables.forEach(t=>{const b=h("div",{class:"tbox"+(picked?" target":""),tabindex:picked?"0":null,role:picked?"button":null,"aria-label":picked?"Add "+picked+" to "+t:t});
      const add=()=>{if(!picked)return;if(!S.place[picked].includes(t))S.place[picked].push(t);picked=null;draw();};
      b.onclick=e=>{if(e.target.closest("button"))return;add();};b.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();add();}};
      b.append(h("h4",{},t));
      it.extract.cols.filter(f=>S.place[f].includes(t)).forEach(f=>{const isK=S.pk[t].includes(f);
        b.append(h("div",{class:"fld","data-f":f,"data-t":t},h("span",{},isK?h("span",{class:"k"},"🔑 "):null,f),h("span",{},
          btn(isK?"unkey":"key",null,()=>{S.pk[t]=isK?S.pk[t].filter(x=>x!==f):S.pk[t].concat(f);draw();}),
          btn("✕",null,()=>{S.place[f]=S.place[f].filter(x=>x!==t);S.pk[t]=S.pk[t].filter(x=>x!==f);draw();}))));});
      boxesEl.append(b);});
  }
  const opt=(v)=>[h("option",{value:""},"choose…"),...it.tables.map(t=>h("option",{value:t,selected:v===t},t))];
  S.rel.forEach((r,i)=>{const a=h("select",{"aria-label":"Relationship "+(i+1)+" one side",onchange:e=>{S.rel[i][0]=e.target.value;}},opt(r[0])),b=h("select",{"aria-label":"Relationship "+(i+1)+" many side",onchange:e=>{S.rel[i][1]=e.target.value;}},opt(r[1]));relEl.append(h("div",{class:"relrow"},"One ",a," → many ",b));});
  wrap.append(h("p",{class:"hint"},"Tap a field, then tap the table it belongs in. A field can go in more than one table. Use key to mark a primary key."),chipsEl,boxesEl,h("h4",{},"Relationships"),relEl);
  if(it.extract&&it.extract.rows)box.append(h("details",{},h("summary",{},"Show the data extract"),h("div",{html:mockSheet(it.extract.cols,it.extract.rows,{name:"Data extract"})})));
  box.append(wrap);draw();
  return {resp:()=>JSON.parse(JSON.stringify(S)),wrap};
}
function normScore(it,r){
  const bad=[];it.extract.cols.forEach(f=>{const want=it.sol[f]||[],got=r.place[f]||[];let wrong=!sameSet(want,got);
    if(!wrong)want.forEach(t=>{if((it.pk[t]||[]).includes(f)!==(r.pk[t]||[]).includes(f))wrong=true;});if(wrong)bad.push(f);});
  const t1=bad.length===0?4:bad.length===1?3:bad.length===2?2:1;
  const rs=it.rel.map(x=>x.join(">")),gotRel=(r.rel||[]).map(x=>x.join(">"));const right=rs.filter(x=>gotRel.includes(x)).length;
  const t2=right===rs.length?4:right===rs.length-1?3:right>=1?2:1;
  return {bad,t1,t2,right,ok:t1===4&&right===rs.length,got:(t1===4?2:t1===3?1:0)+(right===rs.length?2:right===rs.length-1?1:0),max:4};
}
function normFeedback(it,box,r,ui){const s=normScore(it,r);
  ui.wrap.querySelectorAll(".fld").forEach(e=>{if(s.bad.includes(e.dataset.f))e.classList.add("err");});
  let html=`<p><b>Fields:</b> ${s.bad.length?s.bad.length+" field"+(s.bad.length>1?"s":"")+" wrong":"all right"} → Band ${s.t1} for Trait 1. <b>Relationships:</b> ${s.right} of ${it.rel.length} right → Band ${s.t2} for Trait 2.</p>`;
  if(s.bad.length)html+="<ul>"+s.bad.map(f=>`<li><b>${esc(f)}</b> goes in ${it.sol[f].map(esc).join(" and ")}${Object.keys(it.pk).filter(t=>it.pk[t].includes(f)).length?" (key in "+Object.keys(it.pk).filter(t=>it.pk[t].includes(f)).join(", ")+")":""}. ${it.why&&it.why[f]?esc(it.why[f]):""}</li>`).join("")+"</ul>";
  html+="<p><b>Relationships:</b> "+it.rel.map(x=>"one "+x[0]+" → many "+x[1]).join("; ")+".</p>"+(it.note?"<p>"+it.note+"</p>":"");
  fb(box,s.ok?"ok":s.got>=2?"part":"no",s.ok?"Band 4 on both traits":"Not yet Band 4",html);return s.ok;}

/* ============ assemble ============ */
function asmUI(it,box){const order=shuffle(it.tiles.map((t,i)=>i));let built=[];const wrap=h("div",{class:"u2"});
  const out=h("div",{class:"built","aria-label":"Your answer","aria-live":"polite"}),tl=h("div",{class:"chips tiles"});
  function draw(){out.innerHTML="";tl.innerHTML="";if(!built.length)out.append(h("span",{class:"hint"},"Tap tiles to build the answer. Tap a tile here to take it back."));
    built.forEach((k,pos)=>out.append(btn(it.tiles[k],"chip",()=>{built.splice(pos,1);draw();})));
    order.forEach(k=>{if(!built.includes(k))tl.append(btn(it.tiles[k],"chip",()=>{built.push(k);draw();}));});}
  wrap.append(h("p",{},h("b",{},(it.target||"Your answer")+":")),out,tl);box.append(wrap);draw();
  return {resp:()=>built.map(k=>it.tiles[k]),wrap};}
const asmOk=(it,r)=>(it.accept||[]).some(a=>a.join(" ")===(r||[]).join(" "));

/* ============ grid ============ */
const SORTS=["","Ascending","Descending"],TOTS=["Group By","Count","Sum","Avg","Min","Max","Expression","Where"];
function gridUI(it,box){const n=it.cols||4;const cols=Array.from({length:n},()=>({f:"",total:"Group By",sort:"",show:true,crit:"",or:""}));const wrap=h("div",{class:"u2"});
  const sel=(list,val,on,lab,blank)=>h("select",{"aria-label":lab,onchange:e=>on(e.target.value)},(blank?[""]:[]).concat(list).map(x=>h("option",{value:x,selected:x===val},x===""?"—":x)));
  const t=h("table",{class:"qbe"});const row=(lab,cell)=>t.append(h("tr",{},h("th",{},lab),cols.map((c,i)=>h("td",{},cell(c,i)))));
  row("Field:",(c,i)=>sel(it.fields,c.f,v=>c.f=v,"Column "+(i+1)+" field",true));
  if(it.totals)row("Total:",(c,i)=>sel(TOTS,c.total,v=>c.total=v,"Column "+(i+1)+" total"));
  row("Sort:",(c,i)=>sel(SORTS,c.sort,v=>c.sort=v,"Column "+(i+1)+" sort"));
  row("Show:",(c,i)=>{const cb=h("input",{type:"checkbox","aria-label":"Column "+(i+1)+" show",checked:true});cb.onchange=()=>c.show=cb.checked;return cb;});
  row("Criteria:",(c,i)=>sel(it.crit||[],c.crit,v=>c.crit=v,"Column "+(i+1)+" criteria",true));
  row("or:",(c,i)=>sel(it.crit||[],c.or,v=>c.or=v,"Column "+(i+1)+" or",true));
  wrap.append(h("p",{class:"hint"},"Fill the grid as you would in Query Design. Leave spare columns empty."),h("div",{class:"scroll"},t));box.append(wrap);
  return {resp:()=>cols.filter(c=>c.f).map(c=>Object.assign({},c)),wrap};}
function gridScore(it,r){const P=[];const find=f=>r.find(c=>c.f===f);
  it.sol.forEach(s=>{P.push({t:1,txt:"Field "+s.f+" in the grid",ok:!!find(s.f)});});
  it.sol.forEach(s=>{const c=find(s.f);
    if(it.totals&&s.total&&s.total!=="Group By")P.push({t:2,txt:s.total+" on "+s.f,ok:!!c&&c.total===s.total});
    if(s.sort)P.push({t:2,txt:"Sort "+s.f+" "+s.sort,ok:!!c&&c.sort===s.sort});
    if(s.crit)P.push({t:2,txt:"Criteria "+s.crit+" on "+s.f,ok:!!c&&c.crit===s.crit});
    if(s.or)P.push({t:2,txt:"or "+s.or+" on "+s.f,ok:!!c&&c.or===s.or});});
  r.forEach(c=>{const s=it.sol.find(x=>x.f===c.f);if(!s){/* an extra column is fine only if hidden and harmless */}
    else{if(!s.sort&&c.sort)P.push({t:2,txt:"No sort on "+c.f,ok:false});if(!s.crit&&c.crit)P.push({t:2,txt:"No criteria on "+c.f,ok:false});}});
  r.filter(c=>!it.sol.find(x=>x.f===c.f)&&(c.crit||c.or)).forEach(c=>P.push({t:2,txt:"No criteria on "+c.f,ok:false}));
  const want=it.sol.filter(s=>s.show!==false).map(s=>s.f),shown=r.filter(c=>c.show).map(c=>c.f);
  P.push({t:3,txt:"Only "+want.join(", ")+" shown",ok:sameSet(want,shown)});
  if(it.ordered){const seq=shown.filter(f=>want.includes(f));P.push({t:3,txt:"Shown columns in the order asked",ok:seq.join("|")===want.join("|")});}
  if(it.totals&&r.some(c=>!it.sol.find(x=>x.f===c.f)&&c.total==="Group By"))P.push({t:2,txt:"No extra Group By columns (they split the totals)",ok:false});
  const got=P.filter(p=>p.ok).length;return {P,ok:got===P.length,share:got/P.length};}
function gridFeedback(it,box,r){const s=gridScore(it,r);
  fb(box,s.ok?"ok":s.share>=.5?"part":"no",s.ok?"Every point banked":s.P.filter(p=>p.ok).length+" of "+s.P.length+" points banked",
   "<ul class='pts'>"+s.P.map(p=>`<li class="${p.ok?"ok":"no"}">Trait ${p.t}: ${esc(p.txt)}</li>`).join("")+"</ul><p><b>Model grid:</b></p>"+mockQBE(it.sol.map(x=>({f:x.f.split(".").pop(),t:x.f.split(".")[0],total:x.total,sort:x.sort,show:x.show!==false,crit:x.crit,or:x.or})),it.totals)+"<p>"+it.why+"</p>");return s.ok;}

/* ============ decode ============ */
function decUI(it,box){const on=new Set();let pick=null;const wrap=h("div",{class:"u2"});
  const ch=h("div",{class:"chips","aria-label":"Requirement wording"}),op=h("div",{class:"opts"});
  it.chips.forEach((c,i)=>{const b=btn(c[0],"chip",()=>{on.has(i)?on.delete(i):on.add(i);b.classList.toggle("on");b.setAttribute("aria-pressed",on.has(i));});b.setAttribute("aria-pressed","false");ch.append(b);});
  const ord=shuffle(it.opts.map((o,i)=>i)),bs=[];ord.forEach((k,j)=>{const b=h("button",{type:"button",class:"opt",onclick:()=>{pick=k;bs.forEach(x=>x.classList.toggle("sel",x===b));}},h("span",{class:"key"},String.fromCharCode(65+j)),h("span",{html:it.opts[k]}));bs.push(b);op.append(b);});
  wrap.append(h("p",{},h("b",{},"1. Tap the words that decide it.")),ch,h("p",{},h("b",{},"2. Choose what Access needs.")),op);box.append(wrap);
  return {resp:()=>({chips:[...on],opt:pick}),wrap,chipsEl:ch,optBtns:bs,ord};}
const decCue=it=>it.chips.map((c,i)=>c[1]?i:-1).filter(i=>i>=0);
function decScore(it,r){const a=sameSet(decCue(it),r.chips||[]),b=r.opt===it.ans;return {a,b,got:(a?1:0)+(b?1:0),max:2,ok:a&&b};}

/* ============ steps (multi-step reasoning) ============ */
function stepsUI(it,box){const pick=it.steps.map(()=>null);const wrap=h("div",{class:"u2"});const groups=[];
  it.steps.forEach((st,k)=>{const o=h("div",{class:"opts"});const bs=[];st.opts.forEach((t,j)=>{const b=h("button",{type:"button",class:"opt",onclick:()=>{pick[k]=j;bs.forEach(x=>x.classList.toggle("sel",x===b));}},h("span",{class:"key"},String.fromCharCode(65+j)),h("span",{html:t}));bs.push(b);o.append(b);});
    groups.push(bs);wrap.append(h("p",{},h("b",{},"Step "+(k+1)+". "),h("span",{html:st.q})),o);});
  box.append(wrap);return {resp:()=>pick.slice(),wrap,groups};}
/* ============ practice wrapper ============ */
function render(it,box,done){
  if(it.ctx)box.append(h("div",{class:"ctx",html:ctxOf(it)}));
  box.append(h("div",{class:"qtext",html:it.q||""}));
  const ui=it.type==="norm"?normUI(it,box):it.type==="assemble"?asmUI(it,box):it.type==="grid"?gridUI(it,box):it.type==="steps"?stepsUI(it,box):decUI(it,box);
  const msg=h("p",{class:"small",style:"color:var(--bad)","aria-live":"polite"});
  const chk=btn("Check my answer","btn",()=>{const r=ui.resp();
    if(it.type==="norm"&&!Object.values(r.place).some(x=>x.length)){msg.textContent="Place some fields first.";return;}
    if(it.type==="assemble"&&!r.length){msg.textContent="Build an answer first.";return;}
    if(it.type==="grid"&&!r.length){msg.textContent="Choose at least one field.";return;}
    if(it.type==="decode"&&r.opt===null){msg.textContent="Choose an option in step 2.";return;}
    if(it.type==="steps"&&r.some(x=>x===null)){msg.textContent="Answer every step first.";return;}
    msg.textContent="";chk.remove();ui.wrap.style.pointerEvents="none";ui.wrap.setAttribute("aria-disabled","true");
    askConf(box,conf=>{let ok;
      if(it.type==="norm")ok=normFeedback(it,box,r,ui);
      else if(it.type==="grid")ok=gridFeedback(it,box,r);
      else if(it.type==="steps"){const n=it.steps.filter((x,k)=>r[k]===x.ans).length;ok=n===it.steps.length;
        ui.groups.forEach((bs,k)=>bs.forEach((b,j)=>{if(j===it.steps[k].ans)b.classList.add("right");else if(j===r[k])b.classList.add("wrong");}));
        fb(box,ok?"ok":n?"part":"no",n+" of "+it.steps.length+" steps right","<p>"+it.why+"</p>");}
      else if(it.type==="assemble"){ok=asmOk(it,r);const k=(r||[]).join(" ");const near=it.near&&it.near[k];
        fb(box,ok?"ok":"no",ok?"Right":"Not quite",(ok?"":"<p>You built "+"<code>"+esc(k)+"</code>. "+(near?esc(near):"")+"</p><p><b>Accepted:</b> "+it.accept.map(a=>"<code>"+esc(a.join(" "))+"</code>").join(" or ")+"</p>")+"<p>"+it.why+"</p>");}
      else{const s=decScore(it,r);ok=s.ok;const cue=decCue(it);ui.chipsEl.querySelectorAll(".chip").forEach((e,i)=>{if(cue.includes(i))e.classList.add("cue");else if(e.classList.contains("on"))e.classList.add("miss");});
        ui.optBtns.forEach((b,j)=>{const k=ui.ord[j];if(k===it.ans)b.classList.add("right");else if(k===r.opt)b.classList.add("wrong");});
        fb(box,ok?"ok":s.got?"part":"no",ok?"Right on both steps":(s.a?"Right words, ":"Look again at the words, ")+(s.b?"right technique":"wrong technique"),"<p><b>The deciding words:</b> "+cue.map(i=>"‘"+esc(it.chips[i][0])+"’").join(", ")+"</p><p>"+it.why+"</p>"+(it.trap?"<p><b>Trap:</b> "+it.trap+"</p>":""));}
      done(ok,conf);});
  });
  box.append(msg,h("div",{class:"row"},chk));
}
/* ============ test mode (no feedback) ============ */
function test(it,box,st){if(it.ctx)box.append(h("div",{class:"ctx",html:ctxOf(it)}));box.append(h("div",{class:"qtext",html:it.q||""}));
  const ui=it.type==="norm"?normUI(it,box):it.type==="assemble"?asmUI(it,box):it.type==="grid"?gridUI(it,box):it.type==="steps"?stepsUI(it,box):decUI(it,box);
  const ready=r=>it.type==="norm"?Object.values(r.place).some(x=>x.length):it.type==="assemble"?r.length>0:it.type==="grid"?r.length>0:it.type==="steps"?r.every(x=>x!==null):r.opt!==null;
  const save=()=>{const r=ui.resp();st.resp=r;st.ready=ready(r);if(st.onchange)st.onchange();};box.addEventListener("click",()=>setTimeout(save,0));box.addEventListener("change",save);st.resp=null;st.ready=false;st.read=ui.resp;}
function mark(it,r){const m=max(it);if(r==null)return {got:0,max:m};
  if(it.type==="norm")return {got:normScore(it,r).got,max:m};
  if(it.type==="assemble")return {got:asmOk(it,r)?2:0,max:m};
  if(it.type==="grid"){if(!r.length)return {got:0,max:m};return {got:Math.round(4*gridScore(it,r).share),max:m};}
  if(it.type==="decode")return {got:decScore(it,r).got,max:m};
  if(it.type==="steps"){const n=it.steps.filter((x,k)=>r[k]===x.ans).length;return {got:Math.round(n/it.steps.length*m),max:m};}return {got:0,max:m};}
function max(it){return it.type==="norm"||it.type==="grid"?4:it.type==="steps"?Math.min(3,it.steps.length):2;}

/* ============ generated drills ============ */
const R=a=>a[Math.floor(Math.random()*a.length)];
const GEN={
 dtype(it){const pool=[["HireCost","£15.00","Currency"],["PackPrice","£3.95","Currency"],["Difficulty","3","Number"],["PlacesLeft","12","Number"],["TripDate","14/06/2026","Date/Time"],["PaddlerDOB","12/03/2008","Date/Time"],["Attended","Yes","Yes/No"],["OvernightCamp","No","Yes/No"],["PaddlerPhone","07700900501","Short Text"],["Postcode","LS6 2QT","Short Text"],["GuideCode","G042","Short Text"],["PaddlerSurname","Adeyemi","Short Text"]];
  const p=R(pool);const opts=["Short Text","Number","Currency","Date/Time","Yes/No"];
  return {id:it.id,lo:it.lo,act:it.act,type:"mcq",q:"Field <b>"+p[0]+"</b> holds values like <b>"+p[1]+"</b>. Which data type?",opts,ans:opts.indexOf(p[2]),
   why:{"Currency":"Money is Currency: it stores pence exactly and shows the £ sign.","Number":"Counts, levels and ratings you might compare or add up are Number.","Date/Time":"Dates are Date/Time so they sort and compare as dates.","Yes/No":"A fact that is only true or false is Yes/No.","Short Text":"Phone numbers, postcodes and codes contain leading zeros, letters or spaces, and you never do sums with them: Short Text."}[p[2]]};},
 oper(it){const n=3+Math.floor(Math.random()*30),m=n+5+Math.floor(Math.random()*20);
  const f=R([["at least "+n,">="+n],["no more than "+n,"<="+n],["fewer than "+n,"<"+n],["more than "+n,">"+n],["no fewer than "+n,">="+n],["under "+n,"<"+n],["from "+n+" to "+m+" inclusive","Between "+n+" And "+m],["over "+n,">"+n]]);
  const all=[">="+n,"<="+n,"<"+n,">"+n,"Between "+n+" And "+m,"Between "+(n+1)+" And "+(m-1),"="+n];const opts=[f[1]].concat(shuffle(all.filter(x=>x!==f[1])).slice(0,3));const sh=shuffle(opts);
  return {id:it.id,lo:it.lo,act:it.act,type:"mcq",q:"The paper says the value must be <b>"+f[0]+"</b>. Which criterion?",opts:sh.map(c),ans:sh.indexOf(f[1]),
   why:"‘At least’ and ‘no fewer than’ include the number (>=). ‘No more than’ includes it (<=). ‘Fewer than’, ‘under’, ‘more than’ and ‘over’ leave it out (< or >). Between includes both ends."};},
 dfunc(it){const p=R([["the most recent hire date for the customer chosen in the combo box","DMax"],["the earliest hire date in tblHire","DMin"],["how many hires the chosen customer has made","DCount"],["the total the chosen customer has paid","DSum"],["the average daily rate of all bikes","DAvg"],["the name of the category for the chosen bike","DLookup"],["the highest BikeID so far, plus one","DMax"]]);
  const opts=["DMax","DMin","DCount","DSum","DAvg","DLookup"];
  return {id:it.id,lo:it.lo,act:it.act,type:"mcq",q:"Form 2 must show <b>"+p[0]+"</b>. Which domain function?",opts,ans:opts.indexOf(p[1]),
   why:"DMax = latest / highest / most recent. DMin = earliest / lowest. DCount = how many. DSum = total. DAvg = average. DLookup = one value from another table. Filter to the chosen record with a criterion such as "+c('"[CustomerID]=" & [cboCustomer]')+"."};}
};
function gen(it){return it.gen&&GEN[it.gen]?GEN[it.gen](it):it;}
return {has:t=>["norm","assemble","grid","decode","steps"].includes(t),render,test,mark,max,gen,_score:{normScore,gridScore,asmOk,decScore},GEN};
})();
/* Adapt Unit 2 data to the Unit 11 engine: sort rows become {t,b,why}. */
(function(){const fix=it=>{if(it&&it.type==="sort"&&Array.isArray(it.items)&&Array.isArray(it.items[0]))it.items=it.items.map(x=>({t:x[0],b:x[1],why:x[2]||""}));};
  if(typeof ITEMS!=="undefined")ITEMS.forEach(fix);if(typeof WS!=="undefined")WS.forEach(w=>fix(w.build));})();
if(typeof module!=="undefined")module.exports=U2T;
