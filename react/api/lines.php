<?php 

require 'core/config.php';
require 'core/db.php';

if(isset($_POST))
{
	if (isset($_POST['num'])) {
		$num = $_POST['num'];
	}
	
    if (($_COOKIE["role"] == 'adm') && !$num) {
        $sql = "users WHERE status = '0' ORDER BY defer ASC, last_modify DESC";
    } else if (($_COOKIE["role"] == 'mainModer' || 'adm') && isset($num)) {
		$sql = "users WHERE status = '$num' ORDER BY defer ASC, last_modify DESC";
	} else {
		$sql = "`users` WHERE STATUS BETWEEN 1 AND 9 ORDER BY defer ASC, last_modify DESC";
    }
	$response = DB::getAll($sql);

	if($response)
		echo json_encode($response);
	else
		echo '[]';

	// echo $response;
}


?>