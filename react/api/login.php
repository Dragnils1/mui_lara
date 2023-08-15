<?php
session_start();

require 'core/config.php';
require 'core/db.php';

// Номера ролей в бд соответствуют следущим ролям
// 0- user
// 1- main moderator
// 2- moderator


if(isset($_POST))
{
	if($_POST['email'] && $_POST['pass'])
	{
		// if(email_admin == $_POST['email'] && pass_admin == $_POST['pass'])
		// {
			// $_SESSION['acc'] = [array("Account" => "{}", "whoIs" => 'ok_admin')];
			// echo json_encode(array("Account" => '[]', "whoIs" => 'ok_admin'));
		// }
		// else
		// {
			$email = $_POST['email'];
			$pass = md5($_POST['pass']);

			$sql = "users WHERE email = '$email' AND pass = '$pass'";
			// print($sql);

			$Account = DB::getRow($sql);
			unset($Account['pass']);

			$anwer = '[]';

			if($Account && $Account['status'] != '0' && $Account['role'] == '3')
			{
				$Account['role'] = 'ok_admin';

				$_SESSION['acc'] = $Account;

				$anwer = 'ok_admin';
			}
			else if($Account && $Account['status'] != '0' && $Account['role'] == '0')
			{
				$Account['role'] = 'ok_user';

				$_SESSION['acc'] = $Account;

				$anwer = 'ok_user';
			}
			else if ($Account && $Account['status'] != '0' && $Account['role'] == '1') {

				$Account['role'] = 'ok_mainModer';

				$_SESSION['acc'] = $Account;

				$anwer = 'ok_mainModer';
			} 
			else if ($Account && $Account['status'] != '0' && $Account['role'] == '120') {

				$Account['role'] = 'consideration';

				$_SESSION['acc'] = $Account;

				$anwer = 'consideration';
			}
			else if ($Account && $Account['status'] != '0' && $Account['role'] == '2') {

				$Account['role'] = 'ok_Moder';

				$_SESSION['acc'] = $Account;

				$val = $Account['uid'];

				setcookie('role', $val, 0, '/');

				$anwer = 'ok_Moder';
			}
			else if($Account && $Account['status'] == '0')
			{
				$anwer = 'mod';
			}
			echo json_encode(array("Account" => $Account, "whoIs" => $anwer));
		// }
	}
	else
	{
		echo '[]';
	}
}

?>
