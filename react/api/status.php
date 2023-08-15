<?php 

require 'core/config.php';
require 'core/db.php';

if(isset($_POST))
{

	$Data = json_decode($_POST['data']);

    $st = $_POST['status'];

    $sql_save = "users SET status = '$st' "  . where . $Data->id;


    if(DB::setData(update, $sql_save)){
        echo 'ok';
    } else {
        echo '[]';
    }
    	
}


?>