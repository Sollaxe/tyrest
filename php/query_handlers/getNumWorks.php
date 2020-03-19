<?php

    $root = realpath($_SERVER["DOCUMENT_ROOT"]);

    require "$root/php/m_connection.php";
    require "$root/php/class/QueryHandler.php";

    $handler = new QueryHandler($mysqli, []);

    $query = function() use ($handler) {
        return $handler->stmt->prepare("SELECT COUNT(id) AS num FROM works");
    };

    $bind_param = function () use ($handler) {};

    $prepare_response = function() use ($handler) {
        $handler->stmt->bind_result($num);

        $handler->stmt->fetch();

        $result = [
            'num_works' => $num
        ];

        $handler->response['data'] = $result;
    };

    $handler->valid_exe($query, $bind_param, $prepare_response);
    $handler->send_response();