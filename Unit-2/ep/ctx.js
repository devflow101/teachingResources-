/* Unit 2 exam prep: context, exam-style wording and worked examples for every question.
   Loaded after items-*.js and ws.js, before types.js. Edits items by id so the item files stay readable. */
"use strict";
(function(){
const byId=id=>ITEMS.find(i=>i.id===id);
const det=(sum,html)=>"<details class='ctxmore'><summary>"+sum+"</summary><div style='margin-top:8px'>"+html+"</div></details>";
/* property-sheet mock for form controls and query fields */
globalThis.mockProps=function(title,obj){return "<div class='acc' role='img' aria-label='Property sheet'><div class='tab'>Property Sheet · "+mEsc(title)+"</div><table class='props'>"+Object.keys(obj).map(k=>"<tr><td>"+mEsc(k)+"</td><td>"+mEsc(obj[k])+"</td></tr>").join("")+"</table></div>";};
const css=(typeof document!=="undefined")?document.createElement("style"):null;
if(css){css.textContent=".ctx details.ctxmore summary{cursor:pointer;font-weight:600;color:var(--accent)}.ctx .acc{max-width:100%}.ctx{max-width:none!important}.exbox{border:1px dashed var(--line);border-radius:8px;padding:10px 12px;display:grid;gap:6px}.exbox>b{font-size:.9rem}";document.head.appendChild(css);}

/* ---------- Larchmere (Part A) ---------- */
const T={
 tblGuide:[["GuideID","AutoNumber",1],["GuideSurname","Short Text"],["GuidePhone","Short Text"]],
 tblTrip:[["TripID","AutoNumber",1],["TripName","Short Text"],["TripDate","Date/Time"],["Difficulty","Number"],["OvernightCamp","Yes/No"],["GuideID","Number"]],
 tblPaddler:[["PaddlerID","AutoNumber",1],["PaddlerSurname","Short Text"],["PaddlerInitial","Short Text"],["PaddlerDOB","Date/Time"],["PaddlerPhone","Short Text"]],
 tblTripBooking:[["TripID","Number",1],["PaddlerID","Number",1],["Attended","Yes/No"],["HireCost","Currency"]]};
const REL=mockRel([{t:"tblGuide",fields:["GuideID","GuideSurname","GuidePhone"],pk:["GuideID"],x:10,y:10},{t:"tblTrip",fields:["TripID","TripName","TripDate","Difficulty","OvernightCamp","GuideID"],pk:["TripID"],x:170,y:10},{t:"tblTripBooking",fields:["TripID","PaddlerID","Attended","HireCost"],pk:["TripID","PaddlerID"],x:330,y:10},{t:"tblPaddler",fields:["PaddlerID","PaddlerSurname","PaddlerInitial","PaddlerDOB","PaddlerPhone"],pk:["PaddlerID"],x:490,y:10}],[["tblGuide.GuideID","tblTrip.GuideID"],["tblTrip.TripID","tblTripBooking.TripID"],["tblPaddler.PaddlerID","tblTripBooking.PaddlerID"]]);
const SHORT_L="<b>Scenario: Larchmere Kayak Centre.</b> Guides lead kayak trips; paddlers book places on trips. Each trip has a difficulty from 1 to 4 and may include an overnight camp. Each booking records whether the paddler attended and the hire cost they paid. Paddler phone numbers are 11 digits.";
const DATA_L=()=>"<p><b>Figure 1: data extract</b></p>"+mockSheet(LK.cols,LK.flat,{name:"Figure 1"})+"<p><b>The finished tables and relationships</b></p>"+REL;
const larch=()=>SHORT_L+det("Show the data and the tables",DATA_L());
const larchNoAns=()=>SHORT_L+det("Show the data extract","<p><b>Figure 1: data extract</b></p>"+mockSheet(LK.cols,LK.flat,{name:"Figure 1"}));
const larchT=(t,sel,props,opt)=>SHORT_L+"<p style='margin-top:8px'><b>"+t+"</b> in design view:</p>"+mockDesign(t,T[t],sel,props,opt)+det("Show all the data and tables",DATA_L());
const REQ_L="<p style='margin-top:8px'><b>Activity 2 requirements (as written in the paper):</b></p>"+SCEN.larchReq;

/* ---------- Hollin Bridge (Part B) ---------- */
const BT={
 tblCategory:[["CategoryID","AutoNumber",1],["CategoryName","Short Text"]],
 tblBike:[["BikeID","AutoNumber",1],["BikeName","Short Text"],["DailyRate","Currency"],["CategoryID","Number"]],
 tblCustomer:[["CustomerID","AutoNumber",1],["CustomerSurname","Short Text"],["CustomerPhone","Short Text"]],
 tblHire:[["HireID","AutoNumber",1],["CustomerID","Number"],["BikeID","Number"],["HireDate","Date/Time"],["Days","Number"],["TotalPaid","Currency"]]};
const HIRES=[[41,7,3,"02/03/2026",2,"£36.00"],[44,5,1,"14/03/2026",1,"£12.00"],[47,7,1,"28/03/2026",3,"£36.00"],[52,7,4,"11/04/2026",1,"£45.00"],[55,5,2,"18/04/2026",2,"£40.00"],[58,7,3,"25/04/2026",1,"£18.00"],[61,7,1,"09/05/2026",2,"£24.00"],[66,7,4,"17/05/2026",1,"£55.00"]];
const SHORT_B="<b>Scenario: Hollin Bridge Bike Hire (Part B).</b> The tables are already built and must not be changed. Staff need two forms:<ul><li><b>Form 1, an input form to add a bike.</b> The form should be ready for data entry. The bike name must be present. The daily rate must be within the specified range (£5 to £60). There should be a combo box to select the category ID from the category table. Valid data should be appended to the bike table, a save message should display and the form should be cleared ready for the next data entry. A suitable error message should appear where invalid data has been used.</li><li><b>Form 2, an input form to add a hire for a returning customer.</b> The form must not include validation for any fields. The form must not include an automated routine to save the data. There must be a combo box to select a customer. When the customer is selected, the form must show their most recent hire date, the number of past hires, the total they have spent and the percentage discount (10 if they have had 5 or more hires, otherwise 0).</li></ul>";
const DATA_B=()=>"<p><b>The tables (given, do not change):</b></p>"+["tblCategory","tblBike","tblCustomer","tblHire"].map(t=>mockDesign(t,BT[t])).join("")+"<p><b>Some of tblHire:</b></p>"+mockSheet(["HireID","CustomerID","BikeID","HireDate","Days","TotalPaid"],HIRES,{name:"tblHire"})+"<p class='small muted'>Customer 7 is Rahman: 6 hires, last on 17/05/2026, £214.00 in total.</p>";
const bike=()=>SHORT_B+det("Show the tables and some data",DATA_B());

/* ---------- other scenarios used in Activity 1 ---------- */
const N=id=>byId(id).ctx;   // reuse the scenario text from the normalise boards
const fromBoard=(boardId)=>{const b=byId(boardId);return b.ctx+det("Show the data extract",mockSheet(b.extract.cols,b.extract.rows,{name:"Data extract"}));};

/* ---------- exam-paper instructions (paraphrased in the paper's register) ---------- */
const EX={
 a1:"<b>From the paper, Activity 1:</b> Study the data extract provided in Figure 1. Create an efficient database structure that minimises data duplication, accepts the data provided, uses recognised naming conventions and ensures data integrity. Ensure you use all and only the fields shown in Figure 1. Screen print your database relationships and save it as a PDF.",
 a2:"<b>From the paper, Activity 2:</b> Evidence your table structures and validation as screenprints using the activity2 template. Display your screenprints to show the design view of each table, including the fields and data types, and validation including one suitable example for each of these: presence check, length check, value lookup or range check, table lookup, format check.",
 a3:"<b>From the paper, Activity 3:</b> Evidence your queries as screenprints using the activity3 template, showing the DESIGN view (fields and criteria) and the DATASHEET view of each query. For the report, show the DESIGN view including grouping and calculations. The report must fit on one page. (d) Save your database report (not a screenprint) as a PDF.",
 a4:"<b>From the paper, Activity 4:</b> Test your database structure using the given template. Conduct these tests: the six requirement lines from Activity 2. Record test data, expected results and actual results.",
 a5:"<b>From the paper, Activity 5:</b> Evaluate how well your database structure has minimised data duplication, and how well your database structure meets the requirements listed in the scenario.",
 a6:"<b>From the paper, Activity 6:</b> The structure of the tables provided should not be changed in any way. Evidence your interface using the activity6 template: the DESIGN view and FORM view of every form, the DESIGN and DATASHEET view of any queries used, and details of any calculations, validation and macros/code. Ensure sufficient information is provided to allow a competent third party to maintain the database.",
 a7:"<b>From the paper, Activity 7:</b> Test your interface and functionality using the given template. Conduct only the tests listed.",
 a8:"<b>From the paper, Activity 8:</b> Evaluate your interface in terms of quality, performance and usability."
};
const set=(id,o)=>{const it=byId(id);if(!it)throw new Error("ctx.js: no item "+id);Object.assign(it,o);};
const pre=(id,html)=>{const it=byId(id);if(["sort","order"].includes(it.type))it.q="<div class='ctx'>"+html+"</div>"+it.q;else it.ctx=html;};
const exBox=(title,html)=>"<div class='exbox'><b>"+title+"</b>"+html+"</div>";

/* ================= Activity 1 ================= */
pre("1-06",larch());pre("1-07",EX.a1);pre("1-08",larch());pre("1-09",larchNoAns());pre("1-10",EX.a1);
pre("1-11",fromBoard("1-04"));pre("1-15",larch());
pre("1-16",larchNoAns());pre("1-17",fromBoard("1-03"));pre("1-18",fromBoard("1-04"));pre("1-19",fromBoard("1-05"));
pre("1-20",EX.a1);pre("1-21",larchNoAns());pre("1-22",EX.a1);
set("1-01",{q:"Activity 1 for Larchmere. Put every field from Figure 1 into the table(s) it belongs in, mark the primary keys, then set the three relationships."});

/* ================= Activity 2 ================= */
pre("2-13",SHORT_L+REQ_L);pre("2-14",larchT("tblTrip","Difficulty"));pre("2-15",EX.a2);pre("2-16",EX.a2);pre("2-17",larch());pre("2-18",larch());
set("2-07",{ctx:larchT("tblPaddler","PaddlerSurname",{"Validation Rule":"?","Validation Text":"","Required":"No"}),q:"Requirement from the paper: <i>a record for a new paddler will not save if the paddler’s surname is not present.</i> Build the Validation Rule for PaddlerSurname.",
 why:byId("2-07").why+exBox("What it looks like in Access",mockDesign("tblPaddler",T.tblPaddler,"PaddlerSurname",{"Validation Rule":"Is Not Null","Validation Text":"Enter the paddler’s surname.","Required":"No"}))});
set("2-08",{ctx:larchT("tblTrip","Difficulty",{"Validation Rule":"?","Validation Text":""}),q:"Requirements from the paper: <i>a record for a new trip will not save if the difficulty is below the accepted range</i> and <i>…above the accepted range.</i> The scenario says difficulty is from 1 to 4. Build the Validation Rule for Difficulty.",
 why:byId("2-08").why+exBox("What it looks like in Access",mockDesign("tblTrip",T.tblTrip,"Difficulty",{"Validation Rule":"Between 1 And 4","Validation Text":"Difficulty must be from 1 to 4."}))});
set("2-09",{ctx:larchT("tblPaddler","PaddlerPhone",{"Field Size":"11","Input Mask":"?"}),q:"Requirement from the paper: <i>a record for a new paddler will not save if the paddler’s telephone number is not in the correct format.</i> The extract shows 11-digit numbers such as 07700900501. Build the Input Mask for PaddlerPhone.",
 why:byId("2-09").why+exBox("What it looks like in Access",mockDesign("tblPaddler",T.tblPaddler,"PaddlerPhone",{"Field Size":"11","Input Mask":"00000000000"}))});
set("2-10",{ctx:SHORT_L+"<p style='margin-top:8px'>Suppose the centre also gives each guide a <b>GuideCode</b> such as G042: the letter G followed by three digits.</p>",q:"Requirement: <i>a record for a new guide will not save if the guide code is not in the correct format.</i> Build a Validation Rule for GuideCode.",
 why:byId("2-10").why+exBox("What it looks like in Access",mockProps("GuideCode (Short Text)",{"Field Size":"4","Validation Rule":'Like "G###"',"Validation Text":"Guide code must be G followed by three digits, e.g. G042."}))});
set("2-11",{ctx:larchT("tblTrip","TripDate",{"Validation Rule":"?"}),q:"Requirement: <i>a record for a trip will not save if the trip date is in the future</i> (trips are only recorded after they happen). Build the Validation Rule for TripDate.",
 why:byId("2-11").why+exBox("What it looks like in Access",mockDesign("tblTrip",T.tblTrip,"TripDate",{"Validation Rule":"<=Date()","Validation Text":"The trip date can’t be in the future."}))});
set("2-12",{ctx:larchT("tblTripBooking","HireCost",{"Validation Rule":"?"}),q:"Requirements: <i>a record for a booking will not save if the hire cost is below the accepted range</i> and <i>…above the accepted range.</i> The centre says hire is never more than £60, and paddlers with their own kit pay £0. Build the Validation Rule for HireCost.",
 why:byId("2-12").why+exBox("What it looks like in Access",mockDesign("tblTripBooking",T.tblTripBooking,"HireCost",{"Validation Rule":">=0 And <=60","Validation Text":"Hire cost must be from £0 to £60."}))});
set("2-01",{ctx:SHORT_L+"<p style='margin-top:8px'>A learner’s evidence for the presence check:</p>"+byId("2-01").ctx});
set("2-02",{ctx:SHORT_L+"<p style='margin-top:8px'>A learner’s evidence for the presence check:</p>"+byId("2-02").ctx});
set("2-03",{ctx:SHORT_L+"<p style='margin-top:8px'>A learner’s evidence for the table lookup (Lookup tab of TripID in tblTripBooking):</p>"+byId("2-03").ctx});
set("2-04",{ctx:SHORT_L+"<p style='margin-top:8px'>Another learner’s evidence for the same table lookup:</p>"+byId("2-04").ctx});
set("2-05",{ctx:SHORT_L+"<p style='margin-top:8px'>A learner’s evidence for the format check:</p>"+byId("2-05").ctx});
set("2-06",{ctx:SHORT_L+"<p style='margin-top:8px'>A learner’s cropped evidence. The table name has been cut off the top:</p>"+byId("2-06").ctx});

/* ================= Activity 3 ================= */
["3-01","3-02","3-03","3-04","3-05","3-06","3-07","3-08"].forEach(id=>set(id,{ctx:larch()}));
set("3-09",{ctx:larch(),q:"(b) Hire is charged with 20% VAT added. Create a query to display the hire cost with VAT for each booking.<br>Calculate: • the hire cost with VAT.<br>Build the calculated field and call it <b>HireWithVAT</b>.",
 why:byId("3-09").why+exBox("What it looks like in Access",mockQBE([{f:"PaddlerSurname",t:"tblPaddler"},{f:"HireCost",t:"tblTripBooking"},{f:"HireWithVAT: [HireCost]*1.2",t:""}]))});
set("3-10",{ctx:larch(),q:"(c) Each trip should have at least 3 paddlers. Create a report that shows the bookings for each trip.<br>For each trip, display: • the words <b>Under-booked</b> if the trip has fewer than 3 paddlers.<br>Build the expression for the text box in the trip’s group footer.",
 why:byId("3-10").why+exBox("What it looks like in Access",mockReport([{band:"TripName Header",controls:["TripName"]},{band:"Detail",controls:["PaddlerSurname"]},{band:"TripName Footer",controls:["=Count(*)","=IIf(Count(*)<3,\"Under-booked\",\"\")"]}]))});
set("3-11",{ctx:larch(),q:"(b) Create a query to display a list of paddlers.<br>Calculate: • the number of times each paddler did not attend.<br>Build the calculated field (it goes in a Totals query grouped by paddler) and call it <b>Absences</b>.",
 why:byId("3-11").why+exBox("What it looks like in Access",mockQBE([{f:"PaddlerSurname",t:"tblPaddler",total:"Group By"},{f:"Absences: Sum(IIf([Attended]=False,1,0))",t:"",total:"Expression"}],true))});
set("3-12",{ctx:larch(),q:"(b) Create a query to display each paddler’s surname and age.<br>Calculate: • the age of each paddler in whole years, for example 17.<br>Build the calculated field and call it <b>Age</b>.",
 why:byId("3-12").why+exBox("What it looks like in Access",mockQBE([{f:"PaddlerSurname",t:"tblPaddler"},{f:"Age: Int((Date()-[PaddlerDOB])/365.25)",t:""}]))});
set("3-13",{ctx:larch(),q:"(c) Once a month the centre celebrates the birthdays of paddlers born in that month. Create a report grouped by month.<br>For each month, display: • the month number.<br>Build the calculated field the report will group on, called <b>BirthMonth</b>.",
 why:byId("3-13").why+exBox("What it looks like in Access",mockQBE([{f:"BirthMonth: Month([PaddlerDOB])",t:""},{f:"PaddlerSurname",t:"tblPaddler"},{f:"PaddlerDOB",t:"tblPaddler"}]))});
set("3-14",{ctx:larch(),q:"(b) Club members get 10% off the hire cost. Create a query to display the price members pay.<br>Calculate: • the hire cost after the discount.<br>Build the calculated field and call it <b>MemberPrice</b>.",
 why:byId("3-14").why+exBox("What it looks like in Access",mockQBE([{f:"HireCost",t:"tblTripBooking"},{f:"MemberPrice: [HireCost]*0.9",t:""}]))});
set("3-15",{ctx:larch(),q:"(a) Create a query to display information about trips held in 2026. Build the criterion for the TripDate column.",
 why:byId("3-15").why+exBox("What it looks like in Access",mockQBE([{f:"TripName",t:"tblTrip"},{f:"TripDate",t:"tblTrip",crit:"Between #01/01/2026# And #31/12/2026#"}]))});
set("3-16",{ctx:larch(),q:"(c) For each month, calculate: • the birth date of the <b>oldest</b> paddler in that month.<br>Build the expression for the text box in the BirthMonth group footer.",
 why:byId("3-16").why+exBox("What it looks like in Access",mockReport([{band:"BirthMonth Header",controls:["BirthMonth"]},{band:"Detail",controls:["PaddlerSurname","PaddlerDOB"]},{band:"BirthMonth Footer",controls:["=Count(*)","=Min([PaddlerDOB])","=Max([PaddlerDOB])"]}]))});
["3-17","3-18","3-19"].forEach(id=>pre(id,larch()));
pre("3-20",larch()+exBox("The learner’s report (Print Preview)",mockSheet(["Trip","Paddler","Paddlers on trip"],[["Estuary Explorer","Adeyemi",""],["","Brennan",""],["","Chowdhury","11"],["Loch Crossing","Adeyemi",""],["","Dunne",""],["","Evans","11"]],{name:"rptTripBookings"})));
pre("3-21",larch());pre("3-22",EX.a3);pre("3-23",EX.a3);pre("3-24",EX.a3);pre("3-25",larch()+exBox("A learner’s datasheet",mockSheet(["PaddlerSurname","HireCost","Expr1"],[["Adeyemi","£15.00","£18.00"],["Brennan","£15.00","£18.00"]],{name:"qryVAT"})));
pre("3-26",EX.a3);pre("3-28",EX.a3);pre("3-30",larch());
set("3-29",{ctx:"<b>From a past paper (paraphrased):</b> Create a query to display a sorted list of parties. The party manager must be Pauline and the party size <b>at least 35</b>."});
set("3-27",{ctx:larch()+"<p style='margin-top:8px'>The task: <i>Create a query to display trips led by Okafor with a difficulty of at least 3. It must display only the trip name, the trip date and the difficulty.</i> The learner’s datasheet:</p>"+byId("3-27").ctx});

/* ================= Activity 4 ================= */
["4-01","4-02","4-03","4-04","4-08"].forEach(id=>pre(id,SHORT_L+REQ_L+det("Show the table designs",["tblGuide","tblTrip","tblPaddler","tblTripBooking"].map(t=>mockDesign(t,T[t])).join(""))));
set("4-05",{ctx:SHORT_L+"<p style='margin-top:8px'>Test 2 is: <i>a record for a new paddler will not save if the paddler’s telephone number is not in the correct format.</i> A learner’s test row:</p>"+byId("4-05").ctx});
pre("4-06",EX.a4);pre("4-07",EX.a4);

/* ================= Activity 5 ================= */
["5-01","5-03","5-04","5-05","5-06","5-07"].forEach(id=>pre(id,EX.a5+"<p style='margin-top:8px'>"+SHORT_L+"</p>"+det("Show the data and the tables",DATA_L())));
pre("5-02",EX.a5);pre("5-08",EX.a5);

/* ================= Activity 6 ================= */
["6-02","6-03","6-04","6-07","6-08","6-09","6-10","6-11","6-14","6-15","6-17","6-18","6-19","6-20","6-21","6-22","6-23","6-25","6-26","6-27","6-28","6-29","6-31","6-33","6-34","6-35","6-36"].forEach(id=>pre(id,bike()));
pre("6-30",EX.a6);
["6-01","6-05","6-06","6-12","6-13","6-16","6-24","6-32"].forEach(id=>{const it=byId(id);const own=it.ctx&&it.ctx!==SCEN.bike?it.ctx:"";it.ctx=bike()+(own?"<p style='margin-top:8px'><b>The learner’s work:</b></p>"+own:"");});
const cs=(title,cs)=>exBox("What it looks like in Access",mockProps(title,{"Control Source":cs,"Enabled":"No"}));
set("6-16",{why:byId("6-16").why+cs("txtLastHire",'=DMax("[HireDate]","tblHire","[CustomerID]=" & [cboCustomer])')});
set("6-17",{q:"When the customer is selected, the form must show the number of past hires. Build the Control Source of txtPastHires.",why:byId("6-17").why+cs("txtPastHires",'=DCount("*","tblHire","[CustomerID]=" & [cboCustomer])')});
set("6-18",{q:"When the customer is selected, the form must show the total they have spent. Build the Control Source of txtTotalSpent.",why:byId("6-18").why+cs("txtTotalSpent",'=DSum("[TotalPaid]","tblHire","[CustomerID]=" & [cboCustomer])')});
set("6-19",{q:"The form must show the percentage discount: 10 if the customer has had 5 or more hires, otherwise 0. txtPastHires already shows the number of hires. Build the Control Source of txtDiscount.",why:byId("6-19").why+cs("txtDiscount","=IIf([txtPastHires]>=5,10,0)")});
set("6-20",{why:byId("6-20").why+cs("txtNewBikeID",'=DMax("[BikeID]","tblBike")+1')});
set("6-21",{why:byId("6-21").why+cs("txtHireDate","=Date()")});
set("6-22",{ctx:bike()+"<p style='margin-top:8px'>Imagine Form 2 also has a combo box to choose the bike, and a box <b>txtCategory</b> showing its category name.</p>",why:byId("6-22").why+cs("txtMessage",'=IIf([txtCategory]="E-bike","Check battery","")')});
set("6-23",{ctx:bike()+"<p style='margin-top:8px'>Imagine Form 2 also shows <b>txtRate</b> (the bike’s daily rate), lets staff type <b>txtDays</b>, and shows <b>txtDiscount</b> (e.g. 10).</p>",why:byId("6-23").why+cs("txtNewTotal","=[txtRate]*[txtDays]*(1-[txtDiscount]/100)")});
set("6-01",{why:byId("6-01").why+exBox("What it looks like in Access",mockMacro([[0,"If IsNull([txtBikeName]) Then"],[1,"MessageBox \"Enter the bike name.\""],[1,"StopMacro"],[0,"End If"],[0,"If [txtDailyRate]<5 Or [txtDailyRate]>60 Then"],[1,"MessageBox \"Daily rate must be from £5 to £60.\""],[1,"StopMacro"],[0,"End If"],[0,"OpenQuery qryAppendBike"],[0,"MessageBox \"Bike saved.\""],[0,"GoToRecord , , New"]]))});

/* ================= Activities 7 and 8 ================= */
["7-01","7-02","7-03","7-04","7-05","7-07","7-08"].forEach(id=>pre(id,bike()));
set("7-07",{ctx:"<b>From a past paper (paraphrased):</b> an input form to add a runner. The surname must begin with a single upper case letter, followed by no more than 14 lower case letters. The forename must be present. The runner’s telephone number is also entered on the form."});
set("7-08",{ctx:"<b>From a past paper (paraphrased):</b> the surname must begin with a single upper case letter, followed by no more than 14 lower case letters. The learner used the input mask "+c(">L<??????????????")+" on the form’s surname box."});
pre("7-06",EX.a7);
["8-01","8-02","8-03","8-04","8-05","8-06","8-07"].forEach(id=>pre(id,EX.a8+"<p style='margin-top:8px'>"+SHORT_B+"</p>"));pre("8-08",EX.a8);

/* ================= Decode: exam wording + context + example ================= */
const D=(id,ctx,chips,ex)=>set(id,{ctx,chips,why:byId(id).why+(ex?exBox("What it looks like in Access",ex):"")});
D("2-d01",larchT("tblGuide"),[["a record for a new guide will not save if",0],["the guide’s surname",0],["is not present",1]],mockDesign("tblGuide",T.tblGuide,"GuideSurname",{"Validation Rule":"Is Not Null","Validation Text":"Enter the guide’s surname."}));
D("2-d02",larchT("tblTripBooking"),[["a record booking a paddler onto a trip will not save if",0],["the paddler ID",0],["is invalid",1]],mockDesign("tblTripBooking",T.tblTripBooking,"PaddlerID",{"Display Control":"Combo Box","Row Source":"SELECT tblPaddler.PaddlerID, tblPaddler.PaddlerSurname FROM tblPaddler;","Limit To List":"Yes"},{lookup:true}));
D("2-d03",larchT("tblTrip"),[["a record for a new trip will not save if",0],["the difficulty",0],["is above the accepted range",1]],mockDesign("tblTrip",T.tblTrip,"Difficulty",{"Validation Rule":"Between 1 And 4","Validation Text":"Difficulty must be from 1 to 4."}));
D("2-d04",larchT("tblPaddler"),[["a record for a new paddler will not save if",0],["the paddler’s telephone number",0],["is not in the correct format",1]],mockDesign("tblPaddler",T.tblPaddler,"PaddlerPhone",{"Field Size":"11","Input Mask":"00000000000"}));
D("2-d05","<b>Scenario: Thorncliffe Leisure Club.</b> Every member has a membership level, which is always Bronze, Silver or Gold. There is no separate table of levels.",[["a record for a new member will not save if",0],["the membership level",0],["is not one of Bronze, Silver or Gold",1]],mockProps("MembershipLevel (Short Text)",{"Validation Rule":'In ("Bronze","Silver","Gold")',"Validation Text":"Level must be Bronze, Silver or Gold."}));
D("2-d06","<b>Scenario: Thorncliffe Leisure Club.</b> A class booking can be for 1 to 8 places.",[["a record for a new booking will not save if",0],["the number of places",0],["is below the accepted range",1],["or above the accepted range",1]],mockProps("Places (Number)",{"Validation Rule":"Between 1 And 8","Validation Text":"Places must be from 1 to 8."}));
set("2-d06",{opts:[c("Between 1 And 8"),c(">1 And <8"),c("<1 Or >8"),c("Between 0 And 9")]});
D("2-d07",larchT("tblPaddler")+"<p>The template asks for ‘one suitable example of a length check’. The extract shows PaddlerInitial values such as K, S and R.</p>",[["Display your screenprints to show validation including",0],["one suitable example of",0],["a length check",1]],mockDesign("tblPaddler",T.tblPaddler,"PaddlerInitial",{"Field Size":"1"}));
set("2-d07",{opts:["Field Size = 1 on PaddlerInitial (Short Text)","Field Size left at 255","Validation Rule Between 1 And 1","Input Mask 0"],ans:0});
D("2-d08","<b>Scenario: Thorncliffe Leisure Club.</b> Members give their date of birth when they join.",[["a record for a new member will not save if",0],["the date of birth",0],["is in the future",1]],mockProps("MemberDOB (Date/Time)",{"Validation Rule":"<=Date()","Validation Text":"Date of birth can’t be in the future."}));
D("3-d01",larch(),[["(a) Create a query to display a sorted list of trips",0],["from latest trip date to earliest trip date",1],["It must display only the trip name and the trip date",0]],mockQBE([{f:"TripName",t:"tblTrip"},{f:"TripDate",t:"tblTrip",sort:"Descending"}]));
D("3-d02",larch(),[["(a) Create a query to display a list of paddlers",0],["sorted from youngest to oldest",1],["It must show the paddler surname and date of birth",0]],mockQBE([{f:"PaddlerSurname",t:"tblPaddler"},{f:"PaddlerDOB",t:"tblPaddler",sort:"Descending"}]));
D("3-d03",larch(),[["(a) Create a query to display a list of trips",0],["that have a difficulty of",0],["no more than two",1]],mockQBE([{f:"TripName",t:"tblTrip"},{f:"Difficulty",t:"tblTrip",crit:"<=2"}]));
D("3-d04","<b>From a past paper style:</b> a garden supplier stores roses in tblRose with a field RoseColour holding values such as ‘pale pink’, ‘pink’ and ‘deep pink’.",[["(a) Create a query to display an alphabetically sorted list of roses",0],["that are",0],["any shade of pink",1]],mockQBE([{f:"RoseName",t:"tblRose",sort:"Ascending"},{f:"RoseColour",t:"tblRose",crit:'Like "*pink*"'}]));
set("3-d04",{opts:[c('"pink"'),c('Like "*pink*"'),c('Like "pink*"'),c('= pink')],why:"‘Any shade of’ means the word can appear anywhere in the colour (pale pink, deep pink): "+c('Like "*pink*"')+".",trap:c('Like "pink*"')+" misses ‘pale pink’."});
D("3-d05",larch(),[["(a) Create a query to display paddlers booked on",0],["the Loch Crossing",0],["or",1],["the Island Overnight",0]],mockQBE([{f:"PaddlerSurname",t:"tblPaddler"},{f:"TripName",t:"tblTrip",crit:'"Loch Crossing"',or:'"Island Overnight"'}]));
D("3-d06",larch(),[["(b) Create a query that will calculate",0],["the number of paddlers",1],["booked on each trip",1]],mockQBE([{f:"TripName",t:"tblTrip",total:"Group By"},{f:"Paddlers: PaddlerID",t:"tblTripBooking",total:"Count"}],true));
D("3-d07",larch(),[["(c) Display",0],["the words ‘Full’ if",1],["the trip has 8 or more paddlers",0]],mockReport([{band:"TripName Footer",controls:["=IIf(Count(*)>=8,\"Full\",\"\")"]}]));
D("3-d08",larch(),[["(c) Create a report that shows the bookings.",0],["For each trip",1],["calculate the total hire cost.",0],["Display the overall total",1],["for all trips.",0]],mockReport([{band:"TripName Footer",controls:["=Sum([HireCost])"]},{band:"Report Footer",controls:["=Sum([HireCost])"]}]));
D("3-d09",larch(),[["(b) The selling price of hire kit",0],["is calculated by increasing the hire cost by 5%",1],["Calculate the new price",0]],mockQBE([{f:"HireCost",t:"tblTripBooking"},{f:"NewPrice: [HireCost]*1.05",t:""}]));
D("3-d10",larch(),[["(b) Create a query to display information about trips",0],["held in July 2026",1]],mockQBE([{f:"TripName",t:"tblTrip"},{f:"TripDate",t:"tblTrip",crit:"Between #01/07/2026# And #31/07/2026#"}]));
D("3-d11",larch(),[["(b) For each guide",1],["calculate and display",0],["the highest",1],["difficulty they have led",0]],mockQBE([{f:"GuideSurname",t:"tblGuide",total:"Group By"},{f:"Difficulty",t:"tblTrip",total:"Max"}],true));
set("3-d11",{why:"‘For each guide’ = Group By guide; ‘the highest’ = Max. Together: one row per guide showing the highest difficulty."});
D("3-d12",larch(),[["(c) Each trip should have",0],["a minimum of three paddlers.",1],["Display",0],["the words ‘More paddlers needed’ if more paddlers are needed",1]],mockReport([{band:"TripName Footer",controls:["=Count(*)","=IIf(Count(*)<3,\"More paddlers needed\",\"\")"]}]));
D("6-d01",bike(),[["When the customer is selected,",1],["this information must be automatically displayed:",0],["their most recent",1],["hire date",0]],mockProps("txtLastHire",{"Control Source":'=DMax("[HireDate]","tblHire","[CustomerID]=" & [cboCustomer])',"Enabled":"No"}));
D("6-d02",bike(),[["When the customer is selected,",1],["this information must be automatically displayed:",0],["the number of",1],["past hires",0]],mockProps("txtPastHires",{"Control Source":'=DCount("*","tblHire","[CustomerID]=" & [cboCustomer])',"Enabled":"No"}));
D("6-d03",bike(),[["Form 1:",0],["The bike name",0],["must be present.",1]],mockMacro([[0,"If IsNull([txtBikeName]) Then"],[1,"MessageBox \"Enter the bike name.\""],[1,"StopMacro"],[0,"End If"]]));
set("6-d03",{opts:["A macro: If IsNull([txtBikeName]) → MessageBox → StopMacro","Validation Rule in tblBike","Required = Yes in tblBike","Input mask"]});
D("6-d04","<b>From a past paper (paraphrased):</b> an input form to add a runner to tblRunner (the table must not be changed).",[["The surname",0],["must begin with a single upper case letter,",1],["followed by no more than 14 lower case letters.",1]],mockProps("txtSurname",{"Input Mask":">L<??????????????"}));
D("6-d05",bike(),[["Valid data should be",0],["appended to the bike table,",1],["a save message should display",1],["and the form should be cleared ready for the next data entry.",1]],mockMacro([[0,"(checks first, each ending StopMacro)"],[0,"OpenQuery qryAppendBike"],[0,"MessageBox \"Bike saved.\""],[0,"GoToRecord , , New"]]));
D("6-d06","<b>From a past paper (paraphrased):</b> a garden club keeps one row per year in tblReview (ReviewYear, Plan). Form 2 is used to review the year.",[["When the form opens",1],["this information must be automatically generated:",0],["the year to be reviewed, which is the most recent year in the review table",1],["plus one",1]],mockProps("txtYear",{"Control Source":'=DMax("[ReviewYear]","tblReview")+1',"Enabled":"No"}));
D("6-d07",bike(),[["There should be",0],["a combo box to select",1],["the category ID from the category table.",1]],mockProps("cboCategory",{"Row Source":"SELECT tblCategory.CategoryID, tblCategory.CategoryName FROM tblCategory;","Bound Column":"1","Column Widths":"0cm;3cm"}));
D("6-d08",bike(),[["Form 2:",0],["The form must not include validation for any fields.",1],["The form must not include an automated routine to save the data.",1]],null);
})();
