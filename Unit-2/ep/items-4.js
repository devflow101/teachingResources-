/* Activity 4: Structure testing (6 marks). */
"use strict";
const T4A="Test: a record for a new paddler will not save if the paddler’s surname is not present.";
ITEMS.push(
{id:"4-01",lo:"4",act:"4",type:"mcq",q:T4A+" Which <b>test data</b> entry would an examiner put in Band 3?",
 opts:["Leave the surname blank","PaddlerSurname: (blank) · PaddlerInitial: K · PaddlerDOB: 12/03/2008 · PaddlerPhone: 07700900599","Testing the presence check on surname","A screenshot of tblPaddler"],ans:1,
 why:"Band 3 needs specific data for <b>every</b> input field, so that only the field under test is wrong. ‘Leave blank’ is Band 2; describing the test or pasting the table earns nothing."},
{id:"4-02",lo:"4",act:"4",type:"mcq",q:T4A+" Which <b>expected result</b> is specific enough?",
 opts:["Error message","It won’t save","The message ‘Enter the paddler’s surname.’ appears and the record is not saved","The error message saying enter the surname was displayed"],ans:2,
 why:"An independent tester must be able to judge pass or fail. State the exact message and what happens. Option D is written in the past tense: that is an actual result, not an expected one."},
{id:"4-03",lo:"4",act:"4",type:"mcq",q:"Test: a record for a new trip will not save if the difficulty is above the accepted range. Which test data is best?",
 opts:["Difficulty: 5 · TripName: Bay Paddle · TripDate: 02/08/2026 · OvernightCamp: No · GuideID: 2","Difficulty: 9","Difficulty: 4","Difficulty: high"],ans:0,
 why:"5 is the first value above 4, every other field is valid, and the GuideID exists. Using 4 tests the wrong thing; ‘high’ tests the data type, not the range."},
{id:"4-04",lo:"4",act:"4",type:"mcq",q:"Test: a booking will not save if the paddler ID is invalid. Which test data is right?",
 opts:["TripID: 101 · PaddlerID: 999 (not in tblPaddler) · Attended: Yes · HireCost: £15.00","PaddlerID: blank","PaddlerID: 501","TripID: 999 · PaddlerID: 999"],ans:0,
 why:"Only the paddler ID should be wrong, and it must be one that doesn’t exist. Two wrong fields means you can’t tell which one caused the error."},
{id:"4-05",lo:"4",act:"4",type:"multi",ctx:"<table class='tbl'><tr><th>Test</th><th>Test data</th><th>Expected result</th><th>Actual result</th></tr><tr><td>2</td><td>Phone not in the correct format</td><td>An error</td><td>[screenshot: Access message ‘The value you entered isn’t appropriate for the input mask…’; phone shows 0770]</td></tr></table>",
 q:"What is wrong with this test row? Select all.",
 opts:["The test data repeats the test instead of giving data for each field","The expected result is too vague","The actual result can’t be matched to any stated test data","The test is not one of the six listed"],ans:[0,1,2],
 why:"Give the data for every field (e.g. phone 0770 plus the other fields), say exactly what message will appear, and make sure the screenshot shows the data you said you’d use."},
{id:"4-06",lo:"4",act:"4",type:"multi",q:"Which are true about Activity 4? Select all.",
 opts:["Only the six tests in the paper are marked","Adding a valid-data test before each invalid test wastes time","Tests that all pass are not penalised if the testing is accurate","You must find at least one error"],ans:[0,1,2],
 why:"Straight from the examiner reports: only the listed tests count, extra tests waste time, and no errors is fine."},
{id:"4-07",lo:"4",act:"4",type:"mcq",q:"Who should the test plan be written for?",
 opts:["The learner themselves","An independent tester who has never seen the database","The examiner only","The end user"],ans:1,
 why:"Examiners: ‘write the test plan for an independent tester’. Would they know exactly what to type, what should happen and whether it passed?"},
{id:"4-08",lo:"4",act:"4",type:"mcq",q:"The test data includes an AutoNumber PaddlerID. Where should it go?",
 opts:["In the test data, or in the expected results as the value that will be generated","Nowhere","Only in the actual result","In the error column"],ans:0,
 why:"An AutoNumber isn’t typed, so either give it in the test data or say in the expected result what it will be generated as."}
);
