<?php

require 'core/config.php';
require 'core/db.php';
if(isset($_POST["role"]))
{
    if ($_POST["role"] == 'ok_admin'  ) {
        $sql = "users WHERE status = '10' ";
    } elseif ($_POST["role"] == 'ok_mainModer') {
		$sql = "users WHERE status = '0' ";
	} elseif ($_POST["role"] == 'consideration' ) {
		$sql = "users WHERE status = '28' ";
	} elseif ((int) ($_POST["role"]) < 10 && (int) ($_POST["role"]) > 0) {
		$int = $_POST["role"];
		$sql = "users WHERE status = '$int' ";
	}
	
} else {
	$sql = "users WHERE status = '0' ";
}


$response = DB::getAll($sql);

if ($response)
	echo json_encode($response);
else
	echo '[]';
