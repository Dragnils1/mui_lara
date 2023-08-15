<?php

require 'core/config.php';
require 'core/db.php';
include 'mergeImg.php';

if (isset($_POST)) {

    // $Data = json_decode($_POST);

    // print_r($_FILES);

    if (isset($_FILES['o_img1'])) {
        move_uploaded_file($_FILES['o_img1']['tmp_name'], '../upload/' . $_FILES['o_img1']['name']);
        // wotermak('../upload/' . $_FILES['o_img1']['name']);
    }

    if (isset($_FILES['o_img2'])) {
        move_uploaded_file($_FILES['o_img2']['tmp_name'], '../upload/' . $_FILES['o_img2']['name']);
        // wotermak('../upload/' . $_FILES['o_img2']['name']);
    }

    if (isset($_FILES['o_img3'])) {
        move_uploaded_file($_FILES['o_img3']['tmp_name'], '../upload/' . $_FILES['o_img3']['name']);
        // wotermak('../upload/' . $_FILES['o_img3']['name']);
    }

    if (isset($_FILES['o_img4'])) {
        move_uploaded_file($_FILES['o_img4']['tmp_name'], '../upload/' . $_FILES['o_img4']['name']);
        // wotermak('../upload/' . $_FILES['o_img4']['name']);
    }

   
    
    $value = $_POST['images'];

    if (isset($_POST['user_id'])) {
        $id = $_POST['user_id'];
        $sql_save = "users SET images = '$value' "  . where . $id;
    } else if (isset($_POST['user_email'])) {
        $email = $_POST['user_email'];
        $sql_save = "users SET images = '$value' WHERE email = '$email'";
    }

    
// echo( $sql_save);

    if (DB::setData(update, $sql_save)) {
        echo 'ok';
    } else {
        echo '[]';
    }
}
