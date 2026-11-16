/* Run: node Unit-2/ep/check.js   Validates every item; prints OK or a list of problems. */
"use strict";
const fs=require("fs"),path=require("path"),vm=require("vm");
const dir=__dirname,ctx={console};vm.createContext(ctx);
const order=["mock.js","core.js",...fs.readdirSync(dir).filter(f=>/^items-\d\.js$/.test(f)).sort(),"learn-b.js","ws.js","types.js"];
for(const f of order){const p=path.join(dir,f);if(!fs.existsSync(p))continue;
  try{vm.runInContext(fs.readFileSync(p,"utf8"),ctx,{filename:f});}catch(e){console.log("LOAD ERROR in "+f+": "+e.message);process.exit(1);}}
vm.runInContext("this.LEARN=LEARN;this.ITEMS=ITEMS;this.SKILL=SKILL;this.HOLD=HOLD;this.LOS=LOS;",ctx);const {ITEMS,SKILL,HOLD,LOS}=ctx;const E=[];const err=(id,m)=>E.push(id+": "+m);
const TYPES=["mcq","multi","sort","order","chain","write","norm","assemble","grid","decode","steps"];
const ids=new Set();
for(const it of ITEMS){const id=it.id||"(no id)";
 if(ids.has(id))err(id,"duplicate id");ids.add(id);
 if(!/^[1-8]$/.test(it.lo))err(id,"lo must be 1-8");
 if(it.act!==it.lo)err(id,"act should equal lo");
 if(!id.startsWith(it.lo+"-"))err(id,"id prefix does not match lo");
 if(!TYPES.includes(it.type)){err(id,"unknown type "+it.type);continue;}
 if(it.gen){continue;}
 if(!it.q&&it.type!=="norm")err(id,"no q");
 if(!it.why)err(id,"no why");
 const T=it.type;
 if(T==="mcq"||T==="decode"){if(!Array.isArray(it.opts)||it.opts.length<3)err(id,"needs 3+ opts");if(!(Number.isInteger(it.ans)&&it.ans>=0&&it.ans<it.opts.length))err(id,"ans out of range");if(new Set(it.opts).size!==it.opts.length)err(id,"duplicate options");}
 if(T==="decode"){if(!Array.isArray(it.chips)||!it.chips.some(x=>x[1]===1))err(id,"decode needs at least one cue chip");if(!["v","q","f"].includes(it.dec))err(id,"dec must be v/q/f");}
 if(T==="multi"){if(!Array.isArray(it.ans)||!it.ans.length||it.ans.some(a=>a<0||a>=it.opts.length))err(id,"multi ans must be a list of option indexes");}
 if(T==="sort"){if(!it.buckets||!it.items)err(id,"sort needs buckets and items");else it.items.forEach(x=>{const b=Array.isArray(x)?x[1]:x.b;if(!(b>=0&&b<it.buckets.length))err(id,"sort item bucket out of range");});}
 if(T==="order"&&(!Array.isArray(it.steps)||it.steps.length<3))err(id,"order needs 3+ steps");
 if(T==="chain"||T==="steps"){(it.steps||[]).forEach((s,k)=>{if(!(s.ans>=0&&s.ans<s.opts.length))err(id,"chain step "+k+" ans out of range");});}
 if(T==="assemble"){const tiles=it.tiles||[];if(!it.accept||!it.accept.length)err(id,"no accept");
   (it.accept||[]).forEach(a=>{const pool=tiles.slice();a.forEach(t=>{const k=pool.indexOf(t);if(k<0)err(id,"accept uses tile not available (or used too often): "+t);else pool.splice(k,1);});});
   Object.keys(it.near||{}).forEach(n=>{if((it.accept||[]).some(a=>a.join(" ")===n))err(id,"near key equals an accepted answer: "+n);});}
 if(T==="norm"){const cols=it.extract&&it.extract.cols||[];
   cols.forEach(cn=>{if(!it.sol[cn])err(id,"sol missing column "+cn);});
   Object.keys(it.sol).forEach(k=>{if(!cols.includes(k))err(id,"sol field not in extract "+k);it.sol[k].forEach(t=>{if(!it.tables.includes(t))err(id,"sol table unknown "+t);});});
   (it.extract.rows||[]).forEach((r,i)=>{if(r.length!==cols.length)err(id,"row "+i+" has "+r.length+" cells, expected "+cols.length);});
   Object.keys(it.pk).forEach(t=>{if(!it.tables.includes(t))err(id,"pk table unknown "+t);it.pk[t].forEach(f=>{if(!(it.sol[f]||[]).includes(t))err(id,"pk "+f+" not placed in "+t);});});
   it.rel.forEach(r=>r.forEach(t=>{if(!it.tables.includes(t))err(id,"rel table unknown "+t);}));
   it.rel.forEach(([one,many])=>{const shared=Object.keys(it.sol).filter(f=>it.sol[f].includes(one)&&it.sol[f].includes(many)&&(it.pk[one]||[]).includes(f));if(!shared.length)err(id,"no PK of "+one+" placed in "+many);});
   Object.keys(it.why||{}).forEach(k=>{if(!cols.includes(k))err(id,"why for unknown field "+k);});}
 if(T==="grid"){const F=it.fields||[],C=it.crit||[];(it.sol||[]).forEach(s=>{if(!F.includes(s.f))err(id,"grid sol field not offered "+s.f);if(s.crit&&!C.includes(s.crit))err(id,"grid sol criterion not offered "+s.crit);});}
}
/* self-test: model answers must score full marks, generators must give valid questions */
const U=vm.runInContext("typeof U2T!=='undefined'?U2T:null",ctx);
if(U){for(const it of ITEMS){
  if(it.type==="norm"){const r={place:{},pk:{},rel:it.rel.map(x=>x.slice())};Object.keys(it.sol).forEach(f=>r.place[f]=it.sol[f].slice());it.tables.forEach(t=>r.pk[t]=(it.pk[t]||[]).slice());
    const sc=U._score.normScore(it,r);if(!sc.ok||sc.got!==4)err(it.id,"model answer does not score 4/4");
    const r2=JSON.parse(JSON.stringify(r));const f0=Object.keys(it.sol)[0];r2.place[f0]=[];if(U._score.normScore(it,r2).ok)err(it.id,"a wrong board still scores full");}
  if(it.type==="assemble"){it.accept.forEach(a=>{if(!U._score.asmOk(it,a))err(it.id,"accept not accepted");});}
  if(it.type==="grid"){const r=it.sol.map(x=>({f:x.f,total:x.total||"Group By",sort:x.sort||"",show:x.show!==false,crit:x.crit||"",or:x.or||""}));const sc=U._score.gridScore(it,r);if(!sc.ok)err(it.id,"model grid not full marks: "+sc.P.filter(p=>!p.ok).map(p=>p.txt).join("; "));}
  if(it.type==="decode"){const sc=U._score.decScore(it,{chips:it.chips.map((c,i)=>c[1]?i:-1).filter(i=>i>=0),opt:it.ans});if(!sc.ok)err(it.id,"model decode fails");}
 }
 Object.keys(U.GEN).forEach(g=>{for(let k=0;k<200;k++){const q=U.GEN[g]({id:"x",lo:"2",act:"2"});if(!(q.ans>=0&&q.ans<q.opts.length))err("gen "+g,"bad ans");if(new Set(q.opts).size!==q.opts.length)err("gen "+g,"duplicate opts: "+q.opts.join(" | "));}});
}
["1","2","3","4","5","6","7","8"].forEach(k=>{const L=ctx.LEARN&&ctx.LEARN[k];if(!L||!L.length)err("LEARN "+k,"no notes");if(!LOS[k].cards.length)err("LOS "+k,"no cards");});
const inSkill=new Set();Object.keys(SKILL).forEach(k=>SKILL[k].forEach(i=>{if(!ids.has(i)&&!/-g\d+$/.test(i))err(i,"in SKILL but no such item ("+k+")");if(inSkill.has(i))err(i,"in two skills");inSkill.add(i);}));
ITEMS.forEach(i=>{if(!inSkill.has(i.id))err(i.id,"has no skill");});
HOLD.forEach(i=>{if(!ids.has(i))err(i,"in HOLD but no such item");});
const by={};ITEMS.forEach(i=>{by[i.lo]=(by[i.lo]||0)+1;});
const TARGET={"1":22,"2":26,"3":40,"4":8,"5":8,"6":44,"7":8,"8":8};
console.log("Items per activity: "+Object.keys(TARGET).map(k=>k+": "+(by[k]||0)+"/"+TARGET[k]).join("  ")+"   total "+ITEMS.length);
console.log("Held back: "+HOLD.size);
if(E.length){console.log(E.length+" problem(s):\n - "+E.join("\n - "));process.exit(1);}else console.log("OK");
