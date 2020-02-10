<?php

setlocale(LC_ALL, '');

$connection = mysqli_connect(
    '127.0.0.1',
    'unknown',
    'pas',
    'tyrest'
);


if ( $connection == false ) {
    header('HTTP/1.1 500 Internal Server Error');
    exit();
}