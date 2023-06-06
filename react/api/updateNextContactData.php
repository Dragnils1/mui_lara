<?php 

require 'core/config.php';
require 'core/db.php';

if(isset($_POST))
{

	$Data = json_decode($_POST['data']);

    $id = $_POST['id'];
    $value = $_POST['value'];

    $sql_save = "users SET next_contact_date = '$value' "  . where . $id;

    if(DB::setData(update, $sql_save)){
        echo 'ok';
    } else {
        echo '[]';
    }
    	
}
