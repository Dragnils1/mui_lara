<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../vendor/autoload.php';

//Create an instance; passing `true` enables exceptions


if (isset($_POST['mailBody']) && $_POST['mailBody'] !== '') {
    sendPhpMail($_POST['mailBody']) ;

    if (isset($_POST['profileEmail']) && $_POST['profileEmail'] !== '') {
        $newMail = $_POST['mailBody'];
        $newMail = preg_replace("/ style =. +? ['| \"] / i ", ' ', $newMail); // Удалить стиль
        $newMail = preg_replace("/ class =. +? ['| \"] / i ", ' ', $newMail); // Удалить стиль
        $newMail = preg_replace("/ color =. +? ['| \"] / i ", ' ', $newMail); // Удалить стиль
        $newMail = str_ireplace("style", "", $newMail);
        print_r($newMail);
        sendPhpMail($newMail);
    }
    
}

function sendPhpMail ($bodyMail) {

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.beget.com';                   //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'goroskdv@svat-astrolog.com';               //SMTP username
        $mail->Password   = 'pAdw4%%T';                 //SMTP password
        $mail->SMTPSecure = 'tls';
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->From       = 'goroskdv@svat-astrolog.com';
        $mail->Sender     = 'goroskdv@svat-astrolog.com';
        $mail->FromName   = 'svat-astrolog';
        $mail->Port       = '2525';                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        $mail->CharSet = "utf-8";

        $mail->setFrom('goroskdv@svat-astrolog.com', 'svat-astrolog.com');
        //Recipients    //Add a recipient
        $em = "Info@svat-astrolog.ru";
        $myEmail = 'Zelendra12@mail.ru';
        // 'Zelendra12@mail.ru'

        if (isset($_POST['mainEmail']) && $_POST['mainEmail'] !== '') {
            $em = $_POST['mainEmail'];
        }
        if (isset($_POST['profileEmail']) && $_POST['profileEmail'] !== '') {
            $mail->addAddress($_POST['profileEmail']);
        }

        // echo ($_POST['mailBody']);

        // $mail->addAddress('Zelendra12@mail.ru');               //Name is optional
        $mail->addAddress($em);
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Here is the subject';
        if (isset($_POST['mailBody'])) {
            $mail->Body    = " " . $bodyMail . "";
        } else {
            $mail->Body    = " <h1>Это письмо было отправлено с сайта <a href='svat-astrolog.com'>svat-astrolog.com</a> ,но в нем нет текста";
        }

        $mail->AltBody = "Пожалуйста напишите нам в случае если письмо пустое <a href='$myEmail'> $myEmail </a>";
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

}



?>