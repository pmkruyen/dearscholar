<?php
// Copyright (c) 2020 P.M. Kruyen, Institute for Management Research, Radboud University, the Netherlands. 

// Sample code to set up a study. Consult the README file and the MySQL setup file for further explanations. 

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

    
// project set up
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

// populate the respondent table
for ($x=0; $x < count($unames); $x++) {
    $con->prepare("INSERT INTO authentication (uname, pwd, project, setup, q0_startdate, q0_occasions, q0_intervaltype, q0_interval) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $unames[$x], $pwdshash[$x], $project, $setup, $q0_startdate, $q0_occasions, $q0_intervaltype, $q0_interval);
    $stmt->execute();
}

// sample settings for the other tables will follow.

?>