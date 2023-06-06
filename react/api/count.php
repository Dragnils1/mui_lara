<?php

require 'core/config.php';
require 'core/db.php';

if(isset($_POST))
{
	if($_POST['count'] == 'lines') {
		$sql = "SELECT COUNT(*) as count FROM `users` WHERE status BETWEEN 1 AND 9";
	} else if ($_POST['count'] == 'line1') {
		$sql = "SELECT COUNT(*) as count FROM `users` WHERE status = 0";
	} else {
		$sql = "SELECT COUNT(*) as count FROM `users` WHERE status >= -1";
	}

	$response = DB::query($sql);

	if($response)
		echo json_encode($response);
	else
		echo '[]';

	// echo $response;

}


?>

