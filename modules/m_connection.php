<?php

setlocale(LC_ALL, '');

// TODO: Нужно написать собственный класс подключения, скорее всего с статическими методами и свойствами

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