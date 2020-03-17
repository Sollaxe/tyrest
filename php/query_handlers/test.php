<?php

    $root = realpath($_SERVER["DOCUMENT_ROOT"]);

    require "$root/php/m_connection.php";
    require "$root/php/class/QueryHandler.php";

    $data = [
        'id' => $_GET['id'],
    ];

    $test = new QueryHandler($mysqli, $data);

    $query = function() use ($test) {
        return $test->stmt->prepare("SELECT title, text FROM head_slider WHERE id = ?");
    };

    $bind_param = function () use ($test) {
        return $test->stmt->bind_param('i', $test->requestData['id']);
    };

    $prepare_response = function() use ($test) {
        $test->stmt->bind_result($title, $text);

        $test->stmt->fetch();

        //TODO: Переделать проверку наличия результата (в данный момент проверка очень сомнительная)
        if (!$title and !$text) {
            $test->drop_the_code('request_error');
        }

        $result = [
            'title' => $title,
            'text' => $text,
        ];

        $test->response['data'] = $result;
    };

    $test->valid_exe($query, $bind_param, $prepare_response);
    $test->send_response();