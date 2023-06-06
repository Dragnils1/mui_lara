<?php 

require 'core/config.php';
require 'core/db.php';



if(isset($_POST))
{
	$Data = $_POST['user_id'];

	function convertDate($date)
	{
		echo implode('.', array_reverse(explode(".", $date)));
	}

	
	$response = DB::getAll('users' . where . $Data);


	// echo convertDate($response['birthday']);

	// print_r($response);

	if($response)
		echo json_encode ($response);
	else
		echo '[]';

}


?>