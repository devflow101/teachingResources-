/* Activity 7: Interface testing (6 marks). Uses Hollin Bridge Bike Hire. */
"use strict";
ITEMS.push(
{id:"7-01",lo:"7",act:"7",type:"mcq",ctx:SCEN.bike,q:"Test: the bike name must be present. Which test data is Band 3?",
 opts:["Bike name blank","Bike Name: (blank) · Daily Rate: £12.00 · Category: Mountain","Testing the presence check","Bike Name: Trailblazer"],ans:1,
 why:"Data for every input field on the form, with only the bike name wrong. The Bike ID is generated, so it goes in the expected results."},
{id:"7-02",lo:"7",act:"7",type:"mcq",q:"Test: the daily rate must be within the specified range (£5–£60). Which expected result is best?",
 opts:["Error","The message ‘Daily rate must be from £5 to £60.’ appears and no record is added to tblBike","It doesn’t work","The record saves"],ans:1,
 why:"Exact message plus what does (or doesn’t) happen to the table."},
{id:"7-03",lo:"7",act:"7",type:"mcq",q:"Test: the form is ready for data entry when it opens. Which test data fits?",
 opts:["Open frmAddBike; no data entered","Bike Name: Trailblazer","Delete a record","None needed, so leave it blank"],ans:0,
 why:"Some tests are actions, not data: say exactly what the tester does. Expected: every box empty, Bike ID shows (New), cursor in Bike Name."},
{id:"7-04",lo:"7",act:"7",type:"mcq",q:"Test: a record will save in the bike table if all the data is present and valid. What should the actual result show?",
 opts:["The ‘Bike saved.’ message only","The data typed in, the save message, and tblBike with the new record and its generated Bike ID","A blank form","The macro"],ans:1,
 why:"Show the data used, the message and the record in the table, so the tester can see it really saved."},
{id:"7-05",lo:"7",act:"7",type:"mcq",q:"Test: when a customer is chosen, Form 2 shows their most recent hire date, past hires and total spent. What makes the expected result specific?",
 opts:["‘The details appear’","Naming the customer to choose and the exact values that should appear, e.g. Customer 7: last hire 17/05/2026, 6 hires, £214.00, discount 10","‘Correct values appear’","A screenshot"],ans:1,
 why:"Work the values out from the data first so the tester can check them. ‘Correct values’ can’t be judged."},
{id:"7-06",lo:"7",act:"7",type:"multi",q:"Which are true for Activity 7? Select all.",
 opts:["Only the listed tests are marked","The same rules as Activity 4 apply: full test data, specific expected results, actual results showing the data","You may delete the errors column if you found none","Extra tests earn extra marks"],ans:[0,1,2],
 why:"Examiners repeat the Activity 4 advice for Activity 7, and allow the errors column to go if empty."},
{id:"7-07",lo:"7",act:"7",type:"mcq",q:"Test: the surname must begin with a single upper case letter followed by up to 14 lower case letters. Which test data tests it best?",
 opts:["Surname: o’brien (starts lower case) · Forename: Liam · Phone: 07700900711","Surname: O’Brien","Surname: (blank)","Surname: 12345"],ans:0,
 why:"Use data that breaks exactly the rule under test. A blank surname tests the presence check, not the format."},
{id:"7-08",lo:"7",act:"7",type:"mcq",q:"Your input mask quietly forces the first letter to upper case, so ‘o’brien’ is saved as ‘O’brien’. What should the actual result say?",
 opts:["Hide it","Show it and explain: the mask converted the first letter, so the rule is enforced by converting rather than rejecting","Change the test","Say it failed and stop"],ans:1,
 why:"Examiners reward errors and surprises that are picked up and understood. Describe what happened and whether it meets the requirement."}
);
