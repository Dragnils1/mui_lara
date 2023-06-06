<?php 

require 'core/config.php';
require 'core/db.php';

if(isset($_POST))
{
    $id = $_POST['id'];
    $sql = "users WHERE id = $id";
    $user = DB::getAll($sql);


    $year = ($user['year'])/2;
    $statrRange =  $year - $_POST['range'] ;
    $endRange =  $year + $_POST['range'] ;
    $sql = "users WHERE year BETWEEN $statrRange AND $endRange ";
    $years = DB::getAll($sql);

    if (isset($_POST['zodiak'])) {
        $zodiak = $_POST['zodiak'];
        $mass = explode(',', $zodiak);
        $z = implode("','", $mass);
        $sqli = "users WHERE zodiak IN ('$z' )";
    } else {
        $zodiak = $user[array_search('zodiak', $user)];
        switch($zodiak) {
            case ('Козерог'):
                $sqli = "users WHERE zodiak = 'Телец'";
                break;
            }
    }

    $zod = DB::getAll($sqli);

    $data = [];
    array_push($data, $user, $years, $zod);
    if(count($data) > 0) {
        echo json_encode($data);
    }

}


?>