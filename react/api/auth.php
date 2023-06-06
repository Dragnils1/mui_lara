<?php
session_start();

require 'core/config.php';
require 'core/db.php';

if(isset($_POST)){

	// print_r($_SESSION['acc']);

	if (isset($_SESSION['acc']['id'])) {
		$sql = "users WHERE id = '" . $_SESSION['acc']['id'] . "'";
		$result = DB::getRow($sql);
		// print_r($result);
	}
	

	$role = $_SESSION['acc']['role'];

	$result['role'] = $role;
	$_SESSION['acc'] = $result;
	echo json_encode([$_SESSION['acc']]);
}

?>
