/* Activity 5: Structure evaluation (6 marks). */
"use strict";
ITEMS.push(
{id:"5-01",lo:"5",act:"5",type:"mcq",q:"Which sentence would help most towards the top band of an Activity 5 evaluation for Larchmere?",
 opts:["Normalisation removes data redundancy and improves integrity.","The guide’s name and phone were repeated on every booking row in the extract, so I moved them into tblGuide, linked to tblTrip by GuideID; now Okafor’s phone is stored once and can’t be stored two different ways.","My database works well and meets all the requirements.","I used Access to build four tables and then did queries."],ans:1,
 why:"Band 3 needs the scenario’s actual repeated data, where it went and how the link is kept. A is true of any database; C and D say nothing about structure."},
{id:"5-02",lo:"5",act:"5",type:"mcq",q:"Which of these does <b>not</b> belong in Activity 5?",
 opts:["How the link table stops paddler details being repeated","Why Difficulty has Between 1 And 4","How easy the forms are to use","Why the trip ID uses a table lookup with Limit To List = Yes"],ans:2,
 why:"Activity 5 is the tables only: duplication and how the structure meets the requirements. Users and forms belong to Activity 8. Queries, reports and testing are ignored."},
{id:"5-03",lo:"5",act:"5",type:"mcq",q:"An evaluation says: ‘The database meets the requirement that difficulty is 1 to 4.’ How could it get more credit?",
 opts:["Add more technical words","Explain the choice: a range rule Between 1 And 4 on Difficulty with a message, so a trip can’t be saved as difficulty 7, which keeps the grading reliable","Say it is good","Describe the test"],ans:1,
 why:"Band 3: discuss your <i>choice</i> of validation for the scenario’s rules, and why it works. Vocabulary without application stays in Band 2."},
{id:"5-04",lo:"5",act:"5",type:"sort",q:"Which evaluation does each statement belong in?",buckets:["Activity 5 (structure)","Activity 8 (user interface)"],
 items:[["Hire Cost is in tblTripBooking because it changes for each paddler on each trip",0],["The disabled Bike ID box stops staff typing over the generated number",1],["The table lookup on PaddlerID means a booking can’t use a paddler who doesn’t exist",0],["Asterisks show staff which boxes they must fill in",1],["Storing guide details once means a phone change is made in one place",0],["The save message tells the receptionist the bike was added",1]],
 why:"Activity 5 = tables, keys, links, validation in the tables. Activity 8 = what the forms mean for the person using them."},
{id:"5-05",lo:"5",act:"5",type:"sort",q:"Generic or about the learner’s own solution?",buckets:["Generic (could be any database)","Own solution"],
 items:[["Primary keys make each record unique.",0],["TripID and PaddlerID together are the key of tblTripBooking, so a paddler can’t be booked onto the same trip twice.",1],["Normalisation is important.",0],["Before, Estuary Explorer’s date was typed on every booking row; now it is stored once in tblTrip.",1]],
 why:"Examiners colour-code scripts to separate own-solution writing from filler. Only the second kind earns the top band."},
{id:"5-06",lo:"5",act:"5",type:"order",q:"Put this top-band Activity 5 paragraph in order.",
 steps:["In the extract, each paddler’s surname, DOB and phone were repeated on every trip they booked.","I moved them into tblPaddler with PaddlerID as its key,","and linked it to the bookings with PaddlerID as a foreign key in tblTripBooking.","Now each paddler’s details are stored once, so a change of phone number is made in one place","and the link still shows every trip they have booked."],
 why:"Repeated data → where it went → how the link is kept → what that achieves for this scenario."},
{id:"5-07",lo:"5",act:"5",type:"order",q:"Put this requirement paragraph in order.",
 steps:["The centre needs every booking to be for a real trip.","I set a table lookup on TripID in tblTripBooking that looks up tblTrip,","with Limit To List set to Yes and referential integrity enforced,","so a booking for trip 109, which doesn’t exist, is rejected."],
 why:"Requirement → the setting you chose → how it is enforced → an example from the scenario."},
{id:"5-08",lo:"5",act:"5",type:"mcq",q:"Which two things must Activity 5 evaluate?",
 opts:["How well the structure minimises data duplication, and how well it meets the listed requirements","How hard the exam was, and what you would do next time","The queries and the report","The forms and the testing"],ans:0,
 why:"Both are in the paper and the mark scheme. Examiners say some learners cover only one of the two."}
);
