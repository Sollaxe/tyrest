<?php

    /**
     * Class HeadSlider
     */
    class HeadSlider extends DocSection {
        protected $dataArray = [];

        /**
         * HeadSlider constructor.
         *
         * @param $mysqli
         */
        public function __construct($mysqli) {
            parent::__construct($mysqli);
        }

        public function create() {
            if ($this->executeQuery('SELECT title, text FROM head_slider')) {
                $this->stmt->bind_result($title, $text);

                while ($this->stmt->fetch()) {
                    $this->dataArray[] = [
                        'title' => $title,
                        'text' => $text,
                    ];
                }
            }
        }

        public function createTitle() {
            $i = 0;

            foreach ($this->dataArray as $item) {
                echo "<p data-num=\"$i\" class=\"head-slider__title-block\">$item[title]</p>";

                $i++;
            }
        }

        public function createText() {
            $i = 0;

            foreach ($this->dataArray as $item) {
                echo "<p data-num=\"$i\" class=\"head-slider__text\">$item[text]</p>";

                $i++;
            }
        }

        public  function createNav() {
            for ($i = 0; $i < count($this->dataArray); $i++) {
                echo "<div data-num=\"$i\" class=\"head-slider__nav-item\"></div>";
            }
        }
    }