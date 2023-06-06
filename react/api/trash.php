<?php 

require 'core/config.php';
require 'core/db.php';

if(isset($_POST))
{
	$sql = "users WHERE status = '32'";
	$response = DB::getAll($sql);

	if($response)
		echo json_encode($response);
	else
		echo '[]';

	// echo $response;

}


?>