<?php

require '../core/config.php';
require '../core/db.php';

if(isset($_POST['fav']))
{
	$response = DB::getAll("users WHERE id IN (" . $_POST['fav'] . ")");
	// var_dump("users WHERE id IN (" . $_POST['fav'] . ")") ;

	echo $response ? json_encode($response) : 'fail';
	
}


?>
