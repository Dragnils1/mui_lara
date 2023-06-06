<?php 

require 'core/config.php';
require 'core/db.php';

if(isset($_POST))
{

    $setterName = $_POST['setterName'];
    $value = $_POST['value'];
    $id = $_POST['id'];

    $sql_save = "users SET $setterName = '$value' WHERE id = $id ";

    // echo $sql_save;


    if(DB::setData(update, $sql_save)){
        echo 'ok';
    } else {
        echo '[]';
    }
    	
}
