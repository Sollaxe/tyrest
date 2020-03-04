<?php
    //TODO: Адекватно задокументировать класс
    /**
     * Class DocSection
     *
     * @property mysqli_stmt $stmt
     * @property mysqli $mysqli
     */
    abstract class DocSection {
        protected $stmt;
        protected $mysqli;

        /**
         * DocSection constructor.
         *
         * @param mysqli $mysqli
         */
        public function __construct($mysqli)
        {
            $this->mysqli = $mysqli;
            $this->stmt = $this->mysqli->stmt_init();
        }

        /**
         * @param string $query
         *
         * @return bool
         */
        //
        protected function executeQuery($query) {
            try {
                if ($this->stmt->prepare($query)) {
                    $this->stmt->execute();
                    return true;
                } else {
                    throw new Exception('Invalid query');
                }
            } catch (Exception $e) {
                $this->stmt->close();
                $this->queryErrorHandler($e->getMessage());
                return false;
            }
        }

        /**
         * @param string $message
         */
        protected function queryErrorHandler($message) {
            echo "<div>$message</div>";
        }
    }