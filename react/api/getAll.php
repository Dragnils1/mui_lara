<?php 

require 'core/config.php';
require 'core/db.php';


	$Data = json_decode(file_get_contents("php://input"));

	
	$response = DB::getAll('users');

	if($response)
		echo json_encode($response);
	else
		echo '[]';

	// echo $response;

