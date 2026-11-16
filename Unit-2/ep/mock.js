/* Unit 2 exam prep: mock Access 2016 screens (HTML/CSS only, no Microsoft branding).
   Every helper returns an HTML string. Styles are injected once. */
"use strict";
const MOCK_CSS=`
.acc{font-family:"Segoe UI",Arial,sans-serif;font-size:13px;color:#1b1b1b;background:#fff;border:1px solid #9aa3ad;border-radius:4px;overflow:auto;max-width:100%;margin:6px 0}
.acc .tab{background:#e8ecf0;border-bottom:1px solid #9aa3ad;padding:4px 10px;font-weight:600}
.acc table{border-collapse:collapse;width:100%}
.acc th,.acc td{border:1px solid #c8ced5;padding:3px 7px;text-align:left;white-space:nowrap;vertical-align:top}
.acc th{background:#f1f3f5;font-weight:600}
.acc td.sel{background:#dbe9fb}
.acc .pk::before{content:"🔑 ";font-size:11px}
.acc .props{border-top:2px solid #9aa3ad}
.acc .props td:first-child{width:38%;background:#f7f8fa}
.acc .cut{max-width:70px;overflow:hidden;text-overflow:clip}
.acc .rel{position:relative;min-height:190px;background:#f4f6f8}
.acc .rbox{position:absolute;background:#fff;border:1px solid #7d8791;min-width:120px;box-shadow:1px 1px 0 #c8ced5}
.acc .rbox b{display:block;background:#dfe5eb;padding:2px 6px;border-bottom:1px solid #7d8791}
.acc .rbox span{display:block;padding:1px 6px}
.acc .band{background:#dfe5eb;font-weight:600;padding:2px 8px;border-top:1px solid #9aa3ad}
.acc .bandin{padding:6px 10px;min-height:22px;display:flex;gap:10px;flex-wrap:wrap}
.acc .ctl{border:1px solid #7d8791;padding:1px 6px;background:#fff;font-family:Consolas,monospace;font-size:12px}
.acc .form{padding:12px;display:grid;gap:8px}
.acc .form h4{margin:0 0 4px;font-size:16px}
.acc .frow{display:flex;gap:10px;align-items:center}
.acc .frow label{min-width:130px}
.acc .fbox{border:1px solid #7d8791;height:22px;background:#fff}
.acc .fbox.dis{background:#e9ecef;color:#6c757d}
.acc .btnm{border:1px solid #7d8791;background:#e8ecf0;padding:3px 12px;display:inline-block}
.acc .badge{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#b4232a;color:#fff;font-size:11px;font-weight:700;margin-left:4px}
.acc .mac{font-family:Consolas,monospace;font-size:12.5px;padding:8px 10px;line-height:1.7}
.acc .msg{display:inline-block;margin:10px;border:1px solid #7d8791;box-shadow:2px 2px 0 #c8ced5;min-width:260px}
.acc .msg div{padding:12px 14px}
.acc .msg .ok{text-align:right;padding:0 14px 10px}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .acc{filter:brightness(.92)}}
`;
(function(){if(typeof document==="undefined")return;const s=document.createElement("style");s.textContent=MOCK_CSS;document.head.appendChild(s);})();
const mEsc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

/* Table design view. fields: [[name,type,isPK]]. sel: field shown in the property sheet. props: {Property:value}. opt.hideTable: cropped (table name not visible). opt.lookup: show the Lookup tab */
function mockDesign(table,fields,sel,props,opt){opt=opt||{};
  let h=`<div class="acc" role="img" aria-label="Table design view${opt.hideTable?"":" for "+mEsc(table)}"><div class="tab">${opt.hideTable?"&nbsp;":mEsc(table)}</div><table><tr><th>Field Name</th><th>Data Type</th></tr>`;
  fields.forEach(f=>{h+=`<tr><td class="${f[2]?"pk":""}${f[0]===sel?" sel":""}">${mEsc(f[0])}</td><td${f[0]===sel?' class="sel"':""}>${mEsc(f[1])}</td></tr>`;});
  h+=`</table>`;
  if(props){h+=`<table class="props"><tr><th colspan="2">${opt.lookup?"Lookup":"General"}</th></tr>`;Object.keys(props).forEach(k=>{h+=`<tr><td>${mEsc(k)}</td><td>${mEsc(props[k])}</td></tr>`;});h+=`</table>`;}
  return h+`</div>`;}

/* Relationships window. tables: [{t,fields:[..],pk:[..],x,y}]. links: [[oneT,manyT,label]] drawn as text lines under the boxes (keeps it robust at any width). */
function mockRel(tables,links){
  let h=`<div class="acc" role="img" aria-label="Relationships window"><div class="tab">Relationships</div><div class="rel" style="min-height:${40+Math.max(...tables.map(t=>t.y+22+t.fields.length*19))}px">`;
  tables.forEach(t=>{h+=`<div class="rbox" style="left:${t.x}px;top:${t.y}px"><b>${mEsc(t.t)}</b>${t.fields.map(f=>`<span class="${(t.pk||[]).includes(f)?"pk":""}">${mEsc(f)}</span>`).join("")}</div>`;});
  h+=`</div><table>${links.map(l=>`<tr><td>${mEsc(l[0])}</td><td>1 ──── ∞</td><td>${mEsc(l[1])}</td><td>${mEsc(l[2]||"Enforce Referential Integrity ✓")}</td></tr>`).join("")}</table></div>`;
  return h;}

/* Query design grid. cols: [{f,t,total,sort,show,crit,or}] */
function mockQBE(cols,totals){
  const row=(lab,get)=>`<tr><th>${lab}</th>${cols.map(c=>`<td>${mEsc(get(c))}</td>`).join("")}</tr>`;
  return `<div class="acc" role="img" aria-label="Query design grid"><div class="tab">Query1</div><table>`+row("Field:",c=>c.f)+row("Table:",c=>c.t)+(totals?row("Total:",c=>c.total||"Group By"):"")+row("Sort:",c=>c.sort||"")+row("Show:",c=>c.show===false?"☐":"☑")+row("Criteria:",c=>c.crit||"")+row("or:",c=>c.or||"")+`</table></div>`;}

/* Datasheet. opt.cut: column indexes shown truncated */
function mockSheet(head,rows,opt){opt=opt||{};const cut=opt.cut||[];
  return `<div class="acc" role="img" aria-label="Datasheet view"><div class="tab">${mEsc(opt.name||"Query1")}</div><table><tr>${head.map((x,i)=>`<th${cut.includes(i)?' class="cut"':""}>${mEsc(cut.includes(i)?String(x).slice(0,6):x)}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map((x,i)=>`<td${cut.includes(i)?' class="cut"':""}>${mEsc(cut.includes(i)?String(x).slice(0,6):x)}</td>`).join("")}</tr>`).join("")}</table></div>`;}

/* Report design bands. bands: [{band,controls:[..]}] */
function mockReport(bands){return `<div class="acc" role="img" aria-label="Report design view"><div class="tab">Report design</div>${bands.map(b=>`<div class="band">▼ ${mEsc(b.band)}</div><div class="bandin">${(b.controls||[]).map(c=>`<span class="ctl">${mEsc(c)}</span>`).join("")}</div>`).join("")}</div>`;}

/* Form view. rows: [{label,w,disabled,req,badge,combo}] buttons: [{text,badge}] */
function mockForm(f){
  return `<div class="acc" role="img" aria-label="Form view"><div class="tab">${mEsc(f.tab||"Form")}</div><div class="form">${f.title!=null?`<h4>${mEsc(f.title)}${f.titleBadge?`<span class="badge">${f.titleBadge}</span>`:""}</h4>`:""}${f.note?`<div style="font-size:12px">${mEsc(f.note)}${f.noteBadge?`<span class="badge">${f.noteBadge}</span>`:""}</div>`:""}${f.rows.map(r=>`<div class="frow"><label>${mEsc(r.label)}${r.req?" *":""}</label><div class="fbox${r.disabled?" dis":""}" style="width:${r.w||160}px">${mEsc(r.value||"")}${r.combo?" ▾":""}</div>${r.badge?`<span class="badge">${r.badge}</span>`:""}</div>`).join("")}<div>${(f.buttons||[]).map(b=>`<span class="btnm">${mEsc(b.text)}</span>${b.badge?`<span class="badge">${b.badge}</span>`:""}`).join(" ")}</div></div></div>`;}

/* Macro builder. lines: [[indent,text]] */
function mockMacro(lines,name){return `<div class="acc" role="img" aria-label="Macro"><div class="tab">${mEsc(name||"cmdSave : On Click")}</div><div class="mac">${lines.map(l=>`<div style="padding-left:${l[0]*22}px">${mEsc(l[1])}</div>`).join("")}</div></div>`;}

/* Message box */
function mockMsg(text,title){return `<div class="acc" role="img" aria-label="Message box" style="background:#f4f6f8"><div class="msg" style="background:#fff"><div class="tab">${mEsc(title||"Microsoft Access")}</div><div>⚠ ${mEsc(text)}</div><div class="ok"><span class="btnm">OK</span></div></div></div>`;}

if(typeof module!=="undefined")module.exports={mockDesign,mockRel,mockQBE,mockSheet,mockReport,mockForm,mockMacro,mockMsg};
