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
            if ($this->executeQuery('SELECT id, title, text FROM head_slider')) {
                $this->stmt->bind_result($id,$title, $text);

                while ($this->stmt->fetch()) {
                    $this->dataArray[] = [
                        'id' => $id,
                        'title' => $title,
                        'text' => $text,
                    ];
                }
            }
        }

        public function createTitle() {
            $i = 0;

            foreach ($this->dataArray as $item) {
                echo "<p data-id='$item[id]' data-num=\"$i\" class=\"head-slider__title-block\">$item[title]</p>";

                $i++;
            }
        }

        public function createText() {
            $i = 0;

            foreach ($this->dataArray as $item) {
                echo "<div data-id='$item[id]' data-num=\"$i\" class=\"head-slider__text text-block theme_white font-p_roboto-thin\">
                            $item[text]
                      </div>";

                $i++;
            }
        }

        public  function createNav() {
            for ($i = 0; $i < count($this->dataArray); $i++) {
                echo "<div data-num=\"$i\" class=\"head-slider__nav-item\"></div>";
            }
        }
    }