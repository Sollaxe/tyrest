<?php

    $root = realpath($_SERVER["DOCUMENT_ROOT"]);

    require "$root/php/m_connection.php";
    require "$root/php/class/QueryHandler.php";

    $data = [
        'id' => $_GET['id'],
    ];

    $handler = new QueryHandler($mysqli, $data);

    $query = function() use ($handler) {
        return $handler->stmt->prepare("SELECT title, text FROM head_slider WHERE id = ?");
    };

    $bind_param = function () use ($handler) {
        return $handler->stmt->bind_param('i', $handler->requestData['id']);
    };

    $prepare_response = function() use ($handler) {
        $handler->stmt->bind_result($title, $text);

        $handler->stmt->fetch();

        $result = [
            'title' => $title,
            'text' => $text,
        ];

        $handler->response['data'] = $result;
    };

    $handler->valid_exe($query, $bind_param, $prepare_response);
    $handler->send_response();