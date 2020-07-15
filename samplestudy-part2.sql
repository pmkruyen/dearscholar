#// Copyright (c) 2020 P.M. Kruyen, Institute for Management Research, Radboud University, the Netherlands. 

#// Sample code to set up a study (part 2 of 2).
#// Run this code after you completed the steps in 'samplestudy-part1.sql'

#// Consult the README file and the MySQL setup file for further explanations. 

# // Run the code below in MySQL

# Populate the pageStructure table
INSERT INTO `pageStructure` (`module1`, `classp`, `idp`, `header`, `backbuttontid`, `backbuttontext`, `backbuttononclick`, `backbuttonhref`, `nextbuttonid`, `nextbuttontext`, `nextbuttononclick`, `nextbuttonhref`) VALUES
('A', '\'tab tab-active\'', 'tab-1as', 'Vraag 1 van 9', 'q1s=nee', 'Nee', 'click', '#tab-7as', 'q1s=ja', 'Ja', 'click', '#tab-2as'),
('A', 'tab', 'tab-7as', 'Vraag 2 van 3', 'Terug', 'Terug', '\'\'', '#tab-1as', 'Volgende', 'Volgende', '\'\'', '#tab-7bs'),
('A', 'tab', 'tab-7bs', 'Vraag 3 van 3', 'Terug', 'Terug', '\'\'', '#tab-7as', 'Opslaan', 'Opslaan', 'uploadToServerA', '#'),
('A', 'tab', 'tab-2as', 'Vraag 2 van 9', 'Terug', 'Terug', '\'\'', '#tab-1as', 'Volgende', 'Volgende', '\'\'', '#tab-2bs'),
('A', 'tab', 'tab-2bs', 'Vraag 3 van 9', 'Terug', 'Terug', '\'\'', '#tab-2as', 'Volgende', 'Volgende', '\'\'', '#tab-2cs'),
('A', 'tab', 'tab-2cs', 'Vraag 4 van 9', 'Terug', 'Terug', '\'\'', '#tab-2bs', 'Volgende', 'Volgende', '\'\'', '#tab-3as'),
('A', 'tab', 'tab-3as', 'Vraag 5 van 9', 'q3s=nee', 'Nee', 'click', '#tab-4bs', 'q3s=ja', 'Ja', 'click', '#tab-4as'),
('A', 'tab', 'tab-4as', 'Vraag 6 van 9', 'Terug', 'Terug', '\'\'', '#tab-3as', 'Volgende', 'Volgende', '\'\'', '#tab-8as'),
('A', 'tab', 'tab-4bs', 'Vraag 6 van 8', 'Terug', 'Terug', '\'\'', '#tab-3as', 'Volgende', 'Volgende', '\'\'', '#tab-5bs'),
('A', 'tab', 'tab-5as', 'Vraag 8 van 9', 'Terug', 'Terug', '\'\'', '#tab-8as', 'Volgende', 'Volgende', '\'\'', '#tab-6as'),
('A', 'tab', 'tab-5bs', 'Vraag 7 van 8', 'Terug', 'Terug', '\'\'', '#tab-4bs', 'Volgende', 'Volgende', '\'\'', '#tab-6bs'),
('A', 'tab', 'tab-6as', 'Vraag 9 van 9', 'Terug', 'Terug', '\'\'', '#tab-5as', 'Opslaan', 'Opslaan', 'uploadToServerA', '#'),
('A', 'tab', 'tab-6bs', 'Vraag 8 van 8', 'Terug', 'Terug', '\'\'', '#tab-5bs', 'Opslaan', 'Opslaan', 'uploadToServerA', '#'),
('A', 'tab', 'tab-8as', 'Vraag 7 van 9', 'Terug', 'Terug', '\'\'', '#tab-4as', 'Volgende', 'Volgende', '\'\'', '#tab-5as'),
('B', '\'tab tab-active\'', 'tab-1ao', 'Vraag 1 van 6', 'q1o=nee', 'Nee', 'click', '#tab-7ao', 'q1o=ja', 'Ja', 'click', '#tab-2ao'),
('B', 'tab', 'tab-2ao', 'Vraag 2 van 6', 'Terug', 'Terug', '\"', '#tab-1ao', 'Volgende', 'Volgende', '\'\'', '#tab-3ao'),
('B', 'tab', 'tab-3ao', 'Vraag 3 van 6', 'Terug', 'Terug', '\"', '#tab-2ao', 'Volgende', 'Volgende', '\'\'', '#tab-4ao'),
('B', 'tab', 'tab-4ao', 'Vraag 4 van 6', 'Terug', 'Terug', '\"', '#tab-3ao', 'Volgende', 'Volgende', '\'\'', '#tab-5ao'),
('B', 'tab', 'tab-5ao', 'Vraag 5 van 6', 'Terug', 'Terug', '\"', '#tab-4ao', 'Volgende', 'Volgende', '\'\'', '#tab-6ao'),
('B', 'tab', 'tab-6ao', 'Vraag 6 van 6', 'Terug', 'Terug', '\"', '#tab-5ao', 'Opslaan', 'Opslaan', 'uploadToServerB', '#'),
('B', 'tab', 'tab-7ao', 'Vraag 2 van 2', 'Terug', 'Terug', '\"', '#tab-1ao', 'Opslaan', 'Opslaan', 'uploadToServerB', '#'),
('C', '\'tab tab-active\'', 'tab-1st', '<b>Lorem ipsum...</b>', 'Terug', 'Terug', '\'\'', '/survey/', 'Opslaan', 'Opslaan', 'uploadToServerC', '#'),
('D', '\'tab tab-active\'', 'tab-1rm', '<b>Lorem ipsum.</b>', 'Terug', 'Terug', '\"', '/survey/', 'Opslaan', 'Opslaan', 'uploadToServerD', '#');

# Populate the questionTable table
INSERT INTO `questionTable` (`module2`, `tab`, `idq`, `type`, `question`, `categories`, `footer`) VALUES
('A', 'tab-1as', 'q1s', 'YN', 'This is a yes no question with routing', '', 'Footer text'),
('A', 'tab-7as', 'q7sa', 'OQ', 'Sample open question?', '', ''),
('A', 'tab-7bs', 'q7sb', 'OQ', 'Sample open question?', '', ''),
('A', 'tab-2as', 'q2sa', 'OQ', 'Sample open question?', '', ''),
('A', 'tab-2bs', 'q2sb', 'OQ', 'Sample open question?', '', ''),
('A', 'tab-2cs', 'q2sc', 'OQ', 'Sample open question?', '', ''),
('A', 'tab-3as', 'q3s', 'YN', 'This is a yes no question with routing?', '', ''),
('A', 'tab-4as', 'q4sa', 'OQ', 'Sample open question?', '', 'Footer text'),
('A', 'tab-4bs', 'q4sb', 'OQ', 'Sample open question?', '', ''),
('A', 'tab-5as', 'q5sa', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', ''),
('A', 'tab-5as', 'q5sa2', 'OQ', 'Sample open question?', '', ''),
('A', 'tab-6as', 'q6sa', 'MC', 'Hoe waarschijnlijk acht u het dat het idee ooit wordt gerealiseerd?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', ''),
('A', 'tab-6as', 'q6sa2', 'OQ', 'Sample open question?', '', ''),
('A', 'tab-8as', 'q8sa', 'OQ', 'Sample open question?', '', ''),
('A', 'tab-5bs', 'q5sb', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', ''),
('A', 'tab-5bs', 'q5sb2', 'OQ', 'Sample open question?', '', ''),
('A', 'tab-6bs', 'q6sb', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', ''),
('A', 'tab-6bs', 'q6sb2', 'OQ', 'Sample open question?', '', ''),
('B', 'tab-1ao', 'q1o', 'YN', 'his is a yes no question with routing', '', 'Footer text'),
('B', 'tab-2ao', 'q2o', 'OQ', 'Sample open question?', '', ''),
('B', 'tab-3ao', 'q3o', 'OQ', 'Sample open question?', '', ''),
('B', 'tab-4ao', 'q4o', 'OQ', 'Sample open question?', '', ''),
('B', 'tab-5ao', 'q5o', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', ''),
('B', 'tab-5ao', 'q5o2', 'OQ', 'Sample open question?', '', ''),
('B', 'tab-6ao', 'q6o', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', ''),
('B', 'tab-6ao', 'q6o2', 'OQ', 'Sample open question?', '', ''),
('B', 'tab-7ao', 'q7o', 'OQ', 'Sample open question?', '', ''),
('C', 'tab-1st', 'q1ast', 'SL', 'Sample slider question.', '', ''),
('C', 'tab-1st', 'q1bst', 'SL', 'Sample slider question.', '', ''),
('C', 'tab-1st', 'q1cst', 'SL', 'Sample slider question.', '', ''),
('D', 'tab-1rm', 'q1aR', 'OQ', '', '', 'Footer text (the question here is the header (see pageStructure table).');


