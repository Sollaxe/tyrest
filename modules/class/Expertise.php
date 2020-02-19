<?php
    //TODO: Адекватно задокументировать класс
    /**
     * Class Expertise
     */
    class Expertise extends DocSection {

        /**
         * Expertise constructor.
         *
         * @param mysqli $mysqli
         */
        public function __construct($mysqli) {
            parent::__construct($mysqli);
        }

        /**
         * @param string $title
         * @param string $text
         * @param string $imgName
         */
        private function createExpertiseItem($title, $text, $imgName) {
            echo "<div class=\"expertise__item\">
                      <div class=\"icon expertise__item-icon\" style=\"background-image: url('/style/upd-image/expertise/$imgName')\"></div>
                      <h3 class=\"expertise__item-name\">$title</h3>
                      <p class=\"expertise__item-desc\">$text</p>
                  </div>";
        }

        public function create() {
            if ($this->executeQuery('SELECT `title`, `text`, `img_href` FROM `expertise`')) {
                $this->stmt->bind_result($title, $text, $imgName);

                while ($this->stmt->fetch()) {
                    $this->createExpertiseItem($title, $text, $imgName);
                }

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
