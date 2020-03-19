<?php

    $root = realpath($_SERVER["DOCUMENT_ROOT"]);

    require "$root/php/m_connection.php";
    require "$root/php/class/QueryHandler.php";

    $handler = new QueryHandler($mysqli, []);

    $query = function() use ($handler) {
        return $handler->stmt->prepare("SELECT full_desc FROM about");
    };

    $bind_param = function () use ($handler) {};

    $prepare_response = function() use ($handler) {
        $handler->stmt->bind_result($desc);

        $handler->stmt->fetch();

        $result = [
            'title' => 'ABOUT US',
            'text' => $desc
        ];

        $handler->response['data'] = $result;
    };

    $handler->valid_exe($query, $bind_param, $prepare_response);
    $handler->send_response();