<?php /** @noinspection DuplicatedCode */

    $root = realpath($_SERVER["DOCUMENT_ROOT"]);

    require "$root/php/m_connection.php";
    require "$root/php/class/QueryHandler.php";

    $data = [
        'id' => $_GET['id'],
    ];

    $handler = new QueryHandler($mysqli, $data);

    $query = function() use ($handler) {
        return $handler->stmt->prepare("SELECT title, work_desc, img_arr, dribbble_link FROM works WHERE id = ?");
    };

    $bind_param = function () use ($handler) {
        return $handler->stmt->bind_param('i', $handler->requestData['id']);
    };

    $prepare_response = function() use ($handler) {
        $handler->stmt->bind_result($title, $desc, $img_arr, $drib_link);

        $handler->stmt->fetch();

        $imgArray = json_decode($img_arr);

        $result = [
            'title' => $title,
            'desc' => $desc,
            'work_link' => $drib_link,
            'img_arr' => $imgArray,
            'workers' => [],
            'share_items' => [],
        ];

        $handler->response['data'] = $result;
    };

    $handler->valid_exe($query, $bind_param, $prepare_response, true);
    $handler->clearResult();

    //find id workers
    $query = function() use ($handler) {
        return $handler->stmt->prepare("SELECT id FROM emp_to_works WHERE id_work = ?");
    };

    $bind_param = function () use ($handler) {
        return $handler->stmt->bind_param('i', $handler->requestData['id']);
    };

    $prepare_response = function() use ($handler) {
        $handler->stmt->bind_result($id);

        $result = [];

        while ($handler->stmt->fetch()) {
            $result[] = $id;
        }

        $handler->temp['workers_id'] = $result;
    };

    $handler->valid_exe($query, $bind_param, $prepare_response);
    $handler->clearResult();

    //get workers
    $query = function() use ($handler) {
        return $handler->stmt->prepare("SELECT id, name, post, thumbs_avatar FROM workers WHERE id = ?");
    };

    $bind_param = function (int $id) use ($handler) {
        return $handler->stmt->bind_param('i', $id);
    };

    $prepare_response = function() use ($handler) {
        $handler->stmt->bind_result($id, $name, $post, $img_name);

        $result = [];

        while ($handler->stmt->fetch()) {
            $result = [
                'id' => $id,
                'name' => $name,
                'post' => $post,
                'img_name' => $img_name
            ];
        }

        $handler->response['data']['workers'][] = $result;
    };

    $handler->iter_valid_exe($query, $bind_param, $prepare_response, $handler->temp['workers_id']);

    $handler->send_response();
