<?php
// Copyright (c) 2020 P.M. Kruyen, Institute for Management Research, Radboud University, the Netherlands. 
// Dearscholar php code. Consult the README file and the MySQL setup file for further explanations. 
// Adapted version by Michael Polman and Daniel Polman to enable third party database server for separate surveys.
$version = "1.3";

header("Access-Control-Allow-Origin: *");

// Default config for original database
$MyLocalhost = "localhost";
$MyUsername = 'App';
$MyPassword = 'Password';
$MyDatabase = 'respondents';

// Extract 5 first positions as prefix from remote username
$prefix = strtolower(substr($_POST['uname'],0,5));

// CSV format: 
// "prefix";"title";"host";"username";"password";"debug"

// Read dearscholar.dat as CSV from the path where it is created using dear_config.php
$filename =  './dearscholar.dat';

if (($handle = fopen($filename, "r")) !== FALSE) {

    // ————— Begin While
    while (($surveyprojects = fgetcsv($handle, 1000, ";")) !== FALSE) {

       // When first element equals the prefix, use the appropriate username and password for this title.
       if (strtolower($surveyprojects[0]) == $prefix) {

	$MyLocalhost = $surveyprojects[2];
	$MyUsername  = base64_decode(urldecode($surveyprojects[3]));
	$MyPassword  = base64_decode(urldecode($surveyprojects[4]));
        $MyDebugMode = $surveyprojects[5];

        // When Debug mode set for this prefix, show switch:
        if ($MyDebugMode == "yes" || $_POST['debug'] == "yes") {
                echo "Dearscholar Version ".$version."</b><br /><br />\n";
                echo "Prefix found: <b>".$surveyprojects[0]."</b><br /><br />\n";
                echo "Switching to: <b>".$surveyprojects[1]."</b><br /><br />\n";
                exit("Exit: End of debug mode.");
        }

        // Prefix found hence break from loop
        break;
       }

    }  // ----- End While loop

} else {

  // Error: 
  echo "Survey realm configurations not found: ".$filename;
  exit(" (Exit)");

} // End if handle


// When first element equals the prefix, use the appropriate username and password for this title.

// Continue with original script
$con = mysqli_connect($MyLocalhost, $MyUsername, $MyPassword, $MyDatabase) or die ("could not connect database");

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

     $con = mysqli_connect($MyLocalhost, $MyUsername, $MyPassword, $project) or die ("could not connect database");

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

     $con = mysqli_connect($MyLocalhost, $MyUsername, $MyPassword, $project) or die ("could not connect database");

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

      $con = mysqli_connect($MyLocalhost, $MyUsername, $MyPassword, $MyDatabase) or die ("could not connect database");

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

  // Authentication and schedule set up
  if(isset($_POST['authentication'])){

      $con = mysqli_connect($MyLocalhost, $MyUsername, $MyPassword, $MyDatabase) or die ("could not connect database");

      $sql = "SELECT `project`, `setup`,`q0_startdate`, `q0_occasions`, `q0_intervaltype`, `q0_interval` FROM authentication WHERE uname = '" . $_POST['uname'] . "'";

      $result = $con->query($sql) or die('Err: Table not found: ' . mysql_error());

          while($r = mysqli_fetch_assoc($result)){
              $data[] = array('data' => $r);
          }

      echo json_encode($data);
  }

  // Inject the diary structure    
  if(isset($_POST['findvalues'])){

      $con = mysqli_connect($MyLocalhost, $MyUsername, $MyPassword, $project) or die ("could not connect database");
      mysqli_set_charset($con, 'utf8mb4');
       
      $sql = "SELECT * FROM surveyStructure";

      $result = $con->query($sql) or die('Err: Table not found: ' . mysql_error());
    
      while($r = mysqli_fetch_assoc($result)){
            $data0[] = array('data' => $r);
      }

      $sql = "SELECT * FROM moduleStructure";

      $result = $con->query($sql) or die('Err: Table not found: ' . mysql_error());
    
      while($r = mysqli_fetch_assoc($result)){
          $data3[] = array('data' => $r);
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
    
        $json = array('data0' => $data0,'data1' => $data1,'data2' => $data2, 'data3' => $data3);

        echo json_encode($json);    
    }

    // Let the database know the structure has been injected
    if(isset($_POST['injectedStructure'])){
        $con = mysqli_connect($MyLocalhost, $MyUsername, $MyPassword, $MyDatabase) or die ("could not connect database");
    
        $q = mysqli_query($con,"UPDATE `authentication` SET `setup` = '1' WHERE `uname` = '$uname'");

      if($q){
        echo "success";
        }
        else{
        echo "error";
        }
    }

    // Download messages and let the server know that the respondent has seen the message (on click)
    if(isset($_POST['messagesCheck'])){
        $con = mysqli_connect($MyLocalhost, $MyUsername, $MyPassword, $project) or die ("could not connect database");

        $sql = "SELECT * FROM messages WHERE uname = '" . $_POST['uname'] . "'";

        $result = $con->query($sql) or die('Err: Table not found: ' . mysql_error());
    
        while($r = mysqli_fetch_assoc($result)){
            $messages[] = array('data' => $r);
        }
        echo json_encode($messages);    
        }

    if(isset($_POST['messagesSeen'])){
        $con = mysqli_connect($MyLocalhost, $MyUsername, $MyPassword, $project) or die ("could not connect database");

        $id=mysqli_real_escape_string($con,$_POST['id']);
        
        $q=mysqli_query($con,"UPDATE messages SET seen='1' WHERE id='$id'");
     
      if($q){
        echo "success";
        }
        else{
        echo "error";
        }
    }

    // Post the answers
    if($_POST['module']=='moduleA'||$_POST['module']=='moduleB'||$_POST['module']=='moduleC'||$_POST['module']=='moduleD'||$_POST['module']=='moduleE'||$_POST['module']=='moduleF'||$_POST['module']=='moduleG'){

      $con = new mysqli($MyLocalhost, $MyUsername, $MyPassword, $project) or die ("could not connect database");

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

      if($_POST['module'] == 'moduleE'){
        $sql = 'SHOW COLUMNS FROM responseTableModuleE';
      }

      if($_POST['module'] == 'moduleF'){
        $sql = 'SHOW COLUMNS FROM responseTableModuleF';
      }

      if($_POST['module'] == 'moduleG'){
        $sql = 'SHOW COLUMNS FROM responseTableModuleG';
      }

      $res = $con->query($sql);

      while($row = $res->fetch_assoc()){
        $columns[] = $row['Field'];
      }

      if (($key = array_search('id', $columns)) !== false) {
        unset($columns[$key]);
      }

      $variables =  implode(", ",$columns);

      $placeholders = array();
      $datatype = array();

      for ($x = 0; $x <= (count($columns)-1); $x++) {
        array_push($placeholders,'?');
        array_push($datatype,'s');
      }

      $placeholders =  implode(", ",$placeholders);
      $datatype =  implode("",$datatype);

      if($_POST['module'] == 'moduleA'){
        $stmt = $con->prepare("INSERT INTO responseTableModuleA ($variables) VALUES ($placeholders)");
      }

      if($_POST['module'] == 'moduleB'){
        $stmt = $con->prepare("INSERT INTO responseTableModuleB ($variables) VALUES ($placeholders)");
      }

      if($_POST['module'] == 'moduleC'){
        $stmt = $con->prepare("INSERT INTO responseTableModuleC ($variables) VALUES ($placeholders)");
      }

      if($_POST['module'] == 'moduleD'){
        $stmt = $con->prepare("INSERT INTO responseTableModuleD ($variables) VALUES ($placeholders)");
      }

      if($_POST['module'] == 'moduleE'){
        $stmt = $con->prepare("INSERT INTO responseTableModuleE ($variables) VALUES ($placeholders)");
      }

      if($_POST['module'] == 'moduleF'){
       $stmt = $con->prepare("INSERT INTO responseTableModuleF ($variables) VALUES ($placeholders)");
      }

      if($_POST['module'] == 'moduleG'){
        $stmt = $con->prepare("INSERT INTO responseTableModuleG ($variables) VALUES ($placeholders)");
      }

      $params[] = $columns;

      $params[0] = $datatype;

      for ($x = 1; $x <= count($columns); $x++) {
        if(isset($_POST[$columns[$x]])) {$params[$x] = $_POST[$columns[$x]];}
        else {$params[$x] = "NULL";}
      }

      call_user_func_array(array($stmt,'bind_param'),$params); 

      if ($stmt->execute()) { 
        echo "success";
      } else {
        echo "error";
      }
    }  
  } else {
    echo "error";
  }
?>
