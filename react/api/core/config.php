<?php
include_once __DIR__."/../../vendor/autoload.php";

// use Symfony\Component\Dotenv\Dotenv;

// $dotenv = new Dotenv();
// $dotenv->load(__DIR__.'/../../.env');

//  define('DB_HOST', $_ENV['DB_HOST']);
//  define('DB_USER', $_ENV['DB_USER']);
//  define('DB_PASS', $_ENV['DB_PASS']);
//  define('DB_NAME', $_ENV['DB_NAME']);

// define('DB_HOST', 'localhost');
// define('DB_USER', 'goroskdv_goro');
// define('DB_PASS', 'm0&oOz43');
// define('DB_NAME', 'goroskdv_goro');

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'goroskv_goro');

define('select', 'SELECT * FROM ');
define('insert', 'INSERT INTO ');
define('update', 'UPDATE ');
define('delete', 'DELETE FROM ');
define('where', ' WHERE id = ');


//Admin login

define('email_admin', 'admin@goro.com');
define('pass_admin', 'admin123');

define('admin_email', 'info@svat-astrolog.ru');


?>
