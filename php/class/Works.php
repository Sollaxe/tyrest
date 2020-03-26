<?php

    /**
     * Class Works
     */
    final class Works extends DocSection {

        /**
         * Works constructor.
         *
         * @param mysqli $mysqli
         */
        public function __construct($mysqli) {
            parent::__construct($mysqli);
        }

        /**
         * @param int $id
         * @param string $imgName
         */

        private function createWorkItem($id, $imgName) {
            echo "<div data-work-id=\"$id\" class=\"works__item\" style=\"background-image: url('/style/upd-image/works/$imgName')\"></div>";
        }

        public function create() {
            if ($this->executeQuery('SELECT id, thumbs_img_href FROM works LIMIT 12')) {
                $this->stmt->bind_result($id, $imgName);

                while($this->stmt->fetch()) {
                    $this->createWorkItem($id, $imgName);
                }

                $this->stmt->close();
            }
        }
    }