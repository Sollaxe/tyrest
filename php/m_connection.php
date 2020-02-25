<?php

setlocale(LC_ALL, '');

$mysqli = new mysqli(
    '127.0.0.1',
    'unknown',
    'pas',
    'tyrest'
);

if ($mysqli->connect_errno) {
  header('HTTP/1.1 500 Internal Server Error');
  exit();
}