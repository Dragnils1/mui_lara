<?php

require '../core/config.php';
require '../core/db.php';

if(isset($_POST))
{

		$Data = json_decode($_POST['data']);
 
		
		//Parts query
		foreach($Data->region as $elem)
		{
			$region_line .= "$elem,";
		}


		$region = sizeof($Data->region) ? " city IN (" . mb_substr($region_line, 0, -1) . ") AND" : "";
		$years = " year >= " . $Data->years->min . " AND year <= " . $Data->years->max . " AND";



		foreach($Data->birthyear as $elem)
		{
			$birthyear_line .= "'$elem',";
		}

		$birthyear = sizeof($Data->birthyear) ? " birthyear IN (" . mb_substr($birthyear_line, 0, -1) . ") AND" : "";

		foreach($Data->zodiak as $elem)
		{
			$zodiak_line .= "'$elem',";
		}

		$zodiak = sizeof($Data->zodiak) ? " zodiak IN (" . mb_substr($zodiak_line, 0, -1) . ") AND" : "";

		foreach($Data->langlove as $elem)
		{
			$langlove_line .= "'$elem',";
		}


		$langlove = sizeof($Data->langlove) ? " langlove IN (" . mb_substr($langlove_line, 0, -1) . ") AND" : "";
		

		foreach($Data->langlove2 as $elem)
		{
			$langlove2_line .= "'$elem',";
		}


		$langlove2 = sizeof($Data->langlove2) ? " langlove2 IN (" . mb_substr($langlove2_line, 0, -1) . ") AND" : "";
		
		if($Data->user_type == '1')
			$user_type = " AND vip = '1' ";
		else if($Data->user_type == '2')
			$user_type = " AND vip = '0' ";
		else
			$user_type = "";

		$height = " height >= " . $Data->height->min . " AND height <= " . $Data->height->max . " AND";

		$smoke = " smoke = '" . $Data->smoke . "' AND";
		$children = " children = '" . $Data->children . "'";

		$gender = $Data->gender == 'М' ? " gender = 'Ж' AND" : " gender = 'М' AND";


		$sql = 'users WHERE (' . $region . $years . $birthyear . $zodiak . $langlove . $langlove2 . $height . $gender . $smoke . $children . $user_type . " AND status != -2)";


		$response = DB::getAll($sql);

		// echo $response ? '["' . $sql . '",' . json_encode($response) . ']' : '["' . $sql . '"]';
		echo $response ? json_encode($response) : '[]';


}


?>
