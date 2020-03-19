<?php

    $root = realpath($_SERVER["DOCUMENT_ROOT"]);

    require "$root/php/m_connection.php";
    require "$root/php/class/QueryHandler.php";

    $works_on_page = (int)$_GET['worksOnPage'];
    $page = (int)$_GET['page'];

    $offset = $page * $works_on_page;

    $data = [
        'offset' => $offset,
        'works_on_page' => $works_on_page
    ];



    $handler = new QueryHandler($mysqli, $data);

    $query = function() use ($handler) {
        return $handler->stmt->prepare("SELECT id, title, short_desc, thumbs_img_href FROM works LIMIT ?, ?");
    };

    $bind_param = function () use ($handler) {
        return $handler->stmt->bind_param('ii', $handler->requestData['offset'], $handler->requestData['works_on_page']);
    };

    $prepare_response = function() use ($handler) {
        $handler->stmt->bind_result($id, $title, $desc, $img_name);

        $result = [];

        while ($handler->stmt->fetch()) {
            $result[] = [
                'id' => $id,
                'title' => $title,
                'desc' => $desc,
                'img_name' => $img_name
            ];
        }



        $handler->response['data'] = $result;
    };

    $handler->valid_exe($query, $bind_param, $prepare_response);
    $handler->send_response();