<?php
// Copyright (c) 2020 P.M. Kruyen, Institute for Management Research, Radboud University, the Netherlands. 

// Dearscholar php code. Consult the README file and the MySQL setup file for further explanations. 

  	// prepare the connection
    $MyUsername = 'admin';
    $MyPassword = '###########'; // use the MySQL admin password that was generated at first run of the Docker container.
    $MyDatabase = 'project';

    // open the connection and prepare
    $con = mysqli_connect("localhost", $MyUsername, $MyPassword, $MyDatabase) or die ("could not connect database");


echo "<b>Hello DearScholar researcher</b>";
echo "<br>";
echo "<br>";
echo "Here we have your preliminary testing results...";
echo "<br>";
echo "<br>";
echo "<b>1. Unique question IDs?</b>";
echo "<br>";
echo "You first and above all need to ensure that all questions have an unique ID (idq).";
echo "<br>";
echo "<br>";

	# Test if all questions have an unique ID (idq), which is required.
	$sql = "SELECT idq, count(*) AS freq FROM `questionTable` GROUP BY idq HAVING freq > 1";
	$resultset = mysqli_query($con,$sql);
	$num_rows_idq = mysqli_num_rows($resultset); 

	if($num_rows_idq==0){
		echo("<b>Test result</b>: Super. You only have unique question IDs.");
	}

	if($num_rows_idq>0){
		echo("<b>Test result</b>: I'm sorry, you have duplicated question IDs. Please set unique question IDs before continuing the testing procedure.");
		echo "<br>";
		echo "<br>";
		echo "<table border='1'>
		<tr>
		<th>duplicated idq</th>
		<th>frequency</th>
		</tr>";

		while($row = mysqli_fetch_assoc($resultset))
		{
   			echo "<tr>";
			echo "<td>" . $row['idq'] . "</td>";
			echo "<td>" . $row['freq'] . "</td>";
			echo "</tr>";
		};
		echo "</table>";
	};

# Only continue the testing procedure if all questions ids (idqs) are unique.
if($num_rows_idq==0){

echo "<br>";
echo "<br>";
echo "<b>2. Unique survey page IDs?</b>";
echo "<br>";
echo "<br>";

	# Test if all survey pages have an unique ID (idp), which is wise.
	$sql = "SELECT idp, count(*) AS freq FROM `pageStructure` GROUP BY idp HAVING freq > 1";
	$resultset = mysqli_query($con,$sql);
	$num_rows_idq = mysqli_num_rows($resultset); 

	if($num_rows_idq==0){
		echo("<b>Test result</b>: Super. You only have unique survey page IDs (idp).");
	}

	if($num_rows_idq>0){
		echo("<b>Test result</b>: Warning: you have duplicated survey page IDs (idp). Check 1) you did this on purpose; 2) you have used uniqe survey page IDs within a single module.");
		echo "<br>";
		echo "<br>";
		echo "<table border='1'>
		<tr>
		<th>duplicated idp</th>
		<th>frequency</th>
		</tr>";

		while($row = mysqli_fetch_assoc($resultset))
		{
   			echo "<tr>";
			echo "<td>" . $row['idp'] . "</td>";
			echo "<td>" . $row['freq'] . "</td>";
			echo "</tr>";
		};
		echo "</table>";
	};

echo "<br>";
echo "<br>";
echo "<b>3. Inspect if each survey page has a valid module ID (module1).</b>";
echo "<br>";
echo "<br>";

	# Test if each survey page has a valid module ID
	$sql = "SELECT module1, COUNT(*) AS freq FROM pageStructure GROUP BY module1";
	$resultset = mysqli_query($con,$sql);

		echo "<table border='1'>
		<tr>
		<th>module id</th>
		<th>number of survey pages</th>
		</tr>";

		while($row = mysqli_fetch_assoc($resultset))
		{
			$moduleIDs[] = $row['module1'];
   			echo "<tr>";
			echo "<td>" . $row['module1'] . "</td>";
			echo "<td>" . $row['freq'] . "</td>";
			echo "</tr>";
		};
		echo "</table>";
	
		echo "<br>";
		echo "<br>";
		echo "<b>4. Test if each module has one (1), and only one 'tab tab-active' (that is, first survey page) or else just 'tab' (clasp).</b>";
		echo "<br>";
	
		# Test if each module has one, and only one 'tab tab-active' (that is, first survey page)
		for ($i = 0; $i < count($moduleIDs); $i++){	
			echo "<br>";
			echo "For module $moduleIDs[$i]:";	
			echo "<br>";
			echo "<br>";
			
			$sql = "SELECT classp, COUNT(*) AS freq FROM pageStructure WHERE module1='$moduleIDs[$i]' GROUP BY classp";
			$resultset = mysqli_query($con,$sql);
		
			echo "<table border='1'>
			<tr>
			<th>module id</th>
			<th>number of survey pages</th>
			</tr>";

			while($row = mysqli_fetch_assoc($resultset))
			{
   				echo "<tr>";
				echo "<td>" . $row['classp'] . "</td>";
				echo "<td>" . $row['freq'] . "</td>";
				echo "</tr>";
			};
			echo "</table>";
	}

	# Test if all the backbuttonhref and nextbuttonhref on a survey page link to a valid other survey page 
	$sql = "SELECT idp, backbuttonhref, nextbuttonhref, nextbuttononclick FROM pageStructure";
	$resultset = mysqli_query($con,$sql);

		while($row = mysqli_fetch_assoc($resultset))
		{
			$idps[] = $row['idp'];
			$back[] = $row['backbuttonhref'];
			$next[] = $row['nextbuttonhref'];
			$click[] = $row['nextbuttononclick'];
		};

	echo "<br>";
	echo "<br>";
	echo "<b>5. Test if each survey page (idp) links back to a valid other survey page.</b>";
	echo "<br>";
	echo "<br>";

		echo "<table border='1'>
			<tr>
			<th>idp</th>
			<th>backbuttonhref</th>
			<th>valid?</th>
			</tr>";

		for ($i = 0; $i < count($idps); $i++){	
			$backIdp = explode("#", $back[$i]);

			if(count($backIdp)>0){
				$backIdp = $backIdp[1];
			};

			if(count(array_intersect($idps,array($backIdp)))>1){
				echo "<tr>";
				echo "<td>" . $idps[$i] . "</td>";
				echo "<td>" . $backIdp . "</td>";
				echo "<td>" . "valid tab" . "</td>";
				echo "</tr>";
			} elseif($back[$i]=="/survey/") {
				echo "<tr>";
				echo "<td>" . $idps[$i] . "</td>";
				echo "<td>" . $back[$i] . "</td>";
				echo "<td>" . "valid back to /survey/" . "</td>";
				echo "</tr>";
			} elseif($back[$i]=="/surveyadhoc/") {
				echo "<tr>";
				echo "<td>" . $idps[$i] . "</td>";
				echo "<td>" . $back[$i] . "</td>";
				echo "<td>" . "valid back to /surveyadhoc/" . "</td>";
				echo "</tr>";
			} else {
				echo "<tr>";
				echo "<td>" . $idps[$i] . "</td>";
				echo "<td>" . $back[$i] . "</td>";
				echo "<td>" . "invalid link" . "</td>";
				echo "</tr>";
			};
		}
		echo "</table>";

	echo "<br>";
	echo "<br>";
	echo "<b>6. Test if each survey page (idp) links forward to a valid other survey page.</b>";
	echo "<br>";
	echo "<br>";

		echo "<table border='1'>
			<tr>
			<th>idp</th>
			<th>backbuttonhref</th>
			<th>valid?</th>
			</tr>";

		for ($i = 0; $i < count($idps); $i++){	
			$nextIdp = explode("#", $next[$i]);

			if(count($nextIdp)>0){
				$nextIdp = $nextIdp[1];
			};

			if(count(array_intersect($idps,array($nextIdp)))>1){
				echo "<tr>";
				echo "<td>" . $idps[$i] . "</td>";
				echo "<td>" . $nextIdp . "</td>";
				echo "<td>" . "valid tab" . "</td>";
				echo "</tr>";
			} elseif($next[$i]=="#") {
				if ($click[$i]=="upload"){
					echo "<tr>";
					echo "<td>" . $idps[$i] . "</td>";
					echo "<td>" . $next[$i] . "</td>";
					echo "<td>" . "valid nextbuttononclick (upload)" . "</td>";
					echo "</tr>";
				}
				else{
					echo "<tr>";
					echo "<td>" . $idps[$i] . "</td>";
					echo "<td>" . $next[$i] . "</td>";
					echo "<td>" . "invalid nextbuttononclick (upload)" . "</td>";
					echo "</tr>";
				}
			} else {
				echo "<tr>";
				echo "<td>" . $idps[$i] . "</td>";
				echo "<td>" . $next[$i] . "</td>";
				echo "<td>" . "invalid link" . "</td>";
				echo "</tr>";
			};
		}
		echo "</table>";

echo "<br>";
echo "<br>";
echo "<b>7. Inspect if only valid question types are being used (type: MC, OQ, SL, YN).</b>";
echo "<br>";
echo "<br>";

	# Test if only valid question types are being used 
	$sql = "SELECT type, COUNT(*) AS freq FROM questionTable GROUP BY type";
	$resultset = mysqli_query($con,$sql);

		echo "<table border='1'>
		<tr>
		<th>question type</th>
		<th>number of survey questions</th>
		</tr>";

		while($row = mysqli_fetch_assoc($resultset))
		{
   			echo "<tr>";
			echo "<td>" . $row['type'] . "</td>";
			echo "<td>" . $row['freq'] . "</td>";
			echo "</tr>";
		};
		echo "</table>";

echo "<br>";
echo "<br>";
echo "<b>8. Inspect the number of questions per survey page (tab).</b>";
echo "<br>";
echo "But please consider possible duplicated survey page IDs (idp).";
echo "<br>";
echo "<br>";

	# Show the number of questions per question page (tab)
	$sql = "SELECT tab, COUNT(*) AS freq FROM questionTable GROUP BY tab";
	$resultset = mysqli_query($con,$sql);

		echo "<table border='1'>
		<tr>
		<th>idp</th>
		<th>number of survey questions</th>
		</tr>";

		while($row = mysqli_fetch_assoc($resultset))
		{
   			echo "<tr>";
			echo "<td>" . $row['tab'] . "</td>";
			echo "<td>" . $row['freq'] . "</td>";
			echo "</tr>";
		};
		echo "</table>";

echo "<br>";
echo "<br>";
echo "<b>9. Inspect the number of questions per survey page (tab).</b>";
echo "<br>";
echo "<br>";

	# Show the number of questions per module
	$sql = "SELECT module2, COUNT(*) AS freq FROM questionTable GROUP BY module2";
	$resultset = mysqli_query($con,$sql);

		echo "<table border='1'>
		<tr>
		<th>module</th>
		<th>number of survey questions</th>
		</tr>";

		while($row = mysqli_fetch_assoc($resultset))
		{
   			echo "<tr>";
			echo "<td>" . $row['module2'] . "</td>";
			echo "<td>" . $row['freq'] . "</td>";
			echo "</tr>";
		};
		echo "</table>";

echo "<br>";
echo "<br>";
echo "<b>10. Test if a page with (YES/NO) question has valid 'save buttons' on the surveypage.</b>";
echo "<br>";
echo "<br>";

	# Test if a page with (YES/NO) question has valid 'save buttons' 
	$i=0;

	$sql = "SELECT tab, idq FROM questionTable WHERE type='YN'";
	$resultset = mysqli_query($con,$sql);

		while($row = mysqli_fetch_assoc($resultset))
		{
			$tabs[] = $row['tab'];
			$idqs[] = $row['idq'];
		};

			echo "<table border='1'>
		<tr>
		<th>idq</th>
		<th>backbuttonid</th>
		<th>backbuttononclick</th>
		<th>nextbuttonid</th>
		<th>nextbuttononclick</th>
		</tr>";

		for ($i = 0; $i < count($idps); $i++){	

		$sql = "SELECT backbuttonid, backbuttononclick, nextbuttonid, nextbuttononclick FROM pageStructure WHERE idp='$tabs[$i]'";
		$resultset = mysqli_query($con,$sql);
		
			while($row = mysqli_fetch_assoc($resultset))
			{
   				echo "<tr>";
   				echo "<td>" . $idqs[$i] . "</td>";
				echo "<td>" . $row['backbuttonid'] . "</td>";
				echo "<td>" . $row['backbuttononclick'] . "</td>";
				echo "<td>" . $row['nextbuttonid'] . "</td>";
				echo "<td>" . $row['nextbuttononclick'] . "</td>";
				echo "</tr>";
			};

		}
		
		echo "</table>";

}
echo "<br>";
echo "<br>";
echo "DearScholar - 2020 - (c) Dr. Peter Kruyen, Institute for Management Research, Radboud University.</b>";
?>
