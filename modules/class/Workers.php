<?php

    /**
     * Class Workers
     */
    final Class Workers extends DocSection {

        /**
         * Workers constructor.
         *
         * @param mysqli $mysqli
         */
        public function __construct($mysqli) {
            parent::__construct($mysqli);
        }

        /**
         * @param string $id
         * @param string $name
         * @param string $post
         * @param string $imgName
         */
        private function createWorkerItem($id, $name, $post, $imgName) {
            echo "<div data-wroker-id=\"$id\" class=\"worker-tile theme_white team__list-item\">
                      <div class=\"worker-tile__image\" style=\"background-image: url('/style/upd-image/workers/$imgName')\"></div>
                      <div class=\"worker-tile__info-block\">
                          <div class=\"worker-tile__name\">$name</div>
                          <div class=\"worker-tile__post\">$post</div>
                      </div>
                  </div>";
        }

        public function create() {
            if ($this->executeQuery('SELECT `id`, `name`, `post`, `avatar_href` FROM `workers`')) {
                $this->stmt->bind_result($id, $name, $post, $imgName);

                while ($this->stmt->fetch()) {
                    $this->createWorkerItem($id, $name, $post, $imgName);
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