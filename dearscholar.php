<?php
// Copyright (c) 2020 P.M. Kruyen, Institute for Management Research, Radboud University, the Netherlands. 

// Dearscholar php code. Consult the README file and the MySQL setup file for further explanations. 

header("Access-Control-Allow-Origin: *");

$MyUsername = '########';
$MyPassword = '########';
$MyDatabase = 'respondents';

$con = mysqli_connect("localhost", $MyUsername, $MyPassword, $MyDatabase) or die ("could not connect database");

$uname=mysqli_real_escape_string($con,$_POST['uname']);
$pwd=mysqli_real_escape_string($con,$_POST['pwd']);

$stmt = $con->prepare("SELECT * FROM authentication WHERE uname = ?");
$stmt->bind_param("s", $uname);
$stmt->execute();

$results = $stmt->get_result();

$row = mysqli_fetch_array($results);
$pwdhash = $row['pwd'];
$project = $row['project'];

if (password_verify($pwd, $pwdhash)) {

  // Insert PIN 
  if($_POST['insertPIN'] == 'yes'){
     $con = mysqli_connect("localhost", $MyUsername, $MyPassword, $project) or die ("could not connect database");

     $uname=mysqli_real_escape_string($con,$_POST['uname']);
     $pin=mysqli_real_escape_string($con,$_POST['PIN']);

     $q = mysqli_query($con, "SELECT * FROM `pintable` WHERE `uname` = '$uname'");
     $result = mysqli_fetch_assoc($q);
     $num = mysqli_num_rows($q);
     if($num) {
        mysqli_query($con,"UPDATE `pintable` SET `pin` = '$pin', `code` = '0' WHERE `uname` = '".$result['uname']."'");
      } else {
        mysqli_query($con,"INSERT INTO `pintable` (`uname`, `pin`, `code`) VALUES ('$uname', '$pin', '0')");
      }

     if($q){
       echo "success";
      }
      else{
        echo "error";
      }
  }

  // Check PIN
  if($_POST['checkPIN'] == 'yes'){
     $con = mysqli_connect("localhost", $MyUsername, $MyPassword, $project) or die ("could not connect database");

     $uname=mysqli_real_escape_string($con,$_POST['uname']);
     $pin=mysqli_real_escape_string($con,$_POST['PIN']);
  
     $q = mysqli_query($con, "SELECT * FROM `pintable` WHERE `uname` = '$uname' AND `code` = 'REVOKE'");
     $result = mysqli_fetch_assoc($q);
     $num = mysqli_num_rows($q);
     if($num) {
        echo "revoke";      
     } else {
        $q = mysqli_query($con, "SELECT * FROM `pintable` WHERE `uname` = '$uname' AND `pin` = '$pin'");
        $result = mysqli_fetch_assoc($q);
        $num = mysqli_num_rows($q);
        if($num) {
          echo "success";      
        } else {
          echo "error";
        }
    }
  }

  // Save the device token
  if($_POST['updateregistration'] == 'yes'){
      $con = mysqli_connect("localhost", $MyUsername, $MyPassword, $MyDatabase) or die ("could not connect database");

      $uname=mysqli_real_escape_string($con,$_POST['uname']);
      $token=mysqli_real_escape_string($con,$_POST['devicetoken']);

      $q = mysqli_query($con, "SELECT * FROM `registration` WHERE `uname` = '$uname'");
      $result = mysqli_fetch_assoc($q);
      $num = mysqli_num_rows($q);
     
      if($num) {
        mysqli_query($con,"UPDATE `registration` SET `token` = '$token' WHERE `uname` = '".$result['uname']."'");
        } else {
        mysqli_query($con,"INSERT INTO `registration` (`id`, `project`,`uname`, `token`) VALUES (NULL, '$project', '$uname', '$token')");
        }

      if($q){
        echo "success";
        }
        else{
        echo "error";
        }
      
  }

  // Inject the diary structure    
  if(isset($_POST['findvalues'])){
        
      $con = mysqli_connect("localhost", $MyUsername, $MyPassword, $project) or die ("could not connect database");
      mysqli_set_charset($con, 'utf8mb4');
       
      $sql = "SELECT consent, manual, moduleAname, moduleBname, moduleCname, moduleDname FROM surveyStructure";

      $result = $con->query($sql) or die('Err: Table not found: ' . mysql_error());
    
      while($r = mysqli_fetch_assoc($result)){
            $data0[] = array('data' => $r);
      }
    
      $sql = "SELECT * FROM pageStructure";

      $result = $con->query($sql) or die('Err: Table not found: ' . mysql_error());
    
      while($r = mysqli_fetch_assoc($result)){
          $data1[] = array('data' => $r);
      }

      if($data1>0){
          $sql = "SELECT * FROM questionTable";

          $result = $con->query($sql) or die('Err: Table not found: ' . mysql_error());
    
          while($r = mysqli_fetch_assoc($result)){
              $data2[] = array('data' => $r);
          }
        }
    
        $json = array('data0' => $data0,'data1' => $data1,'data2' => $data2);

        echo json_encode($json);    
    }

    // Let the database know the structure has been injected
    if(isset($_POST['injectedStructure'])){
        $con = mysqli_connect("localhost", $MyUsername, $MyPassword, $MyDatabase) or die ("could not connect database");
    
        mysqli_query($con,"UPDATE `authentication` SET `setup` = '1' WHERE `uname` = '$uname'");
    }

      // Download messages and let the server know that the respondent has seen the message (on click)
    if(isset($_POST['messagesCheck'])){
        $con = mysqli_connect("localhost", $MyUsername, $MyPassword, $project) or die ("could not connect database");

        $sql = "SELECT * FROM messages WHERE uname = '" . $_POST['uname'] . "'";

        $result = $con->query($sql) or die('Err: Table not found: ' . mysql_error());
    
        while($r = mysqli_fetch_assoc($result)){
            $messages[] = array('data' => $r);
        }
        echo json_encode($messages);    
        }

    if(isset($_POST['messagesSeen'])){
        $con = mysqli_connect("localhost", $MyUsername, $MyPassword, $project) or die ("could not connect database");

        $id=mysqli_real_escape_string($con,$_POST['id']);
        
        $q=mysqli_query($con,"UPDATE messages SET seen='1' WHERE id='$id'");
    }
}

// Authentication and schedule set up
if(isset($_POST['authentication'])){

  if (password_verify($pwd, $pwdhash)) {
      $con = mysqli_connect("localhost", $MyUsername, $MyPassword, $MyDatabase) or die ("could not connect database");

      $sql = "SELECT `project`, `setup`,`q0_startdate`, `q0_occasions`, `q0_intervaltype`, `q0_interval` FROM authentication WHERE uname = '" . $_POST['uname'] . "'";

      $result = $con->query($sql) or die('Err: Table not found: ' . mysql_error());

          while($r = mysqli_fetch_assoc($result)){
              $data[] = array('data' => $r);
          }

      echo json_encode($data);

  } else {
      echo 'error';
    }

}






?>