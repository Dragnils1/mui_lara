<?php 

require 'core/config.php';
require 'core/db.php';
include 'googleDrive.php';

if(isset($_POST))
{

	if($_POST['key'] == 'remove')
	{
		if(DB::setData(delete, "users" . where . $_POST['id']))
			echo 'ok';
		else
			echo 'fail';
	}
	else
	{
		if($_POST['key'] == 'vip') {
			$id = $_POST['id'];
			$params = "vip = '" . $_POST['status'] . "'";
			$sql = "users WHERE id = " . $id;
			foreach (explode(",", DB::getRow($sql)['images']) as $value) {
				if ($value) {
					uploadFileToFolder($value, '../upload/' . $value);
				}
			}
		}
		else if($_POST['key'] == 'defer')
			$params = "defer = '" . $_POST['status'] . "'";	
		else	
			$params = "status = '" . $_POST['status'] . "'";

		$sql = 'users SET ' .  $params . where . $_POST['id'];


		// echo insert . $sql;

		if(DB::setData(update, $sql))
			echo 'ok';
		else
			echo '[]';
	}

		
	

}


?>