<?php /** @noinspection DuplicatedCode */

    $root = realpath($_SERVER["DOCUMENT_ROOT"]);

    require "$root/php/m_connection.php";
    require "$root/php/class/QueryHandler.php";

    $data = [
        'id' => $_GET['id'],
    ];

    $handler = new QueryHandler($mysqli, $data);

    $query = function() use ($handler) {
        return $handler->stmt->prepare("SELECT name, post, about, avatar_name FROM workers WHERE id = ?");
    };

    $bind_param = function () use ($handler) {
        return $handler->stmt->bind_param('i', $handler->requestData['id']);
    };

    $prepare_response = function() use ($handler) {
        $handler->stmt->bind_result($name, $post, $about, $img_name);

        $handler->stmt->fetch();

        $result = [
            'name' => $name,
            'post' => $post,
            'about' => $about,
            'img_name' => $img_name
        ];

        $handler->response['data'] = $result;
    };

    $handler->valid_exe($query, $bind_param, $prepare_response);
    $handler->send_response();