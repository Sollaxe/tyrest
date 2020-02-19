<?php
    //TODO: Адекватно задокументировать класс
    /**
     * Class About
     */
    class About extends DocSection {

        /**
         * About constructor.
         *
         * @param mysqli $mysqli
         */
        public function __construct($mysqli) {
            parent::__construct($mysqli);
        }


        public function createText() {
            if ($this->executeQuery('SELECT `min_desc` FROM `about` WHERE `id` = 1')) {
                $this->stmt->bind_result($text);
                $this->stmt->fetch();

                echo $text;

                $this->stmt->close();
            }
        }

        /**
         * @param string $message
         */
        protected function queryErrorHandler($message) {
            echo "<div>$message</div>";
        }
    }