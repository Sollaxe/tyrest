<?php

    $root = realpath($_SERVER["DOCUMENT_ROOT"]);
    require "$root/php/m_connection.php";


    $id = $_GET['id'];

    $test_stmt = $mysqli->stmt_init();

    $query = $test_stmt->prepare("SELECT title, text FROM head_slider WHERE id = ?");

    if ($query) {
        $test_stmt->bind_param('i', $id);

        $exe = $test_stmt->execute();

        if ($exe) {
            $test_stmt->bind_result($title, $text);

            $test_stmt->fetch();

            $result = [
                'title' => $title,
                'text' => $text,
            ];

            $jsonResult = json_encode($result);

            echo $jsonResult;
        }
    }