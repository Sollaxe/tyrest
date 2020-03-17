<?php /** @noinspection PhpVoidFunctionResultUsedInspection */

    /**
     * Class QueryHandler
     */
    class QueryHandler {
        public $stmt;
        public $mysqli;
        public $requestData;

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
         * @param callable $func
         */
        protected function query(callable $func) {
            call_user_func($func);
        }

        /**
         * @param callable $func
         */
        protected function bind_param(callable $func) {
            call_user_func($func);
        }

        /**
         * @param callable $func
         */
        protected function prepare_response(callable $func) {
            call_user_func($func);
        }

        /**
         * @param callable $query
         * @param callable $bind_param
         * @param callable $prepare_response
         */
        public function valid_exe(callable $query, callable $bind_param, callable $prepare_response) {
            try {
                if ($query($query)) {
                    $bind_param($bind_param);

                    if ($this->stmt->execute()) {
                        $prepare_response($prepare_response);
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

        public function send_response() {
            $this->mysqli->close();
            $this->stmt->close();

            $this->response['status'] = 'successful';

            $json = json_encode($this->response);
            exit($json);
        }

        /**
         * @param $status
         */
        public function drop_the_code($status) {
            $this->mysqli->close();
            $this->stmt->close();

            $this->response['status'] = $status;
            exit(json_encode($this->response));
        }
    }