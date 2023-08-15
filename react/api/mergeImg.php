<?php

function wotermak($img1, $img2 = './logo.png', $pos = 'right_bottom')
{
//типы файлов
    $type = pathinfo($img1);
    // var_dump($type["extension"] );
    $type2 = pathinfo($img2);
    //создаем исходное изображение
    if ($type['extension'] == 'jpg' || $type['extension'] == 'jpeg') {
    $img = imagecreatefromjpeg($img1);
    }
    if ($type['extension'] == 'png') {
    $img = imagecreatefrompng($img1);
    }
    $arwater_img = getimagesize($img1); //узнаем размер переданного изображения, чтобы правильно рассчитать координаты наложения
    $water_width = $arwater_img[0]; //ширина исходного изображения
    $water_height = $arwater_img[1]; //высота исходного изображения
    $water_img_type = $arwater_img[2];
    $water_img_type = $arwater_img[$water_img_type - 1];
    $water_img_size = $arwater_img[3];
    //создаем водный знак
    // if ($type2['extension'] == 'jpg' or $type['extension'] == 'jpeg') {
    // $water_img = imagecreatefromjpeg($img2);
    // }
    // if ($type2['extension'] == 'png') {
    $water_img = imagecreatefrompng($img2);
    // }
    $water_size = getimagesize($img2); //узнаем размеры водного знака, чтобы правильно выполнить наложение
    $logo_h = $water_size[1]; //высота водного знака
    $logo_w = $water_size[0]; //ширинаа водного знака
    // левый верхний угол
    if ($pos == 'left_top') {
    imagecopy($img, $water_img, 0, 0, 0, 0, $logo_w, $logo_h);
    }
    // правый верхний угол
    if ($pos == 'right_top') {
    imagecopy($img, $water_img, $water_width - $logo_w, 0, 0, 0, $logo_w, $logo_h);
    }
    // правый нижний угол
    if ($pos == 'right_bottom') {
    imagecopy($img, $water_img, $water_width - $logo_w, $water_height - $logo_h, 0, 0, $logo_w, $logo_h);
    }
    //левый нижний угол
    if ($pos == 'left_bottom') {
    imagecopy($img, $water_img, 0, $water_height - $logo_h, 0, 0, $logo_w, $logo_h);
    }
    imagejpeg($img, $img1); //выводим, сохраняем изображение
    imagedestroy($img);
    unset($img);
}