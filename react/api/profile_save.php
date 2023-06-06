<?php

// error_reporting(E_NOTICE);

require 'core/config.php';
require 'core/db.php';
include 'googleDrive.php';

if(isset($_POST))
{
		$Data = json_decode($_POST['data']);
		$user_id = $Data->id;
		$Data->last_modify = Date('d.m.Y - H:i');

	
		if(isset($_FILES['o_img1']) && $_FILES['o_img1'] !== '{}')
		{
			$filename1 = DB::getFileName($_FILES['o_img1']['name']);
			move_uploaded_file($_FILES['o_img1']['tmp_name'], '../upload/' . $filename1);
		}
		else
		{
			$filename1 = (isset($Data->o_img1) && $Data->o_img1 !== '{}') ? $Data->o_img1 : '';
		}

		if(isset($_FILES['o_img2']) && $_FILES['o_img2'] !== '{}')
		{
			$filename2 = DB::getFileName($_FILES['o_img2']['name']);
			move_uploaded_file($_FILES['o_img2']['tmp_name'], '../upload/' . $filename2);
		}
		else
		{
			$filename2 = (isset($Data->o_img2) && $Data->o_img2 !== '{}') ? $Data->o_img2 : '';
		}

		if(isset($_FILES['o_img3']) && $_FILES['o_img3'] !== '{}')
		{
			$filename3 = DB::getFileName($_FILES['o_img3']['name']);
			move_uploaded_file($_FILES['o_img3']['tmp_name'], '../upload/' . $filename3);
		}
		else
		{
			$filename3 = (isset($Data->o_img3) && $Data->o_img3 !== '{}') ? $Data->o_img3 : '';
		}

		if(isset($_FILES['o_img4']) && $_FILES['o_img4'] !== '{}')
		{
			$filename4 = DB::getFileName($_FILES['o_img4']['name']);
			move_uploaded_file($_FILES['o_img4']['tmp_name'], '../upload/' . $filename4);
		}
		else
		{
			$filename4 = (isset($Data->o_img4) && $Data->o_img4 !== '{}') ? $Data->o_img4 : '';
		}

		// $images="$Data->images";
		

		unset($Data->id);
		unset($Data->o_img1);
		unset($Data->o_img2);
		unset($Data->o_img3);
		unset($Data->o_img4);
		unset($Data->r_pass);

		if(trim($Data->pass)) $Data->pass = md5($Data->pass);
		else unset($Data->pass);

		if(trim($Data->visible_pass)) $Data->pass = md5($Data->visible_pass);
		

		if (isset($_POST['comp'])) {
		    $Data->comp = $_POST['comp'];
        }

		$sql = "users SET " .  DB::getString($Data) . where . $user_id;

		if(DB::setData(update, $sql))
			echo 'ok';
		else
			echo 'fail';

		if ($Data->status === '29') {
			foreach (explode(",", $Data->images) as $key => $value) {
				if ($value) {

					$vip = $Data->vip === '1' ? 'Топ' : 'БезVip';
					$gender = $Data->gender;
					$k = $key + 1;

					uploadFileToFolder("000 $vip 00 ( $k )", '../upload/' . $value, $gender);
				}
			}
		}
}
