<?php 

require '../core/config.php';
require '../core/db.php';


if(isset($_POST))
{


	$fav_date = Date('d.m.Y - H:i');

	$sql = "users SET fav_date='$fav_date' WHERE email = '". $_POST['email'] . "'";


	$from = 'noreply@' . $_SERVER['SERVER_NAME'];
	$to = admin_email;

	$subject = 'Заявка избранное от пользователя - ' . $_POST['email'];

	$subject = "=?utf-8?B?".base64_encode($subject)."?=";
    $headers = "From: $from\r\nReply-to: $from\r\nContent-type: text/html; charset=utf-8\r\n";

    $message = 'Заявка избранное от пользователя - ' . $_POST['email'] . ' - ' . $fav_date;

    if(DB::setData(update, $sql) && mail($to, $subject, $message, $headers))
    	echo 'ok';
}


?>