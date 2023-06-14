<?php

require 'core/config.php';
require 'core/db.php';
include 'mergeImg.php';

session_start();
ini_set('display_errors', 'Off');
// ini_set('display_errors', 'On');

if(isset($_POST['data']))
{

	$Data = json_decode($_POST['data']);

	// print_r($Data);

	// print($_POST['data']);
	function submitData($Data)
	{
	    $acc = $_SESSION['acc'] ?: [];
		unset($Data->bot);
		unset($Data->role);
		unset($Data->politic);
		unset($Data->r_pass);
		unset($Data->o_img1);
		unset($Data->o_img2);
		unset($Data->o_img3);
		unset($Data->o_img4);
		unset($Data->user_OutNum);
		unset($Data->user_InNum);



		if(isset($_FILES['o_img1']))
		{
			$filename1 = DB::getFileName($_FILES['o_img1']['name']);
			move_uploaded_file($_FILES['o_img1']['tmp_name'], '../upload/' . $filename1);
			// wotermak('../upload/' . $filename1);
		}

		if(isset($_FILES['o_img2']))
		{
			$filename2 = DB::getFileName($_FILES['o_img2']['name']);
			move_uploaded_file($_FILES['o_img2']['tmp_name'], '../upload/' . $filename2);
			// wotermak('../upload/' . $filename2);
		}

		if(isset($_FILES['o_img3']))
		{

			$filename3 = DB::getFileName($_FILES['o_img3']['name']);
			move_uploaded_file($_FILES['o_img3']['tmp_name'], '../upload/' . $filename3);
			// wotermak('../upload/' . $filename3);
		}

		if(isset($_FILES['o_img4']))
		{
			$filename4 = DB::getFileName($_FILES['o_img4']['name']);
			move_uploaded_file($_FILES['o_img4']['tmp_name'], '../upload/' . $filename4);
			// wotermak('../upload/' . $filename4);
		}

		$Data->images = "$filename1,$filename2,$filename3,$filename4";



		$Data->created_at = Date('d.m.Y');

		// if ($acc["role"] === 'adm') {
		// 	$Data->status = '10';
		// } elseif ($acc["role"] === 'mainModer') {
		// 	$Data->status = '0';
		// } elseif ($acc['role'] === 'Moder') {
        //     $Data->status = $_COOKIE['intModer'];
        // } elseif ($acc["role"] === 'consideration') {
		// 	$Data->status = '28';
		// }



		$Data->pass = md5($Data->pass);

		$Data->uid = md5(time() . $Data->email);
		if ($_POST['email']) {
			$em = $_POST['email'];

		} else {
			$em = $Data->email;
		}
		// echo $em;
		$sql = "users WHERE email = '$em'";


		if (!empty($Data->color)) {
			$sql = 'users SET ' .  DB::getString($Data) . "WHERE email = '$em'";

			// print($sql);
			if (DB::setData('UPDATE ', $sql))
				echo json_encode('ok update');
			else
				echo 'fail update';

		} else {
			if (isset($_POST['email'])) {
				$Data ->email = $em;
				$Data->status = '0';
			}

			$sql = 'users SET ' .  DB::getString($Data) ;

			// print_r($sql);

			if (DB::setData(insert, $sql))
				echo json_encode("ok");
			else
				echo '[]';
		}


		if($_POST['send'] == 1)
		{
			$from = 'noreply@' . $_SERVER['SERVER_NAME'];
			$to = admin_email;

			$subject = 'Заявка из квиза от пользователя - ' . $Data->email;

			$subject = "=?utf-8?B?".base64_encode($subject)."?=";
		    $headers = "From: $from\r\nReply-to: $from\r\nContent-type: text/html; charset=utf-8\r\n";

		    $message = 'Заявка из квиза от пользователя - ' . $Data->firstname . ' - Email: ' . $Data->email . ' - Телефон: ' . $Data->phone . ' - VK: ' . $Data->vk;

		    mail($to, $subject, $message, $headers);
		}
	}

	submitData($Data);
}


