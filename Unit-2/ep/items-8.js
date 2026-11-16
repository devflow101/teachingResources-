/* Activity 8: Interface evaluation (6 marks). */
"use strict";
ITEMS.push(
{id:"8-01",lo:"8",act:"8",type:"mcq",q:"Which sentence fits the top band of Activity 8?",
 opts:["My forms are user friendly.","On the Add a Bike form the category is chosen from a combo box, so the receptionist picks ‘Mountain’ instead of remembering CategoryID 3, and can’t enter a category that doesn’t exist.","I used a combo box and a macro.","Forms are important in databases."],ans:1,
 why:"Band 3: both forms discussed, tied to the scenario, saying what each choice means for the user."},
{id:"8-02",lo:"8",act:"8",type:"mcq",q:"Which point is about <b>performance</b> of the interface?",
 opts:["The returning-customer form shows the last hire, past hires and discount as soon as the customer is chosen, so staff don’t search the hire records by hand","The title is in bold","The tables are normalised","The test log is complete"],ans:0,
 why:"Quality, performance and usability through the eyes of the user. Speed and effort saved count as performance."},
{id:"8-03",lo:"8",act:"8",type:"mcq",q:"An Activity 8 answer explains how tblHire links to tblCustomer. What will the examiner think?",
 opts:["Good: it shows understanding","It belongs in Activity 5 (structure) and earns little here","Full marks","It counts for both"],ans:1,
 why:"Examiners: Part B evaluation is about the interface from the user’s point of view. If a sentence would also fit Activity 5, it is probably not what’s wanted."},
{id:"8-04",lo:"8",act:"8",type:"sort",q:"Is each statement about the user, or just describing what was built?",buckets:["Describes what was built","Says what it means for the user"],
 items:[["I added a Save button with a macro.",0],["The save message tells staff the bike is in the system, so they don’t add it twice.",1],["Form 2 uses DMax.",0],["Because the discount appears automatically, staff can’t forget to apply it.",1]],
 why:"Examiners say learners describe what they did ‘with no thought or mention of the user’. Always add ‘so the user…’."},
{id:"8-05",lo:"8",act:"8",type:"sort",q:"Quality, performance or usability?",buckets:["Quality","Performance","Usability"],
 items:[["The rate check stops £600 being entered by mistake",0],["The form clears itself after saving, ready for the next bike",1],["Labels say ‘Daily Rate (£5–£60)’ so staff know the limits",2],["The combo box only lists real categories",0],["Totals appear instantly instead of being worked out by hand",1],["Asterisks show which boxes are required",2]],
 why:"Quality = accurate, reliable data. Performance = speed and effort. Usability = how easy it is to understand and use. There is overlap; what matters is explaining it."},
{id:"8-06",lo:"8",act:"8",type:"order",q:"Put this top-band Activity 8 point in order.",
 steps:["On the Add a Bike form, the daily rate is checked by the Save macro,","so if the receptionist types 600 instead of 60.0 they are told straight away and the bike isn’t saved.","This keeps the hire prices right for customers.","One weakness is that the message doesn’t say what was typed, so a later version could show the value entered."],
 why:"Feature → what happens to the user → why it matters in the scenario → an honest weakness. Examiners note that learners often ignore issues."},
{id:"8-07",lo:"8",act:"8",type:"order",q:"Put this Form 2 point in order.",
 steps:["When staff choose a returning customer,","the form shows their last hire date, number of hires, total spent and discount without any typing,","so the 10% discount for five or more hires is always applied correctly,","and staff can serve the customer faster at a busy counter."],
 why:"Specific behaviour → user benefit → link to the scenario’s rule."},
{id:"8-08",lo:"8",act:"8",type:"mcq",q:"What must Activity 8 cover?",
 opts:["Both forms, judged on quality, performance and usability for the user, tied to the scenario","Only the better form","The tables and normalisation","The queries"],ans:0,
 why:"The Band 3 descriptor starts ‘Will discuss both forms’. Examiners note some learners leave one form out."}
);
