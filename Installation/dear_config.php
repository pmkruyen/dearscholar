<?php
// Form to register new project for dearscholar.dat
// Created by Michael and Daniel Polman, 06.10.2022

// ----------- PLEASE NOTE --------------------
// dearscholar.dat must have mode 666: RW RW RW
// Use: chmod 666 dearscholar.dat
// --------------------------------------------
$version = "1.1";
$file_name = './dearscholar.dat';

echo "<div style='margin:15px;'>\n";

echo "<h2>Maintenance Dear Scholar projects</h2>\n";
echo "<h3>Version: ".$version."</h3>\n";

// ------------------------------------ 
// STEP 1: CHECK FOR PASSWORD
// ------------------------------------ 

if ($_POST['code'] <> "YOURPASSWORD") { //add simple password to prevent too many random uploads

   echo "<form action='#' method='POST'>\n";
   echo "<p>Please enter password: <input name='code' type='password'>\n";
   echo "<input type='submit' value='OK'></p>\n";
   echo "</form>\n";
   echo "</div>\n";
   exit();
}

// ------------------------------------ 
// STEP 2: Read dearscholar.dat as CSV
// ------------------------------------

if (($handle = fopen($file_name, "r")) !== FALSE) {

    // ————— Begin While
    while (($config_data = fgetcsv($handle, 1000, ";")) !== FALSE) {

       $config_regel = $config_data[0].";"; // Prefix
       $config_regel .= $config_data[1].";"; // Title
       $config_regel .= $config_data[2].";"; // Host
       $config_regel .= base64_decode(urldecode($config_data[3])).";"; // Username
       $config_regel .= base64_decode(urldecode($config_data[4])).";"; // Password
       $config_regel .= $config_data[5]; // Debug
       // combine line into an array:
       $config_line[] = $config_regel;

    } // End of while

} // End of IF handle

fclose($handle);

// ------------------------------------
// SHOW CURRENT CONFIGURARATION DATA
// ------------------------------------

   echo "<b>Current configuration lines decrypted:</b><ol>\n";
   foreach ($config_line as $value) {       
       echo "<li>".$value."</li>\n";
   }
   echo "</ol>\n";

// -------------------------------------
// STORE NEW PROJECT FOR DEAR SCHOLAR
// -------------------------------------

if ($_POST['todo'] == "save" && $_POST['prefix'] <> "") {

   $prefix_present = 0;
   foreach ($config_line as $value) {
        if (strtolower(substr($value,0,5)) == strtolower($_POST['prefix']) ) $prefix_present = 1;
   }

   if ($prefix_present == 1) {

      echo "<h3 style='color:#FF0000;'>Prefix already in use!</h3>\n";
      echo "</div>\n";
      exit();

   }

   if ($_POST['title']=="" || $_POST['host']=="" ||$_POST['username']=="" ||$_POST['password']=="") {

      echo "<h3 style='color:#FF0000;'>Not all required fields are entered!</h3>\n";
      echo "</div>\n";
      exit();
   }

   // FOR OVERWRIING DATA
   // $config_data = "";
   // foreach ($config_line as $value) {
   //    $config_data .=  $value."\n";
   // }

   $config_regel  = $_POST['prefix'].";";
   $config_regel .= $_POST['title'].";";
   $config_regel .= $_POST['host'].";";
   $config_regel .= urlencode(base64_encode($_POST['username'])).";";
   $config_regel .= urlencode(base64_encode($_POST['password'])).";";
   $config_regel .= "none\n";
   $config_data = $config_regel;

   //-------- APPEND TO FILENAME
   $fp = fopen($file_name, 'a') or die("  ERROR: Unable to open file!");
   fwrite ($fp, $config_data);
   fclose($fp);
   echo "<br /><b>Appended!</b>";

// -------------------------------------
// REGISTER NEW PROJECT FOR DEAR SCHOLAR
// -------------------------------------

} else if ($_POST['todo'] == "register") {

    echo "<form action='#' method='POST'>\n";
    echo "<table cellpadding=5 cellspacing=0 border=1>\n";
    echo "<tr><td colspan=2>";
    echo "(As prefix exactly 5 characters required)\n";
    echo "</td></tr>\n<tr><td>"; 
    echo "New prefix </td><td><input type='text' name='prefix'>\n";;
    echo "</td></tr>\n<tr><td>";
    echo "Title</td><td><input type='text' name='title'>\n";
    echo "</td></tr>\n<tr><td>"; 
    echo "Host</td><td><input type='text' name='host'>\n";
    echo "</td></tr>\n<tr><td>";
    echo "Username</td><td><input type='text' name='username'>\n";
    echo "</td></tr>\n<tr><td>";
    echo "Password</td><td><input type='text' name='password'>\n";
    echo "</td></tr>\n<tr><td>&nbsp;</td><td>";
    echo "<input type='hidden' name='code' value='".$_POST['code']."'>\n"; 
    echo "<input type='hidden' name='todo' value='save'>\n"; 
    echo "<input type='submit' value='Register'></p>\n";
    echo "</td></tr>\n</table>\n</form>\n";
    echo "</div>\n";
    exit();

}  // EOF if todo

// ------------------------------------
// MENU OPTIONS
// ------------------------------------

echo "<form action='#' method='POST'>\n";
echo "<p><select name='todo'>\n";
echo "<option value='none'>Make your choice</option>\n";
echo "<option value='register'>Register new project</option>\n";
echo "</select>\n";
echo "<input type='hidden' name='code' value='".$_POST['code']."'>\n"; 
echo "<input type='submit' value='OK'></p>\n";
echo "</form>\n";

echo "</div>\n";

// ------------------------------------
// EOF 
// ------------------------------------

?>
