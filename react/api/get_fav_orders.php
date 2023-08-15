<?php

require 'core/config.php';
require 'core/db.php';

// if(isset($_POST['data']))
// {

// 		$Data = json_decode($_POST['data']);

// 		$user_id = $Data->id;
// 		$fav = $Data->fav;

		$sql = "users WHERE fav_date != '' AND status >= -1";


		$response = DB::getAll($sql);

		echo $response ? json_encode($response) : '[]';




// }


?>
