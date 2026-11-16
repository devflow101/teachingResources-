/* Unit 2 exam prep: shared data. Loaded after mock.js, before items-*.js */
"use strict";
const ITEMS=[];
/* Show Access syntax safely inside question HTML */
const c=s=>"<code>"+String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</code>";

/* ============ ANCHOR DATA: Larchmere Kayak Centre (original, Part A) ============ */
const LK={
 guides:[[1,"Okafor","07700900111"],[2,"Lindqvist","07700900222"],[3,"Bhatt","07700900333"]],
 trips:[[101,"Estuary Explorer","14/06/2026",2,"No",1],[102,"Loch Crossing","21/06/2026",4,"Yes",2],[103,"River Sprint","05/07/2026",3,"No",1],[104,"Island Overnight","12/07/2026",3,"Yes",3]],
 paddlers:[[501,"Adeyemi","K","12/03/2008","07700900501"],[502,"Brennan","S","30/11/2007","07700900502"],[503,"Chowdhury","R","02/05/2009","07700900503"],[504,"Dunne","M","19/08/2006","07700900504"],[505,"Evans","T","07/01/2008","07700900505"],[506,"Farooq","A","25/09/2007","07700900506"]],
 bookings:[[101,501,"Yes",15],[101,502,"Yes",15],[101,503,"No",15],[102,501,"Yes",25],[102,504,"Yes",25],[102,505,"Yes",30],[103,502,"No",0],[103,506,"Yes",20],[104,503,"Yes",35],[104,504,"Yes",35],[104,501,"No",0]]
};
LK.cols=["Trip ID","Trip Name","Trip Date","Difficulty","Overnight Camp","Guide ID","Guide Surname","Guide Phone","Paddler ID","Paddler Surname","Paddler Initial","Paddler DOB","Paddler Phone","Attended","Hire Cost"];
LK.flat=LK.bookings.map(b=>{const t=LK.trips.find(x=>x[0]===b[0]),g=LK.guides.find(x=>x[0]===t[5]),p=LK.paddlers.find(x=>x[0]===b[1]);return [t[0],t[1],t[2],t[3],t[4],g[0],g[1],g[2],p[0],p[1],p[2],p[3],p[4],b[2],"£"+b[3].toFixed(2)];});

const SCEN={
 larch:`<b>Larchmere Kayak Centre</b> runs guided kayak trips on the lakes and estuary. Each trip has a name, a date and a difficulty level from 1 (gentle) to 4 (expert), and some trips include an overnight camp. Every trip is led by one guide, but a guide can lead many trips. Paddlers book places on trips and many paddlers go on each trip. For each booking the centre records whether the paddler turned up and how much they paid to hire kit for that trip; paddlers who bring their own kit pay nothing.`,
 larchReq:`<ul><li>a record for a new paddler will not save if the paddler’s surname is not present</li><li>a record for a new paddler will not save if the paddler’s telephone number is not in the correct format</li><li>a record for a new trip will not save if the difficulty is below the accepted range</li><li>a record for a new trip will not save if the difficulty is above the accepted range</li><li>a record booking a paddler onto a trip will not save if the trip ID is invalid</li><li>a record booking a paddler onto a trip will not save if the paddler ID is invalid.</li></ul>`
};
SCEN.bike=`<b>Hollin Bridge Bike Hire</b> (Part B: the tables are already built and must not be changed). <b>tblCategory</b>(CategoryID, CategoryName) · <b>tblBike</b>(BikeID AutoNumber, BikeName, DailyRate Currency, CategoryID) · <b>tblCustomer</b>(CustomerID, CustomerSurname, CustomerPhone) · <b>tblHire</b>(HireID, CustomerID, BikeID, HireDate, Days, TotalPaid). <br><b>Form 1</b> adds a bike: the bike name must be present; the daily rate must be from £5 to £60; a combo box selects the category from the category table; valid data is appended, a save message shows and the form clears. <br><b>Form 2</b> is for a returning customer: no validation and no automated save. Choosing a customer in a combo box shows their most recent hire date, their number of past hires, their total spent and their discount (10% for 5 or more hires).`;
SCEN.larchExtract=()=>mockSheet(LK.cols,LK.flat,{name:"Figure 1: data extract"});

/* ============ EXAM STRUCTURE ============ */
const BLUEPRINT=[
 {task:"Part A",act:"Activity 1 · Database relationships",m:8,lo:"1"},
 {task:"Part A",act:"Activity 2 · Table structures & validation",m:8,lo:"2"},
 {task:"Part A",act:"Activity 3 · Queries & report",m:12,lo:"3"},
 {task:"Part A",act:"Activity 4 · Structure testing",m:6,lo:"4"},
 {task:"Part A",act:"Activity 5 · Structure evaluation",m:6,lo:"5"},
 {task:"Part B",act:"Activity 6 · Forms",m:14,lo:"6"},
 {task:"Part B",act:"Activity 7 · Interface testing",m:6,lo:"7"},
 {task:"Part B",act:"Activity 8 · Interface evaluation",m:6,lo:"8"}
];
const WARNINGS=[
 "No relationships screenprint in Activity 1, or the database file handed in instead. The database is never marked.",
 "Three or five tables when the extract needs four. The link table for the many-to-many is the one most often missed.",
 "Design-view screenshots missing, cropped, or taken before the data types were set, so every field still says Short Text.",
 "Table lookups with Limit To List left on No, or cropped so the examiner can’t see it.",
 "Presence checks done only with Required = Yes, put on a primary key, or with no validation text.",
 "Format checks on Number or Date fields. A format check only counts on a Short Text field.",
 "Truncated column names or data, extra fields shown, or calculated fields left as Expr1.",
 "Report totals in the wrong band (overall instead of per group), a report over one page, or no PDF of the report.",
 "Skipping Activity 3. It is the biggest block of Part A marks, and many of its points don’t need the calculation to work.",
 "Test data given only for the field being tested, expected results that just say ‘error message’, or extra tests nobody asked for.",
 "Evaluations that could be about any database or any form, or that just list what you did. Activity 5 is about the tables; Activity 8 is about the user.",
 "Default wizard forms: the table name as the title, labels with no spaces, boxes far too wide, no asterisks or instructions, the ID not disabled, no Save button.",
 "A Save command that runs whatever the validation found, or And used where Or was needed so nothing can ever save.",
 "Not attempting Form 2. Its title, labels and layout earn marks even if nothing calculates."
];
/* Topic frequency over the 9 series studied (SAM 2019, Jan 2019, Jan 2022, Jan 2023, Jun 2023, Jan 2024, Jun 2024, Jan 2025, Jun 2025). Counts from plan Appendices A and B; recheck any you change. */
const FREQ={linktable:9,fivechecks:9,tablelookup:9,range:9,sortquery:9,groupreport:9,form1:9,iif:5,dmax:6,minmax:5,percent:4,dates:6,combo:8};

const LOS={
"1":{name:"Database relationships",short:"Relationships",acts:"Activity 1 · 8 marks",weight:8,
 why:"You get a flat extract and must split it into tables with the right keys and links. Marks come from two things only: every field in the right table, and the right relationships with referential integrity. Table designs earn nothing here.",
 cards:[
  {f:"What are the only two things Activity 1 marks?",b:"<ol><li>Every field in the right table(s), with keys and nothing extra.</li><li>The relationship lines: right tables, right join fields, right type, referential integrity enforced.</li></ol>"},
  {f:"How many tables does the extract usually need?",b:"Four in every series so far: three ‘things’ and one link table that turns a many-to-many into two one-to-manys."},
  {f:"Two cue phrases that mean many-to-many.",b:"‘Many X … many Y’ on both sides, or something recorded ‘for each’ pairing (each booking, each attendance, each result). That record belongs in the link table."},
  {f:"Where does a foreign key go?",b:"On the <b>many</b> side. If a guide leads many trips, GuideID goes into tblTrip."},
  {f:"What does ‘use all and only the fields shown’ mean?",b:"Don’t invent new fields (no new IDs the extract doesn’t give, no totals) and don’t drop any. You may rename them."},
  {f:"What must the screenprint show?",b:"Every table, every field, the primary keys, the foreign keys, the relationship lines with 1 and ∞, and Enforce Referential Integrity."}
 ]},
"2":{name:"Table structures & validation",short:"Validation",acts:"Activity 2 · 8 marks",weight:8,
 why:"Four things are marked: naming, keys, data types, and five validation checks. Each check is graded Required, Correct or Attempted, so the exact setting and a clear screenshot decide the mark.",
 cards:[
  {f:"Name the five validation checks the template asks for.",b:"Presence, length, value lookup or range, table lookup, format."},
  {f:"Top-tier presence check?",b:"Validation Rule "+c("Is Not Null")+" plus your own Validation Text. Required = Yes on its own is the lower tier."},
  {f:"Top-tier table lookup?",b:"A lookup from the foreign key to the table it comes from, with <b>Limit To List = Yes</b>, and the table name visible in the Row Source."},
  {f:"Top-tier range check?",b:c("Between 1 And 4")+" (or "+c(">=1 And <=4")+") plus Validation Text. Check the scenario for the exact limits."},
  {f:"Which field type can carry a format check?",b:"Short Text only. A format check on a Number or Date field earns nothing."},
  {f:"Primary key AutoNumber: what type is the matching foreign key?",b:"Number (Long Integer). The types must match or the relationship fails."},
  {f:"What must a validation screenshot show?",b:"The field name, and for a key field the table name too. Without them the check drops to Attempted."}
 ]},
"3":{name:"Queries & report",short:"Queries",acts:"Activity 3 · 12 marks",weight:12,why:"The biggest block of Part A marks. Three traits are marked by points: the right fields in the grid, the right sorts/criteria/calculations, and tidy output. Points for fields and presentation don’t need the calculation to work, so always attempt every part.",
 cards:[{f:"What three things earn Activity 3 points?",b:"<ol><li>The right tables and fields in the grid (even if the calculation fails).</li><li>Sorts, criteria and calculations.</li><li>Presentation: only the fields asked for, sensible column order, no truncation, named calculated fields, a titled one-page report.</li></ol>"},
  {f:"AND or OR: which row?",b:"Different fields that must all be true: same Criteria row (AND). Two values for one field: Criteria and or: rows (OR)."},
  {f:"‘Youngest to oldest’ sorts which way?",b:"Date of birth <b>Descending</b>: the youngest has the latest date."},
  {f:"Where do per-group and overall totals go in a report?",b:"Per group → group footer. Overall → report footer."},
  {f:"What is Activity 3(d)?",b:"The report saved from Access as a PDF. Not a screenshot."},
  {f:"What caps you at Band 2 whatever you do?",b:"Building query (b) or the report from one big flat table instead of related tables."},
  {f:"‘The words X if Y’ means…",b:c('IIf(Y,"X","")')+", in a calculated field or a report text box."}]},
"4":{name:"Structure testing",short:"Testing A",acts:"Activity 4 · 6 marks",weight:6,why:"Six tests, exactly the six requirement lines from Activity 2. Marked on how usable the plan is for an independent tester: data for every field, an exact expected result, and actual results that show the same data.",
 cards:[{f:"What does Band 3 test data look like?",b:"A value for every input field in the record, with only the field under test wrong. Blank is written as (blank) or Null."},
  {f:"What makes an expected result specific?",b:"The exact message and what happens to the record, e.g. ‘The message “Enter the paddler’s surname.” appears and the record is not saved.’"},
  {f:"How many tests?",b:"Only the ones in the paper (six). Extra tests waste time and aren’t marked."},
  {f:"Who is the plan written for?",b:"An independent tester who has never seen your database."}]},
"5":{name:"Structure evaluation",short:"Evaluation A",acts:"Activity 5 · 6 marks",weight:6,why:"A written evaluation of your tables only: how they remove the duplication in the extract, and how the structure meets the listed requirements. Generic writing about normalisation stays in Band 2.",
 cards:[{f:"What two things does Activity 5 evaluate?",b:"How well your structure minimises data duplication, and how well it meets the requirements listed in the paper."},
  {f:"Sentence frame for duplication?",b:"‘[Data] was repeated for every [row] in the extract, so I moved it into [table], linked by [key], so it is stored once and the link is kept.’"},
  {f:"What does it ignore?",b:"Queries, reports, testing and the user. Users are for Activity 8."},
  {f:"What must you say about validation?",b:"Your choice of validation for the scenario’s rules, including table lookups on the foreign keys."}]},
"6":{name:"Forms",short:"Forms",acts:"Activity 6 · 14 marks",weight:14,why:"The biggest single activity. Form 1 adds a record with validation in a macro and an automated save. Form 2 shows generated values (DMax, DCount, DLookup…) for a record chosen in a combo box, with no validation and no save. How the forms look is a separate trait and the easiest place to bank marks.",
 cards:[{f:"Where must Form 1’s presence checks go?",b:"In a macro or code. Not in the tables (they must not change), and not as a rule on the control."},
  {f:"Order of Form 1’s Save macro?",b:"Each check → message → StopMacro. Then append (unbound) or SaveRecord (bound), saved message, GoToRecord New."},
  {f:"Rejecting values outside 5–60: And or Or?",b:"Or: [Rate]<5 <b>Or</b> [Rate]>60. And would never be true."},
  {f:"Domain functions: which is which?",b:"DMax latest/highest · DMin earliest/lowest · DCount how many · DSum total · DAvg average · DLookup one value."},
  {f:"How do you tie a value to the combo box?",b:"Add a criterion: "+c('"[CustomerID]=" & [cboCustomer]')+"."},
  {f:"What moves Trait 1 to Band 4?",b:"Real titles, labels with spaces, sensible widths, input aids (asterisks, instructions, combo boxes), generated fields disabled, the same house style on both forms."},
  {f:"What does Form 2 never need?",b:"Validation or an automated save."}]},
"7":{name:"Interface testing",short:"Testing B",acts:"Activity 7 · 6 marks",weight:6,why:"The same rules as Activity 4, for the forms: the listed tests only, data for every field, specific expected results, actual results showing the data and messages.",
 cards:[{f:"How do you test ‘ready for data entry’?",b:"Test data: ‘Open the form; enter nothing.’ Expected: all boxes empty, ID shows (New), cursor in the first box."},
  {f:"How do you test Form 2’s generated values?",b:"Choose a named record and state the exact values you expect, worked out from the data."},
  {f:"What if something surprising happens?",b:"Show it and explain it. Errors that are picked up and understood are credited."}]},
"8":{name:"Interface evaluation",short:"Evaluation B",acts:"Activity 8 · 6 marks",weight:6,why:"A written evaluation of both forms through the eyes of the user: quality, performance and usability. Don’t describe what you built without saying what it means for the person using it.",
 cards:[{f:"What does Band 3 need?",b:"Both forms, related to the scenario, saying what each feature means for the end user."},
  {f:"Sentence frame?",b:"‘On [form], [feature] means [user] can [benefit] without [problem], because [scenario reason].’"},
  {f:"Quality, performance, usability?",b:"Quality: accurate data. Performance: speed and effort saved. Usability: easy to understand and use."},
  {f:"What does Activity 8 not cover?",b:"Tables and normalisation: that is Activity 5."}]}
};

const LEARN={
"1":[
 {h:"Read the scenario for the links",f:"linktable",b:"<p>Underline every sentence that links two things. Ask the two-way question each time: <i>can one A have many B?</i> and <i>can one B have many A?</i></p><ul><li>Yes one way only → one-to-many. Foreign key on the many side.</li><li>Yes both ways → many-to-many. Make a link table holding both IDs.</li></ul><p>Example: one guide leads many trips, but a trip has one guide → one-to-many. Many paddlers per trip and many trips per paddler → many-to-many → tblTripBooking.</p>",ex:"The scenario paragraph tells you the links; the extract proves them. Use both."},
 {h:"Find where each field belongs",b:"<p>For each column, ask: <i>what does this fact describe?</i> It goes in that thing’s table.</p><ul><li>Trip Date describes the trip → tblTrip.</li><li>Paddler DOB describes the paddler → tblPaddler.</li><li>Attended and Hire Cost change for each paddler on each trip → they describe the <b>booking</b> → tblTripBooking.</li></ul><p>If a value repeats on every row for the same ID (Guide Phone repeats with Guide ID 1), it belongs in that ID’s table, not in the main one.</p>",ex:"Each field counts as one error if it is in a wrong table or missing, however many tables it is wrong in."},
 {h:"Keys and the link table",b:"<p>The IDs in the extract become primary keys. The link table’s key is usually the <b>two foreign keys together</b> (a composite key), because the extract gives it no ID of its own.</p>"+mockRel([{t:"tblTrip",fields:["TripID","TripName","TripDate","Difficulty","OvernightCamp","GuideID"],pk:["TripID"],x:10,y:10},{t:"tblTripBooking",fields:["TripID","PaddlerID","Attended","HireCost"],pk:["TripID","PaddlerID"],x:200,y:10},{t:"tblPaddler",fields:["PaddlerID","PaddlerSurname","PaddlerInitial","PaddlerDOB","PaddlerPhone"],pk:["PaddlerID"],x:390,y:10},{t:"tblGuide",fields:["GuideID","GuideSurname","GuidePhone"],pk:["GuideID"],x:10,y:150}],[["tblGuide.GuideID","tblTrip.GuideID"],["tblTrip.TripID","tblTripBooking.TripID"],["tblPaddler.PaddlerID","tblTripBooking.PaddlerID"]]),ex:"Don’t add a BookingID if the extract doesn’t have one: that is an extra attribute."},
 {h:"Not every scenario has a link table",b:"<p>Some extracts are a chain or a star of one-to-manys: area → shop → staff, with job → staff. Always do the two-way test; don’t force a link table that the data doesn’t need.</p><p>Watch for a fact that depends on another non-key field: an hourly rate set by the job title belongs in the job table, not the staff table.</p>",ex:"Third normal form: every field depends on the key, the whole key, and nothing but the key."},
 {h:"The screenprint",b:"<p>Relationships window → add all four tables → drag each primary key onto its foreign key → tick Enforce Referential Integrity → widen each box so every field shows → screenshot → paste into a document → save as PDF named exactly as the paper says.</p>",ex:"No screenprint = no marks for this activity, even if the database is perfect."}
],
"2":[
 {h:"Naming",b:"<p>Tables start with <b>tbl</b>. Field names follow one style everywhere (all CamelCase, or all with spaces), and ID fields match each other.</p>",ex:"Good table names with inconsistent field names (or the other way round) caps this part at Band 3."},
 {h:"Data types",b:"<table class='tbl'><tr><th>Data</th><th>Type</th></tr><tr><td>Money</td><td>Currency</td></tr><tr><td>Counts, levels, ratings</td><td>Number</td></tr><tr><td>Dates, dates of birth</td><td>Date/Time</td></tr><tr><td>Yes/No facts</td><td>Yes/No</td></tr><tr><td>Phone numbers, postcodes, codes like K102</td><td>Short Text (leading zeros, letters)</td></tr><tr><td>Primary key ID</td><td>AutoNumber or Number</td></tr><tr><td>Foreign key</td><td>Same type as its primary key (AutoNumber → Number)</td></tr></table>",ex:"Take the design-view screenshots after you set the types."},
 {h:"Decode the six requirement lines",f:"fivechecks",b:"<table class='tbl'><tr><th>Wording</th><th>Check</th><th>Top-tier setting</th></tr><tr><td>…will not save if [field] is not present</td><td>Presence</td><td>Validation Rule "+c("Is Not Null")+" + Validation Text</td></tr><tr><td>…is not in the correct format</td><td>Format</td><td>Input Mask (e.g. "+c("00000000000")+" for 11 digits) on a Short Text field</td></tr><tr><td>…is below / above the accepted range</td><td>Range</td><td>"+c("Between 1 And 4")+" + Validation Text</td></tr><tr><td>…if the [X] ID is invalid</td><td>Table lookup</td><td>Lookup to the X table, Limit To List = Yes</td></tr><tr><td>(you choose)</td><td>Length</td><td>Field Size cut to fit a Short Text field (e.g. 1 for an initial)</td></tr></table>",ex:"The same six lines are the six tests in Activity 4. Set them up so they can be tested."},
 {h:"Presence check: rule plus message",b:mockDesign("tblPaddler",[["PaddlerID","AutoNumber",1],["PaddlerSurname","Short Text"],["PaddlerInitial","Short Text"],["PaddlerDOB","Date/Time"],["PaddlerPhone","Short Text"]],"PaddlerSurname",{"Field Size":"30","Validation Rule":"Is Not Null","Validation Text":"Enter the paddler’s surname.","Required":"No"})+"<p>Required = Yes alone is only the middle tier, and examiners say it is ‘not appropriate’. Use the rule and your own message so the Activity 4 test shows <i>your</i> message.</p>",ex:"Never put a presence check on the primary key."},
 {h:"Table lookup: Limit To List = Yes",f:"tablelookup",b:mockDesign("tblTripBooking",[["TripID","Number",1],["PaddlerID","Number",1],["Attended","Yes/No"],["HireCost","Currency"]],"TripID",{"Display Control":"Combo Box","Row Source Type":"Table/Query","Row Source":"SELECT tblTrip.TripID, tblTrip.TripName FROM tblTrip;","Bound Column":"1","Limit To List":"Yes"},{lookup:true})+"<p>Use the Lookup Wizard on the foreign key and choose ‘look up the values in a table’. Then open the Lookup tab and check Limit To List says Yes.</p>",ex:"The screenshot must show the table name and field name, the Row Source and Limit To List."},
 {h:"Format checks",b:"<ul><li>"+c("0")+" = a digit you must enter. "+c("9")+" = an optional digit (so it doesn’t force the length).</li><li>"+c("L")+" = a letter you must enter. "+c(">")+" makes what follows upper case, "+c("<")+" lower case.</li><li>A fixed character: "+c("\\K000")+" or the rule "+c('Like "K###"')+".</li></ul>",ex:"Brackets or spaces added to an 11-digit phone mask drop it to the middle tier: follow the format the scenario gives."},
 {h:"Evidence",b:"<ul><li>One design-view screenshot per table (fields and data types).</li><li>One screenshot per check type, in design view, showing the property and the field name.</li><li>If you give two examples of one check, only the first is marked.</li><li>A datasheet showing data is not evidence of a rule.</li></ul>",ex:"Use the activity2.rtf template and save it as PDF."}
]
};

/* ============ TEST, HOLD-BACK, SKILLS ============ */
const TEST_BLUEPRINT={"1":5,"2":5,"3":8,"4":3,"5":3,"6":10,"7":3,"8":3};
const TEST_MINUTES=50;
const HOLD=new Set(["1-05","1-14","1-21","2-06","2-12","2-18","2-d07","3-05","3-07","3-15","3-19","3-29","3-d10","3-d12","4-04","5-07","6-05","6-11","6-20","6-23","6-26","6-32","6-36","6-d06","7-07","8-07"]);
const HOLD_PER_TEST={"1":1,"2":1,"3":2,"4":1,"5":1,"6":2,"7":1,"8":1};
const rg=(lo,a,b,pre)=>Array.from({length:b-a+1},(_,i)=>lo+"-"+(pre||"")+String(a+i).padStart(2,"0"));
const SKILL={
 "Splitting the extract":["1-01","1-02","1-03","1-04","1-05","1-16","1-17","1-18","1-19"],
 "Keys & relationships":["1-06","1-07","1-08","1-09","1-11","1-12","1-13","1-14","1-15"],
 "Activity 1 method & evidence":["1-10","1-20","1-21","1-22"],
 "Validation tiers":rg("2",1,6),
 "Validation settings":rg("2",7,13),
 "Activity 2 evidence, naming & types":rg("2",14,18).concat(["2-g1","2-g2","2-g3"]),
 "Decode: validation":rg("2",1,8,"d"),
 "Query criteria & sorting":rg("3",1,5).concat(["3-08","3-29","3-g1","3-g2","3-g3","3-g4"]),
 "Totals & calculated fields":["3-06","3-07"].concat(rg("3",9,16)),
 "Report bands":rg("3",17,21),
 "Activity 3 marks & evidence":rg("3",22,28).concat(["3-30"]),
 "Decode: queries & reports":rg("3",1,12,"d"),
 "Activity 4 test plans":rg("4",1,8),
 "Activity 5 evaluation":rg("5",1,8),
 "Form 1 macro & validation":rg("6",1,11),
 "Form layout & usability":rg("6",12,15).concat(["6-31","6-32","6-33"]),
 "Form 2 domain functions":rg("6",16,27).concat(["6-g1","6-g2","6-g3"]),
 "Activity 6 scope & evidence":["6-28","6-29","6-30","6-34","6-35","6-36"],
 "Decode: forms":rg("6",1,8,"d"),
 "Activity 7 test plans":rg("7",1,8),
 "Activity 8 evaluation":rg("8",1,8)
};
if(typeof module!=="undefined")module.exports={};

/* ---- engine compatibility (names the Unit 11 engine expects) ---- */
var SEV=SEV||{},LOSS=LOSS||[],PROBS=PROBS||[];
function fq(k){const n=FREQ[k];if(!n)return "";const hot=n>=7;return " <span class='pill"+(hot?" acc":"")+"' title='Series with this topic'>"+n+" of 9</span>";}
