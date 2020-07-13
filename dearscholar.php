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
     $pin=password_hash($pin, PASSWORD_DEFAULT);

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
        $stmt = $con->prepare("SELECT * FROM `pintable` WHERE uname = ?");
        $stmt->bind_param("s", $uname);
        $stmt->execute();

        $results = $stmt->get_result();

        $row = mysqli_fetch_array($results);
        $pinhash = $row['pin'];

        if(password_verify($pin, $pinhash)){
          echo "success";
        }
        else{
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

//////////////////////////////////
//Insert responses
// Create connection
$conn = new mysqli("localhost", $MyUsername, $MyPassword, $project);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if($_POST['module']=='moduleA'||$_POST['module']=='moduleB'||$_POST['module']=='moduleC'||$_POST['module']=='moduleD'){


// prepare the variables (based on the column names, excluding the id variable )
if($_POST['module'] == 'moduleA'){
  $sql = 'SHOW COLUMNS FROM responseTableModuleA';
}

if($_POST['module'] == 'moduleB'){
  $sql = 'SHOW COLUMNS FROM responseTableModuleB';
}

if($_POST['module'] == 'moduleC'){
  $sql = 'SHOW COLUMNS FROM responseTableModuleC';
}

if($_POST['module'] == 'moduleD'){
  $sql = 'SHOW COLUMNS FROM responseTableModuleD';
}

$res = $conn->query($sql);

while($row = $res->fetch_assoc()){
    $columns[] = $row['Field'];
}

if (($key = array_search('id', $columns)) !== false) {
    unset($columns[$key]);
}

$variables =  implode(", ",$columns);

// prepare the placeholders and data type variable
$placeholders = array();
$datatype = array();

for ($x = 0; $x <= (count($columns)-1); $x++) {
  array_push($placeholders,'?');
  array_push($datatype,'s');
}

$placeholders =  implode(", ",$placeholders);
$datatype =  implode("",$datatype);

// prepare the connection
if($_POST['module'] == 'moduleA'){
  $stmt = $conn->prepare("INSERT INTO responseTableModuleA ($variables) VALUES ($placeholders)");
}

if($_POST['module'] == 'moduleB'){
  $stmt = $conn->prepare("INSERT INTO responseTableModuleB ($variables) VALUES ($placeholders)");
}

if($_POST['module'] == 'moduleC'){
  $stmt = $conn->prepare("INSERT INTO responseTableModuleC ($variables) VALUES ($placeholders)");
}

if($_POST['module'] == 'moduleD'){
  $stmt = $conn->prepare("INSERT INTO responseTableModuleD ($variables) VALUES ($placeholders)");
}

// prepare the bind parameters
$params[] = $columns;

$params[0] = $datatype;

for ($x = 1; $x <= count($columns); $x++) {
  if(isset($_POST[$columns[$x]])) {$params[$x] = $_POST[$columns[$x]];}
    else {$params[$x] = "NULL";}
}

call_user_func_array(array($stmt,'bind_param'),$params); 

// execute
if ($stmt->execute()) { 
    echo "success";
} else {
   echo "error";
}

}

//////////////////////////////////
?>