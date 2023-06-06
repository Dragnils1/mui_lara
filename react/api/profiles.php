<?php

require 'core/config.php';
require 'core/db.php';

if(isset($_POST))
{
	$sql = "users WHERE status = 29 ORDER BY vip DESC";
	$response = DB::getAll($sql);

	if($response)
		echo json_encode($response);
	else
		echo '[]';

	// echo $response;

}


?>
