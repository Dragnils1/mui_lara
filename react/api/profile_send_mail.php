<?php 

require 'core/config.php';
require 'core/db.php';

if(isset($_POST))
{

	$Data = json_decode($_POST['data']);

    $sql_save = "users SET comp = '" . $_POST['comp'] . "', fav_modify = '1'" . where . $Data->id;

    if(DB::setData(update, $sql_save))
    {


	$Fav = json_decode($_POST['comp']);

	foreach ($Fav as $key) {
		$row = DB::getRow("users" . where . $key->id);

		$Res[] = [
					'username' => $row['firstname'],
					'img' => array_shift(explode(',', $row['images'])),
					'email' => $row['email'],
					'birthday' => $row['birthday'],
					'comp' => $key->comp
				 ];
	}	


	$from = 'noreply@' . $_SERVER['SERVER_NAME'];
	$to = $Data->email;

	$subject = 'Список избранных пользователей - ';

	$subject = "=?utf-8?B?".base64_encode($subject)."?=";
    $headers = "From: $from\r\nReply-to: $from\r\nContent-type: text/html; charset=utf-8\r\n";

    $message = '<table style="border: 1px solid #333; border-collapse: collapse;">
    				<tr>
    					<th style="border: 1px solid #333; border-collapse: collapse; padding: 10px;">Имя пользователя</th>
    					<th style="border: 1px solid #333; border-collapse: collapse; padding: 10px;">Фото</th>
    					<th style="border: 1px solid #333; border-collapse: collapse; padding: 10px;">Email</th>
    					<th style="border: 1px solid #333; border-collapse: collapse; padding: 10px;">Дата рождения</th>
    					<th style="border: 1px solid #333; border-collapse: collapse; padding: 10px;">Совместимость</th>
    				</tr>
    		   ';

    foreach ($Res as $key) {
    	$message .= '<tr>
    					<td style="border: 1px solid #333; border-collapse: collapse; padding: 10px;">' . $key['username'] . '</td>
    					<td style="border: 1px solid #333; border-collapse: collapse; padding: 10px;">
    						<div style="width: 60px; height: 60px; borader: 2px solid #aaa; border-radius: 5px; overflow: hidden;">
    							<img src="' . $_SERVER['SERVER_NAME'] . '/goro/upload/' . $key['img'] . '" style="width: 100%; height: 100%; object-fit: cover;">
    						</div>
    					</td>
    					<td style="border: 1px solid #333; border-collapse: collapse; padding: 10px;">' . $key['email'] . '</td>
    					<td style="border: 1px solid #333; border-collapse: collapse; padding: 10px;">' . $key['birthday'] . '</td>
    					<td style="border: 1px solid #333; border-collapse: collapse; padding: 10px;">' . $key['comp'] . '</td>
    				</tr>';
    }

    $message .= '</table>';


    if(mail($to, $subject, $message, $headers))
    	echo 'ok';
    

    }
}


?>