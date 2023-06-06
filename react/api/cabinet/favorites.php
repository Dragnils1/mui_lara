<?php

require '../core/config.php';
require '../core/db.php';

if(isset($_POST['fav']) && isset($_POST['user_id']))
{


		$user_id = $_POST['user_id'];
		$fav = $_POST['fav'];

		$sql = "users SET fav = '$fav' WHERE id = '$user_id'";

		if(DB::setData(update, $sql))
			echo 'ok';
		else
			echo 'fail';
}
?>
