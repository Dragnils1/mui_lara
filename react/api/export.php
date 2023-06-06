<?php

require  '../vendor/autoload.php';
require 'core/config.php';
require 'core/db.php';

use ParseCsv\Csv;


if (isset($_POST)) {

	$con = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
	// Table Name that you want
	// to export in csv
	$ShowTable = 'users';
	$cok = $_COOKIE['role'];

# Create new parseCSV object.

	if(isset($_POST['val'])) {
		$val = $_POST['val'];
		$sql = "SELECT * FROM  `$ShowTable` WHERE id = $val";
	} elseif (isset($_POST['obj'])) {

		$obj = json_decode($_POST['obj']) ;

		$a = implode(",", $obj);

		$sql = "SELECT * FROM  `$ShowTable` WHERE id IN ($a, 0)";

	} else {

		$v = $_POST['export'] ;
		// $sql = "SELECT * FROM `$ShowTable` WHERE status = $v ";
		switch ($_POST['export']) {
			case 'ЭКСПОРТНУЛИ!':
				$sql = "SELECT * FROM `$ShowTable`";
				break;
			case 'Линия 1':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '0'";
				break;
			case 'Линия 2':
				$sql = "SELECT * FROM `$ShowTable` WHERE status BETWEEN 1 AND 9";
				break;
			case 'На обработке':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '28'";
				break;
			case 'Активный поиск':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '29' AND vip = '1'";
				break;
			case 'Пассивный поиск':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '29' AND vip = '0'";
				break;
			case 'Избранные':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '33'";
				break;
			case 'Корзина':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '32'";
				break;
			case 'Клиенты из Excel':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '31'";
				break;
			case 'Модерация':
				if ($_COOKIE["role"] == 'ok_admin') {
					$sql = "SELECT * FROM `$ShowTable` WHERE status = '10' ";
				} elseif ($_COOKIE["role"] == 'ok_mainModer') {
					$sql = "SELECT * FROM `$ShowTable` WHERE status = '0' ";
				} else {
					$sql ="SELECT * FROM `$ShowTable` WHERE status = '$cok' ";
				}
				break;
			case 'Модератор 1':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '1' ";
				break;
			case 'Модератор 2':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '2' ";
				break;
			case 'Модератор 3':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '3' ";
				break;
			case 'Модератор 4':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '4' ";
				break;
			case 'Модератор 5':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '5' ";
				break;
			case 'Модератор 6':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '6' ";
				break;
			case 'Модератор 8':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '8' ";
				break;
			case 'Модератор 9':
				$sql = "SELECT * FROM `$ShowTable` WHERE status = '9' ";
				break;


		}
	}

	// echo $sql;


	$result = $con->query($sql);
	// $response = null;

	$response = [];

	while ($row = mysqli_fetch_assoc($result)) {
		$response[] = $row;
	}



	if (isset($_POST['val'])) {
		$response = $response[0];
	}
	$csv = new Csv();

	$HeadingsArray = array();
	$valuesArray = array();
	$shoudDeleted = array();
	
	if (!isset($_POST['export']) && $_POST['export'] !== 'ЭКСПОРТНУЛИ!') {
		$shoudDeleted = [
			'uid',  'pass', 'images',
			'defer', 'status', 'role'
		];
	}
	$newPlaces = ['user_OutNum' => 1, 'user_InNum' => 2];



	if (!isset($_POST['val'])) {
		foreach ($response[0] as $name => $value) {
			$HeadingsArray[] = $name;
		}
	} else {
		foreach ($response as $name => $value) {
			$HeadingsArray[] = $name;
		}
	}

	
	foreach ($shoudDeleted as $name => $value) {
		if ($value) {
			unset($HeadingsArray[array_search($value, $HeadingsArray)]);
		}
		
	}
	
	$id = $HeadingsArray[0];
	unset($HeadingsArray[array_search('id', $HeadingsArray)]);
	$HeadingsArray[$id] = 'id';
	// print_r($HeadingsArray);
	// print_r($response);


	$csv->titles = $HeadingsArray;

	if ($result = mysqli_query($con, $sql)) {
		foreach ($response as $name => $value) {
			$row = mysqli_fetch_array($result);
			array_push($valuesArray, $row);
		}
	}


	$csv->data = $valuesArray;



	if ($csv->save('people.csv')) {
		echo 'ok';
	}


}
?>
