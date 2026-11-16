/* Unit 2 views that replace the Unit 11 ones. Loaded AFTER the engine script, then re-renders. */
"use strict";
viewHome=function(){
  const p1=el("section",{class:"panel"});
  p1.append(el("h1",{},"Unit 2 exam prep: get the marks the examiners look for"),
   el("p",{class:"lede"},"<b>Part A</b> Tuesday 12 January · <b>Part B</b> Wednesday 13 January. New here? Start with the <a href='#plan'>revision plan</a>."),
   el("p",{class:"lede"},(ITEMS.length-HOLD.size)+" practice questions, a wording decoder, written-answer practice for all eight activities and a strictly marked final test, built from the 2019–2025 Unit 2 papers, mark schemes and examiner reports. The most practice goes where the most marks are: Forms (14) and Queries & report (12)."),
   el("p",{class:"lede"},"<b>How to use it:</b> try to recall before you read, say how sure you are, read every explanation, and come back to <b>Review</b> every few days."));
  const dueN=ITEMS.filter(isDue).length,nx=wsNext();const todo=el("ol",{class:"today"});
  todo.append(el("li",{},"<a class='btn' href='#sprint'>Today’s practice: 12 mixed questions</a><span class='small muted'>Picked from every activity, weighted by marks.</span>"));
  todo.append(el("li",{},"<a class='btn ghost' href='#review'>Review what’s due ("+dueN+")</a><span class='small muted'>Getting it right again on a later day is what makes it stick.</span>"));
  todo.append(el("li",{},"<a class='btn ghost' href='#decode'>Decode the wording</a><span class='small muted'>Turn the paper’s English into the right Access setting.</span>"));
  todo.append(el("li",{},"<a class='btn ghost' href='"+(nx?"#write-"+nx.act:"#write")+"'>"+(nx?"Exam answers: "+nx.name:"Exam answers: practise again")+"</a>"));
  p1.append(el("h2",{},"What to do today"),todo);
  const p2=el("section",{class:"panel"});p2.append(el("h2",{},"Where the 66 marks are"));const bp=el("div",{class:"bp"});let last="";
  BLUEPRINT.forEach(b=>{if(b.task!==last){bp.append(el("div",{class:"taskhd"},b.task==="Part A"?"Part A · 3 hours · 40 marks":"Part B · 2 hours · 26 marks"));last=b.task;}
   const row=el("div",{class:"bprow"});row.append(el("span",{},"<a href='#lo-"+b.lo+"'>"+b.act+"</a>"),el("div",{class:"bar"},"<i style='width:"+(b.m/14*100)+"%'></i>"),el("span",{class:"num"},b.m));bp.append(row);});
  p2.append(bp);
  const pb=el("section",{class:"panel"});pb.append(el("h2",{},"Marks you can bank even when you’re stuck"),el("ul",{class:"notes",html:"<li><b>Activity 3:</b> put the right tables and fields in every query grid, name calculated fields, show only what’s asked, widen columns, give the report a real title and save the PDF. These points don’t need the calculation to work.</li><li><b>Activity 6:</b> real titles, labels with spaces, sensible widths, asterisks, instructions, disabled IDs, combo boxes, a Save button, the same style on both forms. Build Form 2’s layout even if nothing calculates.</li><li><b>Activities 4 and 7:</b> data for every field, the exact message, only the listed tests.</li><li><b>Everything:</b> use the templates, save as PDF, name the files exactly as the paper says, never crop the table or field name out of a screenshot.</li>"}));
  const p3=el("section",{class:"panel"});p3.append(el("h2",{},"The eight activities"));const g=el("div",{class:"grid3"});
  Object.keys(LOS).forEach(k=>{const L=LOS[k],m=mastery(k);const a=el("a",{class:"locard",href:"#lo-"+k});a.append(el("div",{class:"k"},k),el("b",{},L.name),el("span",{class:"small muted"},L.acts),el("div",{class:"prog"},"<i style='width:"+(m.n?m.m/m.n*100:0)+"%'></i>"),el("span",{class:"small muted"},m.m+" of "+m.n+" secure · "+m.seen+" tried"));g.append(a);});
  p3.append(g);
  const p4=el("section",{class:"panel"});p4.append(el("h2",{},"What examiners keep marking down"),el("p",{class:"lede"},"Paraphrased from Pearson’s examiner reports, 2022 to 2025. Every one is practised on this site."));
  const ul=el("ol",{class:"warnlist"});WARNINGS.forEach(w=>ul.append(el("li",{},w)));p4.append(ul);
  app.append(p1,p2,pb,p3,p4);
};
function viewDecode(){
  const p=el("section",{class:"panel"});p.append(el("h1",{},"Decode the wording"),el("p",{class:"lede"},"The paper tells you what to build in plain English. Each question here makes you find the words that decide it, then choose the Access feature. That is the skill most students are missing."));
  const groups=[["v","Validation (Activity 2)"],["q","Queries & reports (Activity 3)"],["f","Forms (Activity 6)"]];const host=el("div");
  const r=el("div",{class:"row"});const all=practisable().filter(i=>i.dec);
  r.append(el("button",{type:"button",class:"btn",onclick:()=>runSession("Decode: mixed",shuffle(all).slice(0,10),host,()=>render())},"Practise 10 mixed"));
  groups.forEach(([k,l])=>r.append(el("button",{type:"button",class:"btn ghost",onclick:()=>runSession("Decode: "+l,shuffle(all.filter(i=>i.dec===k)),host,()=>render())},l)));
  r.append(el("button",{type:"button",class:"btn ghost",onclick:()=>runSession("Operator drill",["3-g1","3-g2","3-g3","3-g4","3-g1","3-g2","3-g3","3-g4","3-g1","3-g2"].map(id=>ITEMS.find(i=>i.id===id)),host,()=>render())},"Operator drill (10)"));
  p.append(r);
  const t=el("div",{class:"tblwrap"});t.innerHTML="<table class='tbl'><tr><th>The paper says…</th><th>You build…</th></tr>"+[["…is not present","Presence: "+c("Is Not Null")+" + Validation Text (Part B: in the macro)"],["…is not in the correct format","Format: input mask on a Short Text field"],["…below / above the accepted range","Range: "+c("Between 1 And 4")+" + Validation Text"],["…the X ID is invalid","Table lookup on the foreign key, Limit To List = Yes"],["at least / no fewer than","&gt;="],["no more than","&lt;="],["fewer than / under · more than / over","&lt; · &gt;"],["X or Y (same field)","Criteria row + or: row"],["any shade of / contains","Like \"*word*\""],["latest to earliest · youngest to oldest","Descending (date of birth descending!)"],["the number of … for each …","Totals: Group By + Count; report: group footer"],["overall","Report footer"],["the words ‘X’ if …","IIf(test,\"X\",\"\")"],["most recent / highest (+1)","DMax(…)(+1)"],["how many · total · average","DCount · DSum · DAvg"],["when the X is selected","criterion "+c('"[XID]=" & [cboX]')]].map(x=>"<tr><td>"+x[0]+"</td><td>"+x[1]+"</td></tr>").join("")+"</table>";
  p.append(el("h2",{},"Phrase bank"),t);app.append(p,host);
}
viewPlan=function(){const p=el("section",{class:"panel"});
  p.innerHTML=`<h1>Your revision plan to 12–13 January</h1><p class="lede">About 30–40 minutes, four or five times a week: <b>recall, practise, review</b>. Part B is self-taught, so it starts in week 3, not after the mocks.</p>
<div class="tblwrap"><table class="tbl"><tr><th>Week</th><th>Dates</th><th>On this site</th><th>Ready to move on when…</th></tr>
<tr><td>1</td><td>16–20 Nov</td><td>Decode (validation), Activity 1, Activity 2</td><td>You can split any extract into four tables and name the top-tier setting for all five checks.</td></tr>
<tr><td>2</td><td>23–27 Nov</td><td>Decode (queries), Activity 3, Activity 4</td><td>You can fill a query grid from the wording and say which band each report control goes in.</td></tr>
<tr><td>3</td><td>30 Nov–4 Dec</td><td>Activity 5 workshop; Activity 6 Form 1 (mocks start)</td><td>You can write Form 1’s Save macro in the right order from memory.</td></tr>
<tr><td>4</td><td>7–11 Dec</td><td>Activity 6 Form 2 (decode forms), Activities 7 and 8</td><td>You can pick the right domain function and tie it to a combo box.</td></tr>
<tr><td>5</td><td>14–18 Dec</td><td><a href="#test">Final test</a>, then your weakest activities</td><td>Final test 70%+.</td></tr>
<tr><td>6–7</td><td>Christmas</td><td><a href="#review">Review</a> every few days; one final test a week; Activity 3 and 6 workshops</td><td>No activity below 60%.</td></tr>
<tr><td>8</td><td>4–11 Jan</td><td>Final test again; Review daily. 11 Jan: Part A only.</td><td>Final test 80%+.</td></tr>
<tr><td>Exam</td><td>12 Jan evening</td><td>Short Part B recap: Form 1 macro, Form 2 functions, test rows</td><td>—</td></tr></table></div>
<h2>In the exam</h2><ul class="notes"><li>Use the templates for Activities 2, 3, 4, 6 and 7; make your own document for 1, 5 and 8. Save every one as PDF.</li><li>Name every file exactly as the paper says: 9 PDFs and 2 databases in total.</li><li>Never crop the table or field name out of a screenshot; widen columns before taking it.</li><li>Activity 3: attempt every part; the fields and presentation earn points on their own.</li><li>Activities 4 and 7: only the listed tests, data for every field, the exact message.</li><li>Part B: don’t change the tables. Presence checks go in the macro.</li><li>Activity 5 is about the tables; Activity 8 is about the user.</li></ul>`;app.append(p);};
render();
