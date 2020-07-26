<?php
// Copyright (c) 2020 P.M. Kruyen, Institute for Management Research, Radboud University, the Netherlands. 

// Sample code to set up a study (part 1 of 2).
// Consult the README file and the MySQL setup file for further explanations. 

// Fetch the usernames and passwords 
    // From a csv file, where the usernames are in the first column, and the passwords in the second column.
    $unames = [];
    $pwds = []

    $location = '########';
 
    $row = 1;
        if (($handle = fopen($location, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $row++;
                    $unames[] = $data[1];
                    $pwds[] = $data[2];
        }
    fclose($handle);
    }

    // Alternatively, for testing, use the following five usernames and passwords 
    //$unames = ["test1","test2","test3","test4","test5"];
    //$pwds = ["test1","test2","test3","test4","test5"];

// populate the respondent table
    
    // project setup
    $project = "project";
    $setup = 0;
    $q0_startdate = "2020-03-01";
    $q0_occasions = 4;
    $q0_intervaltype = "w";
    $q0_interval = 1;

    // hash the passwords
    $pwdshash = [];

    for ($x=0; $x < count($unames); $x++) {
        $pwdshash[] = password_hash($pwds[$x], PASSWORD_DEFAULT);
    }

    // populate the response table
    $MyUsername = '########';
    $MyPassword = '########';
    $MyDatabase = 'respondents';

    // open the connection and prepare
    $con = mysqli_connect("localhost", $MyUsername, $MyPassword, $MyDatabase) or die ("could not connect database");

    // finally, populate the respondent table
    for ($x=0; $x < count($unames); $x++) {
        $con->prepare("INSERT INTO authentication (uname, pwd, project, setup, q0_startdate, q0_occasions, q0_intervaltype, q0_interval) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssss", $unames[$x], $pwdshash[$x], $project, $setup, $q0_startdate, $q0_occasions, $q0_intervaltype, $q0_interval);
        $stmt->execute();
    }

// populate the surveyStructure table

    // survey setup
    $consent = '<div class="block-header"><b>Header</b></div> <div class="block"><p>CONTENT</p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</div>';  
    $manual = '<div class="block-header"><b>Header</b></div> <div class="block"><p>CONTENT</p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.</div>';
    $moduleAname = 'Module A';
    $moduleBname = 'Module B';
    $moduleCname = 'Module C';
    $moduleDname = 'Module D';

    // open the connection
    $con = mysqli_connect("localhost", $MyUsername, $MyPassword, $MyDatabase) or die ("could not connect database");

    // finally, populate the surveyStructure table
    $con->prepare("INSERT INTO surveyStructure (consent, manual, moduleAname, moduleBname, moduleCname, moduleDname) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $consent, $manual, $moduleAname, $moduleBname, $moduleCname, $moduleDname);
    $stmt->execute();

// populate the pageStructure table and questionTable table --> see the samplestudy-part2.sql file
 
   
?>
