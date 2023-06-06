<?php

require '../core/config.php';
require '../core/db.php';

if(isset($_POST))
{
    session_start();
    
    $acc = $_SESSION['acc'];
    $id = $acc['id'];
    $gender = $acc['gender'] == 'М' ? 'Ж' : 'М';

	$sql = "users WHERE vip = '1' AND status = 29 AND gender = '$gender' AND id != '$id' ORDER BY birthday DESC";
	$response = DB::getAll($sql);

	if($response)
		echo json_encode($response);
	else
		echo 'fail';
}


?>
