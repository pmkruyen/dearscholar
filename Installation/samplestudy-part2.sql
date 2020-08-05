#// Copyright (c) 2020 P.M. Kruyen, Institute for Management Research, Radboud University, the Netherlands. 

#// Sample code to set up a study (part 2 of 2).
#// Run this code after you completed the steps in 'samplestudy-part1.sql'

#// Consult the README file and the MySQL setup file for further explanations. 

# // Run the code below in MySQL

# Populate the surveyStructure table
INSERT INTO `surveyStructure` (`consent`, `manual`) VALUES
('<div class="block-header"><b>Header</b></div> <div class="block"><p>CONTENT</p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</div>','<div class="block-header"><b>Header</b></div> <div class="block"><p>CONTENT</p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.</div>');

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
INSERT INTO `pageStructure` (`module1`, `classp`, `idp`, `header`, `backbuttontid`, `backbuttontext`, `backbuttononclick`, `backbuttonhref`, `nextbuttonid`, `nextbuttontext`, `nextbuttononclick`, `nextbuttonhref`) VALUES
('A', '\'tab tab-active\'', 'tab-1as', 'Vraag 1 van 9', 'q1s=nee', 'Nee', 'click', '#tab-7as', 'q1s=ja', 'Ja', 'click', '#tab-2as'),
('A', 'tab', 'tab-7as', 'Vraag 2 van 3', 'Terug', 'Terug', '\'\'', '#tab-1as', 'Volgende', 'Volgende', '\'\'', '#tab-7bs'),
('A', 'tab', 'tab-7bs', 'Vraag 3 van 3', 'Terug', 'Terug', '\'\'', '#tab-7as', 'Opslaan', 'Opslaan', 'upload', '#'),
('A', 'tab', 'tab-2as', 'Vraag 2 van 9', 'Terug', 'Terug', '\'\'', '#tab-1as', 'Volgende', 'Volgende', '\'\'', '#tab-2bs'),
('A', 'tab', 'tab-2bs', 'Vraag 3 van 9', 'Terug', 'Terug', '\'\'', '#tab-2as', 'Volgende', 'Volgende', '\'\'', '#tab-2cs'),
('A', 'tab', 'tab-2cs', 'Vraag 4 van 9', 'Terug', 'Terug', '\'\'', '#tab-2bs', 'Volgende', 'Volgende', '\'\'', '#tab-3as'),
('A', 'tab', 'tab-3as', 'Vraag 5 van 9', 'q3s=nee', 'Nee', 'click', '#tab-4bs', 'q3s=ja', 'Ja', 'click', '#tab-4as'),
('A', 'tab', 'tab-4as', 'Vraag 6 van 9', 'Terug', 'Terug', '\'\'', '#tab-3as', 'Volgende', 'Volgende', '\'\'', '#tab-8as'),
('A', 'tab', 'tab-4bs', 'Vraag 6 van 8', 'Terug', 'Terug', '\'\'', '#tab-3as', 'Volgende', 'Volgende', '\'\'', '#tab-5bs'),
('A', 'tab', 'tab-5as', 'Vraag 8 van 9', 'Terug', 'Terug', '\'\'', '#tab-8as', 'Volgende', 'Volgende', '\'\'', '#tab-6as'),
('A', 'tab', 'tab-5bs', 'Vraag 7 van 8', 'Terug', 'Terug', '\'\'', '#tab-4bs', 'Volgende', 'Volgende', '\'\'', '#tab-6bs'),
('A', 'tab', 'tab-6as', 'Vraag 9 van 9', 'Terug', 'Terug', '\'\'', '#tab-5as', 'Opslaan', 'Opslaan', 'upload', '#'),
('A', 'tab', 'tab-6bs', 'Vraag 8 van 8', 'Terug', 'Terug', '\'\'', '#tab-5bs', 'Opslaan', 'Opslaan', 'upload', '#'),
('A', 'tab', 'tab-8as', 'Vraag 7 van 9', 'Terug', 'Terug', '\'\'', '#tab-4as', 'Volgende', 'Volgende', '\'\'', '#tab-5as'),
('B', '\'tab tab-active\'', 'tab-1ao', 'Vraag 1 van 6', 'q1o=nee', 'Nee', 'click', '#tab-7ao', 'q1o=ja', 'Ja', 'click', '#tab-2ao'),
('B', 'tab', 'tab-2ao', 'Vraag 2 van 6', 'Terug', 'Terug', '\"', '#tab-1ao', 'Volgende', 'Volgende', '\'\'', '#tab-3ao'),
('B', 'tab', 'tab-3ao', 'Vraag 3 van 6', 'Terug', 'Terug', '\"', '#tab-2ao', 'Volgende', 'Volgende', '\'\'', '#tab-4ao'),
('B', 'tab', 'tab-4ao', 'Vraag 4 van 6', 'Terug', 'Terug', '\"', '#tab-3ao', 'Volgende', 'Volgende', '\'\'', '#tab-5ao'),
('B', 'tab', 'tab-5ao', 'Vraag 5 van 6', 'Terug', 'Terug', '\"', '#tab-4ao', 'Volgende', 'Volgende', '\'\'', '#tab-6ao'),
('B', 'tab', 'tab-6ao', 'Vraag 6 van 6', 'Terug', 'Terug', '\"', '#tab-5ao', 'Opslaan', 'Opslaan', 'upload', '#'),
('B', 'tab', 'tab-7ao', 'Vraag 2 van 2', 'Terug', 'Terug', '\"', '#tab-1ao', 'Opslaan', 'Opslaan', 'upload', '#'),
('C', '\'tab tab-active\'', 'tab-1st', '<b>Terugkijkende op de afgelopen week...</b>', 'Terug', 'Terug', '\'\'', '/survey/', 'Opslaan', 'Opslaan', 'upload', '#'),
('D', '\'tab tab-active\'', 'tab-1rm', '<b>Wilt u ons iets meegeven dat van belang is in het kader van ons onderzoek, dan kunt u dit hier kwijt.</b>', 'Terug', 'Terug', '\"', '/survey/', 'Opslaan', 'Opslaan', 'upload', '#'),
('E', '\'tab tab-active\'', 'tab-1as', 'Vraag 1 van 9', 'q1sA=nee', 'Nee', 'click', '#tab-7as', 'q1sA=ja', 'Ja', 'click', '#tab-2as'),
('E', 'tab', 'tab-7as', 'Vraag 2 van 3', 'Terug', 'Terug', '\'\'', '#tab-1as', 'Volgende', 'Volgende', '\'\'', '#tab-7bs'),
('E', 'tab', 'tab-7bs', 'Vraag 3 van 3', 'Terug', 'Terug', '\'\'', '#tab-7as', 'Opslaan', 'Opslaan', 'upload', '#'),
('E', 'tab', 'tab-2as', 'Vraag 2 van 9', 'Terug', 'Terug', '\'\'', '#tab-1as', 'Volgende', 'Volgende', '\'\'', '#tab-2bs'),
('E', 'tab', 'tab-2bs', 'Vraag 3 van 9', 'Terug', 'Terug', '\'\'', '#tab-2as', 'Volgende', 'Volgende', '\'\'', '#tab-2cs'),
('E', 'tab', 'tab-2cs', 'Vraag 4 van 9', 'Terug', 'Terug', '\'\'', '#tab-2bs', 'Volgende', 'Volgende', '\'\'', '#tab-3as'),
('E', 'tab', 'tab-3as', 'Vraag 5 van 9', 'q3sA=nee', 'Nee', 'click', '#tab-4bs', 'q3sA=ja', 'Ja', 'click', '#tab-4as'),
('E', 'tab', 'tab-4as', 'Vraag 6 van 9', 'Terug', 'Terug', '\'\'', '#tab-3as', 'Volgende', 'Volgende', '\'\'', '#tab-8as'),
('E', 'tab', 'tab-4bs', 'Vraag 6 van 8', 'Terug', 'Terug', '\'\'', '#tab-3as', 'Volgende', 'Volgende', '\'\'', '#tab-5bs'),
('E', 'tab', 'tab-5as', 'Vraag 8 van 9', 'Terug', 'Terug', '\'\'', '#tab-8as', 'Volgende', 'Volgende', '\'\'', '#tab-6as'),
('E', 'tab', 'tab-5bs', 'Vraag 7 van 8', 'Terug', 'Terug', '\'\'', '#tab-4bs', 'Volgende', 'Volgende', '\'\'', '#tab-6bs'),
('E', 'tab', 'tab-6as', 'Vraag 9 van 9', 'Terug', 'Terug', '\'\'', '#tab-5as', 'Opslaan', 'Opslaan', 'upload', '#'),
('E', 'tab', 'tab-6bs', 'Vraag 8 van 8', 'Terug', 'Terug', '\'\'', '#tab-5bs', 'Opslaan', 'Opslaan', 'upload', '#'),
('E', 'tab', 'tab-8as', 'Vraag 7 van 9', 'Terug', 'Terug', '\'\'', '#tab-4as', 'Volgende', 'Volgende', '\'\'', '#tab-5as'),
('F', '\'tab tab-active\'', 'tab-1ao', 'Vraag 1 van 6', 'q1oA=nee', 'Nee', 'click', '#tab-7ao', 'q1oA=ja', 'Ja', 'click', '#tab-2ao'),
('F', 'tab', 'tab-2ao', 'Vraag 2 van 6', 'Terug', 'Terug', '\"', '#tab-1ao', 'Volgende', 'Volgende', '\'\'', '#tab-3ao'),
('F', 'tab', 'tab-3ao', 'Vraag 3 van 6', 'Terug', 'Terug', '\"', '#tab-2ao', 'Volgende', 'Volgende', '\'\'', '#tab-4ao'),
('F', 'tab', 'tab-4ao', 'Vraag 4 van 6', 'Terug', 'Terug', '\"', '#tab-3ao', 'Volgende', 'Volgende', '\'\'', '#tab-5ao'),
('F', 'tab', 'tab-5ao', 'Vraag 5 van 6', 'Terug', 'Terug', '\"', '#tab-4ao', 'Volgende', 'Volgende', '\'\'', '#tab-6ao'),
('F', 'tab', 'tab-6ao', 'Vraag 6 van 6', 'Terug', 'Terug', '\"', '#tab-5ao', 'Opslaan', 'Opslaan', 'upload', '#'),
('F', 'tab', 'tab-7ao', 'Vraag 2 van 2', 'Terug', 'Terug', '\"', '#tab-1ao', 'Opslaan', 'Opslaan', 'upload', '#'),
('G', '\'tab tab-active\'', 'tab-1rm', '<b>Wilt u ons iets meegeven dat van belang is in het kader van ons onderzoek, dan kunt u dit hier kwijt.</b>', 'Terug', 'Terug', '\"', '/surveyadhoc/', 'Opslaan', 'Opslaan', 'upload', '#');

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
('D', 'tab-1rm', 'q1aR', 'OQ', '', '', 'Footer text (the question here is the header (see pageStructure table).'),
('E', 'tab-1as', 'q1sA', 'YN', 'This is a yes no question with routing', '', 'Footer text'),
('E', 'tab-7as', 'q7saA', 'OQ', 'Sample open question?', '', ''),
('E', 'tab-7bs', 'q7sbA', 'OQ', 'Sample open question?', '', ''),
('E', 'tab-2as', 'q2saA', 'OQ', 'Sample open question?', '', ''),
('E', 'tab-2bs', 'q2sbA', 'OQ', 'Sample open question?', '', ''),
('E', 'tab-2cs', 'q2scA', 'OQ', 'Sample open question?', '', ''),
('E', 'tab-3as', 'q3sA', 'YN', 'This is a yes no question with routing?', '', ''),
('E', 'tab-4as', 'q4saA', 'OQ', 'Sample open question?', '', 'Footer text'),
('E', 'tab-4bs', 'q4sbA', 'OQ', 'Sample open question?', '', ''),
('E', 'tab-5as', 'q5saA', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', ''),
('E', 'tab-5as', 'q5sa2A', 'OQ', 'Sample open question?', '', ''),
('E', 'tab-6as', 'q6saA', 'MC', 'Hoe waarschijnlijk acht u het dat het idee ooit wordt gerealiseerd?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', ''),
('E', 'tab-6as', 'q6sa2A', 'OQ', 'Sample open question?', '', ''),
('E', 'tab-8as', 'q8saA', 'OQ', 'Sample open question?', '', ''),
('E', 'tab-5bs', 'q5sbA', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', ''),
('E', 'tab-5bs', 'q5sb2A', 'OQ', 'Sample open question?', '', ''),
('E', 'tab-6bs', 'q6sbA', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', ''),
('E', 'tab-6bs', 'q6sb2A', 'OQ', 'Sample open question?', '', ''),
('F', 'tab-1ao', 'q1oA', 'YN', 'his is a yes no question with routing', '', 'Footer text'),
('F', 'tab-2ao', 'q2oA', 'OQ', 'Sample open question?', '', ''),
('F', 'tab-3ao', 'q3oA', 'OQ', 'Sample open question?', '', ''),
('F', 'tab-4ao', 'q4oA', 'OQ', 'Sample open question?', '', ''),
('F', 'tab-5ao', 'q5oA', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', ''),
('F', 'tab-5ao', 'q5o2A', 'OQ', 'Sample open question?', '', ''),
('F', 'tab-6ao', 'q6oA', 'MC', 'This is a sample rating scale item (multipe choice item)?', '{\"CD\":\"Completely disagree\", \"D\":\"Disagree\", \"NE\":\"Neutral\",\"AG\":\"Agree\",\"CA\":\"Completely agree\"}', ''),
('F', 'tab-6ao', 'q6o2A', 'OQ', 'Sample open question?', '', ''),
('F', 'tab-7ao', 'q7oA', 'OQ', 'Sample open question?', '', ''),
('G', 'tab-1rm', 'q1aRA', 'OQ', '', '', 'Footer text (the question here is the header (see pageStructure table).');

# Populate the messages table
INSERT INTO `messages` (`uname`, `timestamp`, `message`, `seen`) VALUES
('test1', '2020-07-10 20-10-00', 'Welcome!', '0'),
('test2', '2020-07-10 20-10-00', 'Welcome!', '0'),
('test3', '2020-07-10 20-10-00', 'Welcome!', '0'),
('test4', '2020-07-10 20-10-00', 'Welcome!', '0'),
('test5', '2020-07-10 20-10-00', 'Welcome!', '0');

