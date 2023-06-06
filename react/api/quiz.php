<?php

require 'core/config.php';
require 'core/db.php';

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
		unset($Data->passwordConfirm);



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



		$Data->reg_date = Date('d.m.Y');
        $Data->status = '0';
		

		$Data->pass = md5($Data->pass);

		$Data->uid = md5(time() . $Data->email);

        $em = $_POST['email'];

        if (isset($_POST['step'])) {

			$Data->email = $em;

            $sql = 'users SET ' .  DB::getString($Data) ;

            if (DB::setData(insert, $sql))
                echo json_encode("ok");
            else
                echo '[]';

        } else  {

			if ($Data->email === '') {
				$Data->email = $em;
			}
            $sql = 'users SET ' .  DB::getString($Data) . " WHERE email = '$em'";

			// echo($sql);

            if (DB::setData('UPDATE ', $sql))
                echo json_encode('ok update');
            else
                echo 'fail update';
        } 
        // else if ($Data->email !== '' && isset($_POST['email'])) {
        //     $a = $_POST['email'];

        //     $sql = 'users SET ' .  DB::getString($Data) . "WHERE email = '$a'";

        //     if (DB::setData('UPDATE ', $sql))
        //         echo json_encode('ok update');
        //     else
        //         echo 'fail update';
        // }


        
	}

	submitData($Data);
}