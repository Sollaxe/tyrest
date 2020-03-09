<?php

    /**
     * Class QuoteSlider
     */
    class QuoteSlider extends DocSection {
        protected $dataArray = [];

        /**
         * QuoteSlider constructor.
         *
         * @param $mysqli
         */
        public function __construct($mysqli) {
            parent::__construct($mysqli);
        }

        public function create() {
            if ($this->executeQuery('SELECT `name`, `post`, `quote`, `about`, `avatar_name` FROM workers')) {
                $this->stmt->bind_result($name, $post, $quote, $about, $img_name);

                while ($this->stmt->fetch()) {
                    $this->dataArray[] = [
                        'name' => $name,
                        'post' => $post,
                        'quote' => $quote,
                        'about' => $about,
                        'img_name' => $img_name
                    ];
                }
            }
        }

        public function createQuotes() {
            $i = 0;

            foreach ($this->dataArray as $item) {
                echo "<div data-num=\"$i\" class=\"quote-slider__switch-item\">
                    <p class=\"quote-slider__quote\">$item[quote]</p>
                    <div class=\"quote-slider__name-block\">
                        <span class=\"quote-slider__name\">$item[name]</span>
                        <span class=\"quote-slider__post\">$item[post]</span>
                    </div>
                </div>";

                $i++;
            }
        }

        public  function createNav() {
            $i = 0;

            foreach ($this->dataArray as $item) {
                echo "<div style=\"background-image: url('/style/upd-image/workers/$item[img_name]')\" data-num=\"$i\" class=\"inf-carousel__item\"></div>";
                $i++;
            }
        }
    }