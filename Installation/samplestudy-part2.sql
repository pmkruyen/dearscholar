#// Copyright (c) 2020 P.M. Kruyen, Institute for Management Research, Radboud University, the Netherlands.

#// Sample code to set up a study (part 2 of 2).
#// Run this code after you completed the steps in 'samplestudy-part1.sql'

#// Consult the README file and the MySQL setup file for further explanations.

# // Run the code below in MySQL

# Insert below pin code for dummy respondent #test3 in the PIN table for PhPUnit test
INSERT INTO `pintable`(`uname`, `pin`, `code`) VALUES ('test3','UNKNOWN','REVOKE');

# Populate the surveyStructure table
INSERT INTO `surveyStructure` (`consent`, `manual`,`contactname`,`contactemail`) VALUES
('<div class="block-header"><b>Header</b></div> <div class="block"><p>CONTENT</p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</div>','<div class="block-header"><b>Header</b></div> <div class="block"><p>CONTENT</p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.</div>','Leader of the project','projectleader@project.org');

# Populate the moduleStructure table
INSERT INTO `moduleStructure` (`module0`, `name`, `page`, `mandatory`, `image`, `imageleft`, `imagetop`) VALUES
('A', 'Eigen ideeën', 'S', '1', 'icons8-innovation-64.png', '25%', '45%'),
('B', 'Ideeën van anderen', 'S', '1', 'icons8-solve-64.png', '75%', '45%'),
('C', 'Stemming', 'S', '0', 'icons8-survey-64.png', '50%', '30%'),
('D', 'Opmerkingen', 'S', '0', 'icons8-branding-64.png', '50%', '80%'),
('E', 'Eigen ideeën', 'A', '0', 'icons8-innovation-64.png', '25%', '30%'),
('F', 'Ideeën van anderen', 'A', '0', 'icons8-solve-64.png', '50%', '30%'),
('G', 'Opmerkingen', 'A', '0', 'icons8-branding-64.png', '75%', '30%');

# Populate the pageStructure table
INSERT INTO `pageStructure` (`module1`, `classp`, `idp`, `header`, `backbuttonid`, `backbuttontext`, `backbuttononclick`, `backbuttonhref`, `nextbuttonid`, `nextbuttontext`, `nextbuttononclick`, `nextbuttonhref`) VALUES
('A', '\'tab tab-active\'', 'tab-1as', 'Question 1 of 9', 'q1s=nee', 'No', 'click', '#tab-7as', 'q1s=ja', 'Yes', 'click', '#tab-2as'),
('A', 'tab', 'tab-7as', 'Question 2 of 3', 'Terug', 'Back', '\'\'', '#tab-1as', 'Volgende', 'Next', '\'\'', '#tab-7bs'),
('A', 'tab', 'tab-7bs', 'Question 3 of 3', 'Terug', 'Back', '\'\'', '#tab-7as', 'Opslaan', 'Save', 'upload', '#'),
('A', 'tab', 'tab-2as', 'Question 2 of 9', 'Terug', 'Back', '\'\'', '#tab-1as', 'Volgende', 'Next', '\'\'', '#tab-2bs'),
('A', 'tab', 'tab-2bs', 'Question 3 of 9', 'Terug', 'Back', '\'\'', '#tab-2as', 'Volgende', 'Next', '\'\'', '#tab-2cs'),
('A', 'tab', 'tab-2cs', 'Question 4 of 9', 'Terug', 'Back', '\'\'', '#tab-2bs', 'Volgende', 'Next', '\'\'', '#tab-3as'),
('A', 'tab', 'tab-3as', 'Question 5 of 9', 'q3s=nee', 'No', 'click', '#tab-4bs', 'q3s=ja', 'Yes', 'click', '#tab-4as'),
('A', 'tab', 'tab-4as', 'Question 6 of 9', 'Terug', 'Back', '\'\'', '#tab-3as', 'Volgende', 'Next', '\'\'', '#tab-8as'),
('A', 'tab', 'tab-4bs', 'Question 6 of 8', 'Terug', 'Back', '\'\'', '#tab-3as', 'Volgende', 'Next', '\'\'', '#tab-5bs'),
('A', 'tab', 'tab-5as', 'Question 8 of 9', 'Terug', 'Back', '\'\'', '#tab-8as', 'Volgende', 'Next', '\'\'', '#tab-6as'),
('A', 'tab', 'tab-5bs', 'Question 7 of 8', 'Terug', 'Back', '\'\'', '#tab-4bs', 'Volgende', 'Next', '\'\'', '#tab-6bs'),
('A', 'tab', 'tab-6as', 'Question 9 of 9', 'Terug', 'Back', '\'\'', '#tab-5as', 'Opslaan', 'Save', 'upload', '#'),
('A', 'tab', 'tab-6bs', 'Question 8 of 8', 'Terug', 'Back', '\'\'', '#tab-5bs', 'Opslaan', 'Save', 'upload', '#'),
('A', 'tab', 'tab-8as', 'Question 7 of 9', 'Terug', 'Back', '\'\'', '#tab-4as', 'Volgende', 'Next', '\'\'', '#tab-5as'),
('B', '\'tab tab-active\'', 'tab-1ao', 'Question 1 of 6', 'q1o=nee', 'No', 'click', '#tab-7ao', 'q1o=ja', 'Yes', 'click', '#tab-2ao'),
('B', 'tab', 'tab-2ao', 'Question 2 of 6', 'Terug', 'Back', '\"', '#tab-1ao', 'Volgende', 'Next', '\'\'', '#tab-3ao'),
('B', 'tab', 'tab-3ao', 'Question 3 of 6', 'Terug', 'Back', '\"', '#tab-2ao', 'Volgende', 'Next', '\'\'', '#tab-4ao'),
('B', 'tab', 'tab-4ao', 'Question 4 of 6', 'Terug', 'Back', '\"', '#tab-3ao', 'Volgende', 'Next', '\'\'', '#tab-5ao'),
('B', 'tab', 'tab-5ao', 'Question 5 of 6', 'Terug', 'Back', '\"', '#tab-4ao', 'Volgende', 'Next', '\'\'', '#tab-6ao'),
('B', 'tab', 'tab-6ao', 'Question 6 of 6', 'Terug', 'Back', '\"', '#tab-5ao', 'Opslaan', 'Save', 'upload', '#'),
('B', 'tab', 'tab-7ao', 'Question 2 of 2', 'Terug', 'Back', '\"', '#tab-1ao', 'Opslaan', 'Save', 'upload', '#'),
('C', '\'tab tab-active\'', 'tab-1st', '<b>Looking back at previous week...</b>', 'Terug', 'Back', '\'\'', '/survey/', 'Opslaan', 'Save', 'upload', '#'),
('D', '\'tab tab-active\'', 'tab-1rm', '<b>If you have additional feedback, you can insert your comments here.</b>', 'Terug', 'Back', '\"', '/survey/', 'Opslaan', 'Save', 'upload', '#'),
('E', '\'tab tab-active\'', 'tab-1as', 'Vraag 1 van 9', 'q1sA=nee', 'No', 'click', '#tab-7as', 'q1sA=ja', 'Yes', 'click', '#tab-2as'),
('E', 'tab', 'tab-7as', 'Question 2 of 3', 'Terug', 'Back', '\'\'', '#tab-1as', 'Volgende', 'Next', '\'\'', '#tab-7bs'),
('E', 'tab', 'tab-7bs', 'Question 3 of 3', 'Terug', 'Back', '\'\'', '#tab-7as', 'Opslaan', 'Save', 'upload', '#'),
('E', 'tab', 'tab-2as', 'Question 2 of 9', 'Terug', 'Back', '\'\'', '#tab-1as', 'Volgende', 'Next', '\'\'', '#tab-2bs'),
('E', 'tab', 'tab-2bs', 'Question 3 of 9', 'Terug', 'Back', '\'\'', '#tab-2as', 'Volgende', 'Next', '\'\'', '#tab-2cs'),
('E', 'tab', 'tab-2cs', 'Question 4 of 9', 'Terug', 'Back', '\'\'', '#tab-2bs', 'Volgende', 'Next', '\'\'', '#tab-3as'),
('E', 'tab', 'tab-3as', 'Question 5 of 9', 'q3sA=nee', 'No', 'click', '#tab-4bs', 'q3sA=ja', 'Yes', 'click', '#tab-4as'),
('E', 'tab', 'tab-4as', 'Question 6 of 9', 'Terug', 'Back', '\'\'', '#tab-3as', 'Volgende', 'Next', '\'\'', '#tab-8as'),
('E', 'tab', 'tab-4bs', 'Question 6 of 8', 'Terug', 'Back', '\'\'', '#tab-3as', 'Volgende', 'Next', '\'\'', '#tab-5bs'),
('E', 'tab', 'tab-5as', 'Question 8 of 9', 'Terug', 'Back', '\'\'', '#tab-8as', 'Volgende', 'Next', '\'\'', '#tab-6as'),
('E', 'tab', 'tab-5bs', 'Question 7 of 8', 'Terug', 'Back', '\'\'', '#tab-4bs', 'Volgende', 'Next', '\'\'', '#tab-6bs'),
('E', 'tab', 'tab-6as', 'Question 9 of 9', 'Terug', 'Back', '\'\'', '#tab-5as', 'Opslaan', 'Save', 'upload', '#'),
('E', 'tab', 'tab-6bs', 'Question 8 of 8', 'Terug', 'Back', '\'\'', '#tab-5bs', 'Opslaan', 'Save', 'upload', '#'),
('E', 'tab', 'tab-8as', 'Question 7 of 9', 'Terug', 'Back', '\'\'', '#tab-4as', 'Volgende', 'Next', '\'\'', '#tab-5as'),
('F', '\'tab tab-active\'', 'tab-1ao', 'Question 1 of 6', 'q1oA=nee', 'No', 'click', '#tab-7ao', 'q1oA=ja', 'Yes', 'click', '#tab-2ao'),
('F', 'tab', 'tab-2ao', 'Question 2 of 6', 'Terug', 'Back', '\"', '#tab-1ao', 'Volgende', 'Next', '\'\'', '#tab-3ao'),
('F', 'tab', 'tab-3ao', 'Question 3 of 6', 'Terug', 'Back', '\"', '#tab-2ao', 'Volgende', 'Next', '\'\'', '#tab-4ao'),
('F', 'tab', 'tab-4ao', 'Question 4 of 6', 'Terug', 'Back', '\"', '#tab-3ao', 'Volgende', 'Next', '\'\'', '#tab-5ao'),
('F', 'tab', 'tab-5ao', 'Question 5 of 6', 'Terug', 'Back', '\"', '#tab-4ao', 'Volgende', 'Next', '\'\'', '#tab-6ao'),
('F', 'tab', 'tab-6ao', 'Question 6 of 6', 'Terug', 'Back', '\"', '#tab-5ao', 'Opslaan', 'Save', 'upload', '#'),
('F', 'tab', 'tab-7ao', 'Question 2 of 2', 'Terug', 'Back', '\"', '#tab-1ao', 'Opslaan', 'Save', 'upload', '#'),
('G', '\'tab tab-active\'', 'tab-1rm', '<b>If you have additional feedback, you can insert your comments here.</b>', 'Terug', 'Back', '\"', '/surveyadhoc/', 'Opslaan', 'Save', 'upload', '#');

# Populate the questionTable table
INSERT INTO `questionTable` (`module2`, `tab`, `idq`, `type`, `question`, `categories`, `footer`, `mandatory`) VALUES
('A', 'tab-1as', 'q1s', 'YN', 'This is a yes no question with routing', '', 'Footer text', ''),
('A', 'tab-7as', 'q7sa', 'OQ', 'Sample mandatory open question?', '', '','MAN'),
('A', 'tab-7bs', 'q7sb', 'OQ', 'Sample open question?', '', '', ''),
('A', 'tab-2as', 'q2sa', 'OQ', 'Sample open question?', '', '', ''),
('A', 'tab-2bs', 'q2sb', 'OQ', 'Sample open question?', '', '', ''),
('A', 'tab-2cs', 'q2sc', 'OQ', 'Sample open question?', '', '', ''),
('A', 'tab-3as', 'q3s', 'YN', 'This is a yes no question with routing?', '', '', ''),
('A', 'tab-4as', 'q4sa', 'OQ', 'Sample open question?', '', 'Footer text', ''),
('A', 'tab-4bs', 'q4sb', 'OQ', 'Sample open question?', '', '', ''),
('A', 'tab-5as', 'q5sa', 'MC', 'This is a sample mandatory rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', '', 'MAN'),
('A', 'tab-5as', 'q5sa2', 'OQ', 'Sample open question?', '', '', ''),
('A', 'tab-6as', 'q6sa', 'MC', 'Hoe waarschijnlijk acht u het dat het idee ooit wordt gerealiseerd?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', '', ''),
('A', 'tab-6as', 'q6sa2', 'OQ', 'Sample open question?', '', '', ''),
('A', 'tab-8as', 'q8sa', 'OQ', 'Sample open question?', '', '', ''),
('A', 'tab-5bs', 'q5sb', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', '', ''),
('A', 'tab-5bs', 'q5sb2', 'OQ', 'Sample open question?', '', '', ''),
('A', 'tab-6bs', 'q6sb', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', '', ''),
('A', 'tab-6bs', 'q6sb2', 'OQ', 'Sample open question?', '', '', ''),
('B', 'tab-1ao', 'q1o', 'YN', 'his is a yes no question with routing', '', 'Footer text', ''),
('B', 'tab-2ao', 'q2o', 'OQ', 'Sample open question?', '', '', ''),
('B', 'tab-3ao', 'q3o', 'OQ', 'Sample open question?', '', '', ''),
('B', 'tab-4ao', 'q4o', 'OQ', 'Sample open question?', '', '', ''),
('B', 'tab-5ao', 'q5o', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', '', ''),
('B', 'tab-5ao', 'q5o2', 'OQ', 'Sample open question?', '', '', ''),
('B', 'tab-6ao', 'q6o', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', '', ''),
('B', 'tab-6ao', 'q6o2', 'OQ', 'Sample open question?', '', '', ''),
('B', 'tab-7ao', 'q7o', 'OQ', 'Sample open question?', '', '', ''),
('C', 'tab-1st', 'q1ast', 'SL', 'Sample slider question.', '', '', ''),
('C', 'tab-1st', 'q1bst', 'SL', 'Sample slider question.', '', '', ''),
('C', 'tab-1st', 'q1cst', 'SL', 'Sample slider question.', '', '', ''),
('D', 'tab-1rm', 'q1aR', 'OQ', '', '', 'Footer text (the question here is the header (see pageStructure table).', ''),
('E', 'tab-1as', 'q1sA', 'YN', 'This is a yes no question with routing', '', 'Footer text', ''),
('E', 'tab-7as', 'q7saA', 'OQ', 'Sample open question?', '', '', ''),
('E', 'tab-7bs', 'q7sbA', 'OQ', 'Sample open question?', '', '', ''),
('E', 'tab-2as', 'q2saA', 'OQ', 'Sample open question?', '', '', ''),
('E', 'tab-2bs', 'q2sbA', 'OQ', 'Sample open question?', '', '', ''),
('E', 'tab-2cs', 'q2scA', 'OQ', 'Sample open question?', '', '', ''),
('E', 'tab-3as', 'q3sA', 'YN', 'This is a yes no question with routing?', '', '', ''),
('E', 'tab-4as', 'q4saA', 'OQ', 'Sample open question?', '', 'Footer text', ''),
('E', 'tab-4bs', 'q4sbA', 'OQ', 'Sample open question?', '', '', ''),
('E', 'tab-5as', 'q5saA', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', '', ''),
('E', 'tab-5as', 'q5sa2A', 'OQ', 'Sample open question?', '', '', ''),
('E', 'tab-6as', 'q6saA', 'MC', 'Hoe waarschijnlijk acht u het dat het idee ooit wordt gerealiseerd?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', '', ''),
('E', 'tab-6as', 'q6sa2A', 'OQ', 'Sample open question?', '', '', ''),
('E', 'tab-8as', 'q8saA', 'OQ', 'Sample open question?', '', '', ''),
('E', 'tab-5bs', 'q5sbA', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', '', ''),
('E', 'tab-5bs', 'q5sb2A', 'OQ', 'Sample open question?', '', '', ''),
('E', 'tab-6bs', 'q6sbA', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', '', ''),
('E', 'tab-6bs', 'q6sb2A', 'OQ', 'Sample open question?', '', '', ''),
('F', 'tab-1ao', 'q1oA', 'YN', 'his is a yes no question with routing', '', 'Footer text', ''),
('F', 'tab-2ao', 'q2oA', 'OQ', 'Sample open question?', '', '', ''),
('F', 'tab-3ao', 'q3oA', 'OQ', 'Sample open question?', '', '', ''),
('F', 'tab-4ao', 'q4oA', 'OQ', 'Sample open question?', '', '', ''),
('F', 'tab-5ao', 'q5oA', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', '', ''),
('F', 'tab-5ao', 'q5o2A', 'OQ', 'Sample open question?', '', '', ''),
('F', 'tab-6ao', 'q6oA', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', '', ''),
('F', 'tab-6ao', 'q6o2A', 'OQ', 'Sample open question?', '', '', ''),
('F', 'tab-7ao', 'q7oA', 'OQ', 'Sample open question?', '', '', ''),
('G', 'tab-1rm', 'q1aRA', 'OQ', '', '', 'Footer text (the question here is the header (see pageStructure table).', '');

# Populate the messages table
INSERT INTO `messages` (`uname`, `timestamp`, `message`, `seen`) VALUES
('test1', '2020-07-10 20-10-00', 'Welcome!', '0'),
('test2', '2020-07-10 20-10-00', 'Welcome!', '0'),
('test3', '2020-07-10 20-10-00', 'Welcome!', '0'),
('test4', '2020-07-10 20-10-00', 'Welcome!', '0'),
('test5', '2020-07-10 20-10-00', 'Welcome!', '0');

