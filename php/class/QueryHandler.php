<?php /** @noinspection PhpVoidFunctionResultUsedInspection */

    /**
     * Class QueryHandler
     */
    class QueryHandler {
        public $stmt;
        public $mysqli;
        public $requestData;

        public $temp = [];

        public $response = [
            'status' => 'performed',
            'data' => [],
        ];

        /**
         * QueryHandler constructor.
         *
         * @param mysqli $mysqli
         * @param array $requestData
         */
        public function __construct($mysqli, $requestData) {
            $this->mysqli = $mysqli;
            $this->stmt = $this->mysqli->stmt_init();
            $this->requestData = $requestData;
        }

        /**
         * @param callable $query
         * @param callable $bind_param
         * @param callable $prepare_response
         * @param bool $check_existing
         */

        //TODO: Переписать текст ошибок, он должен быть более информативным
        public function valid_exe(callable $query, callable $bind_param, callable $prepare_response, bool $check_existing = false) {
            try {
                if ($query()) {
                    $bind_param();

                    if ($this->stmt->execute()) {
                        if ($check_existing) {
                            $this->stmt->store_result();
                            if ($this->stmt->num_rows === 0) {
                                header('HTTP/1.1 404 Not Found');
                                exit();
                            }
                        }

                        $prepare_response();
                    } else {
                        throw new Error('1111');
                    }
                } else {
                    throw new Error('fdf');
                }
            } catch (Error $e) {
                $this->drop_the_code('request_error');
            }
        }

        /**
         * @param callable $query
         * @param callable $bind_param
         * @param callable $prepare_response
         * @param array $data_arr
         */
        public function iter_valid_exe(callable $query, callable $bind_param, callable $prepare_response, $data_arr) {
            try {
                if ($query()) {
                    foreach ($data_arr as $currData) {
                        $bind_param($currData);
                        if ($this->stmt->execute()) {
                            $prepare_response();
                        } else {
                            throw new Error('1111');
                        }
                    }
                } else {
                    throw new Error('fdf');
                }
            } catch (Error $e) {
                $this->drop_the_code('request_error');
            }
        }

        public function send_response() {
            $this->closeConnection();

            $this->response['status'] = 'successful';

            $json = json_encode($this->response);
            exit($json);
        }

        /**
         * @param $status
         */
        public function drop_the_code($status) {
            $this->closeConnection();
//            $this->response['data'] = json_encode('{}');
            $this->response['status'] = $status;
            exit(json_encode($this->response));
        }

        protected function closeConnection() {
            $this->clearResult();
            $this->mysqli->close();
            $this->stmt->close();
        }

        public function clearResult() {
            $this->stmt->free_result();
        }
    }