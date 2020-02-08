<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>tyrest</title>

    <link rel="stylesheet" href="/style/fonts/font-css.css">
    <link rel="stylesheet" href="/style/main.css">

    <link rel="stylesheet" href="/style/builds/index.build/initial-build.css">
    <link rel="stylesheet" href="/style/builds/index.build/desktop.css" media="only screen and (min-width: 901px)">
    <link rel="stylesheet" href="/style/builds/index.build/tablet.css" media="only screen and (min-width: 451px) and (max-width: 900px)">
    <link rel="stylesheet" href="/style/builds/index.build/mobile.css" media="only screen and (max-width: 450px)">
</head>
<body class="body">
    <script src="/script/scrollComputer.js" type="text/javascript"></script>
    <script type="text/javascript">
        let scrollComputer = new ScrollComputer('.body__section');
        scrollComputer.computeScroll();
    </script>

 <!--   <div class="popup popup_show" style="display: flex">
        <div class="nav-menu popup__nav-menu nav-menu_theme_emerald">
            <h3 class="nav-menu__head">MENU</h3>
            <div class="nav-menu__separator"></div>
            <nav class="nav-menu__list">
                <div class="nav-menu__item">HOME</div>
                <div class="nav-menu__item nav-menu__item_active">ABOUT</div>
                <div class="nav-menu__item">EXPERTISE</div>
            </nav>
        </div>
    </div>-->

    <script src="/script/popup.js" type="text/javascript"></script>

    <header class="header header_theme_emerald body__section">
        <div class="header__wrap page-wrapper">
            <div class="header__top">
                <div class="logo-block logo-block_theme_emerald header__logo">
                    <img class="logo-block__logo header__logo-img" src="/style/style-image/border-logo.png" alt="logo">
                    <span class="logo-block__brand header__brand text">tyrest</span>
                </div>
                <!--<nav class="navbar navbar_theme_emerald header__navbar">
                    <a class="anchor btn btn_type_flex navbar__item navbar__item_active">HOME</a>
                    <a class="anchor btn btn_type_flex navbar__item">ABOUT</a>
                    <a class="anchor btn btn_type_flex navbar__item">EXPERTISE</a>
                    <a class="anchor btn btn_type_flex navbar__item">TEAMS</a>
                    <a class="anchor btn btn_type_flex navbar__item">WORKS</a>
                    <a class="anchor btn btn_type_flex navbar__item">PEOPLE SAY</a>
                    <a class="anchor btn btn_type_flex navbar__item">CONTACT</a>
                </nav>
                <div class="header__btn-nav btn btn_type_icon"></div>-->
            </div>
            <div class="slider slider_theme_emerald header__slider">
                <div class="slider__content">
                    <div class="slider__title-container">
                        <span class="slider__title">Lorem ipsum dolor sit.</span>
                    </div>
                    <div class="slider__separator"></div>
                    <div class="slider__text-container">
                        <p class="slider__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam atque, blanditiis deleniti doloremque eius enim in molestiae nemo neque nobis, numquam omnis optio pariatur porro repellat sed soluta. Consequatur deleniti dolore officia. Assumenda eius facere in, laborum non quisquam voluptatibus.</p>
                    </div>
                    <div class="btn btn_type_classic btn_theme_classic-emerald slider__btn-more">
                        <span class="btn__text">LEARN MORE</span>
                    </div>
                </div>
                <div class="slider__nav">
                    <div class="slider__nav-item slider__nav-item_active"></div>
                    <div class="slider__nav-item"></div>
                    <div class="slider__nav-item"></div>
                    <div class="slider__nav-item"></div>
                </div>
            </div>
        </div>
    </header>
    <script src="/script/navbar.js" type="text/javascript"></script>

    <section class="about about_theme_white-emerald body__section">
        <div class="page-wrapper about__wrap">
            <div class="about__image-block">
                <div class="about__image"></div>
            </div>
            <div class="about__content-block">
                <div class="section-title section-title_theme_classic about__section-title">
                    <h2 class="section-title__name about__section-name">OUR STORY</h2>
                </div>
                <div class="about__text">
                    <p>This is Photoshop's version  of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus</p>
                    <br>
                    <p>Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                </div>
                <div class="btn btn_type_classic btn_theme_classic-emerald about__btn-more">
                    <span class="btn__text">Learn More</span>
                </div>
            </div>
        </div>
    </section>

    <section class="about-video about-video_theme_emrald body__section">
        <div class="page-wrapper about-video__wrap">
            <div class="about-video__play-block">
                <div class="btn btn_type_icon about-video__btn-play"></div>
                <div class="about-video__hint-btn">
                    <span>WATCH OUR STORY</span>
                </div>
            </div>
        </div>
    </section>

    <section class="expertise expertise_theme_white-emerald body__section">
        <div class="page-wrapper expertise__wrap">
            <div class="section-title section-title_theme_extend">
                <h2 class="section-title__name">EXPERTISE</h2>
                <span class="section-title__hint">Lorem ipsum dolor sit amet.</span>
                <div class="section-title__separator"></div>
            </div>
            <div class="expertise__content">
                <div class="expertise__item">
                    <div class="icon expertise__item-icon" style="background-image: url('/style/style-image/icon/comp-icon.png')"></div>
                    <h3 class="expertise__item-name">WEB DESIGN & DEVELOPMENT</h3>
                    <p class="expertise__item-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem dolor explicabo id impedit maxime pariatur reiciendis saepe veritatis vero?</p>
                </div>
                <div class="expertise__item">
                    <div class="icon expertise__item-icon" style="background-image: url('/style/style-image/icon/tassel-icon.png')"></div>
                    <h3 class="expertise__item-name">BRANDING IDENTITY</h3>
                    <p class="expertise__item-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem dolor explicabo id impedit maxime pariatur reiciendis saepe veritatis vero?</p>
                </div>
                <div class="expertise__item">
                    <div class="icon expertise__item-icon" style="background-image: url('/style/style-image/icon/phone-icon.png')"></div>
                    <h3 class="expertise__item-name">MOBILE APP</h3>
                    <p class="expertise__item-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem dolor explicabo id impedit maxime pariatur reiciendis saepe veritatis vero?</p>
                </div>
                <div class="expertise__item">
                    <div class="icon expertise__item-icon" style="background-image: url('/style/style-image/icon/diagramm-icon.png')"></div>
                    <h3 class="expertise__item-name">SEARCH ENGINE OPTIMISATION</h3>
                    <p class="expertise__item-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem dolor explicabo id impedit maxime pariatur reiciendis saepe veritatis vero?</p>
                </div>
                <div class="expertise__item">
                    <div class="icon expertise__item-icon" style="background-image: url('/style/style-image/icon/psp-icon.png')"></div>
                    <h3 class="expertise__item-name">GAME DEVELOPMENT</h3>
                    <p class="expertise__item-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem dolor explicabo id impedit maxime pariatur reiciendis saepe veritatis vero?</p>
                </div>
                <div class="expertise__item"><div class="icon expertise__item-icon" style="background-image: url('/style/style-image/icon/heart-icon.png')"></div>
                    <h3 class="expertise__item-name">MADE WITH LOVE</h3>
                    <p class="expertise__item-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem dolor explicabo id impedit maxime pariatur reiciendis saepe veritatis vero?</p></div>
            </div>
        </div>
    </section>

    <section class="team team_theme_emerald body__section">
        <div class="page-wrapper team__wrap-top">
            <div class="section-title section-title_theme_extend-white">
                <h2 class="section-title__name">MEET OUR AMAZING TEAM</h2>
                <span class="section-title__hint">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                <div class="section-title__separator"></div>
            </div>
        </div>

        <div class="team__list">
            <div class="worker-tile worker-tile_theme_white team__list-item">
                <div class="worker-tile__image" style="background-image: url('/style/style-image/worker.png')"></div>
                <div class="worker-tile__info-block">
                    <div class="worker-tile__name">ADAM AJAX</div>
                    <div class="worker-tile__post">DESIGNER</div>
                </div>
            </div>
            <div class="worker-tile worker-tile_theme_white team__list-item">
                <div class="worker-tile__image" style="background-image: url('/style/style-image/worker.png')"></div>
                <div class="worker-tile__info-block">
                    <div class="worker-tile__name">ADAM AJAX</div>
                    <div class="worker-tile__post">DESIGNER</div>
                </div>
            </div>
            <div class="worker-tile worker-tile_theme_white team__list-item">
                <div class="worker-tile__image" style="background-image: url('/style/style-image/worker.png')"></div>
                <div class="worker-tile__info-block">
                    <div class="worker-tile__name">ADAM AJAX</div>
                    <div class="worker-tile__post">DESIGNER</div>
                </div>
            </div>
            <div class="worker-tile worker-tile_theme_white team__list-item">
                <div class="worker-tile__image" style="background-image: url('/style/style-image/worker.png')"></div>
                <div class="worker-tile__info-block">
                    <div class="worker-tile__name">ADAM AJAX</div>
                    <div class="worker-tile__post">DESIGNER</div>
                </div>
            </div>
            <div class="worker-tile worker-tile_theme_white team__list-item">
                <div class="worker-tile__image" style="background-image: url('/style/style-image/worker.png')"></div>
                <div class="worker-tile__info-block">
                    <div class="worker-tile__name">ADAM AJAX</div>
                    <div class="worker-tile__post">DESIGNER</div>
                </div>
            </div>
            <div class="worker-tile worker-tile_theme_white team__list-item">
                <div class="worker-tile__image" style="background-image: url('/style/style-image/worker.png')"></div>
                <div class="worker-tile__info-block">
                    <div class="worker-tile__name">ADAM AJAX</div>
                    <div class="worker-tile__post">DESIGNER</div>
                </div>
            </div>
            <div class="worker-tile worker-tile_theme_white team__list-item">
                <div class="worker-tile__image" style="background-image: url('/style/style-image/worker.png')"></div>
                <div class="worker-tile__info-block">
                    <div class="worker-tile__name">ADAM AJAX</div>
                    <div class="worker-tile__post">DESIGNER</div>
                </div>
            </div>
            <div class="worker-tile worker-tile_theme_white team__list-item">
                <div class="worker-tile__image" style="background-image: url('/style/style-image/worker.png')"></div>
                <div class="worker-tile__info-block">
                    <div class="worker-tile__name">ADAM AJAX</div>
                    <div class="worker-tile__post">DESIGNER</div>
                </div>
            </div>
        </div>

        <div class="page-wrapper team__wrap-bottom">
            <span class="team__btn-hint">Become part of our dream team, let’s join us!</span>
            <div class="btn btn_type_classic btn_theme_classic-emerald">
                <span class="btn__text">WE ARE HIRING</span>
            </div>
        </div>
    </section>

    <section class="works body__section">
        <div class="page-wrapper works__wrap-top">
            <div class="section-title section-title_theme_classic">
                <h2 class="section-title__name">OUR WORKS</h2>
            </div>
            <a class="works__repos-link anchor anchor_type_arrow anchor_theme_d-purple anchor_size_m">
                <span class="anchor__text">See All Project in dribbble</span>
                <div class="anchor__arrow"></div>
            </a>
        </div>

        <div class="works__list">
            <div class="works__item" style="background-image: url('/style/style-image/maket-1.png')"></div>
            <div class="works__item" style="background-image: url('/style/style-image/background-image.png')"></div>
            <div class="works__item" style="background-image: url('/style/style-image/worker.png')"></div>
            <div class="works__item" style="background-image: url('/style/style-image/worker.png')"></div>
            <div class="works__item" style="background-image: url('/style/style-image/maket-1.png')"></div>
            <div class="works__item" style="background-image: url('/style/style-image/worker.png')"></div>
            <div class="works__item" style="background-image: url('/style/style-image/background-image.png')"></div>
            <div class="works__item" style="background-image: url('/style/style-image/worker.png')"></div>
            <div class="works__item" style="background-image: url('/style/style-image/maket-1.png')"></div>
            <div class="works__item" style="background-image: url('/style/style-image/worker.png')"></div>
            <div class="works__item" style="background-image: url('/style/style-image/worker.png')"></div>
            <div class="works__item" style="background-image: url('/style/style-image/background-image.png')"></div>
        </div>

        <div class="page-wrapper works__wrap-bottom">
            <div class="btn btn_type_classic btn_theme_classic-emerald">
                <span class="btn__text">LOAD MORE</span>
            </div>
        </div>
    </section>

    <section class="worker-rev worker-rev_theme_emerald body__section">
        <div class="page-wrapper worker-rev__wrap">
            <div class="worker-rev__quotes-img icon"></div>
            <div class="quote-slider worker-rev__quote-slider quote-slider_theme_white">
                <div class="quote-slider__switch-block">
                    <div class="quote-slider__switch-item">
                        <p class="quote-slider__quote">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium autem beatae consectetur consequuntur dolores dolorum eius eligendi esse eum ex excepturi facere fuga hic id illum incidunt mollitia nam, natus necessitatibus non obcaecati officia perspiciatis quae, quam ratione, ullam veritatis vitae voluptate voluptatem! Aliquam inventore itaque minus porro saepe?</p>
                        <div class="quote-slider__name-block">
                            <span class="quote-slider__name">JANE GALADRIEN</span>
                            <span class="quote-slider__post">CEO MANAGER</span>
                        </div>
                    </div>
                </div>
                <div class="quote-slider__nav">
                    <div class="quote-slider__nav-arrow quote-slider__nav-arrow_left btn btn_type_icon"></div>
                    <div class="quote-slider__nav-list">
                        <div class="quote-slider__nav-list-container">
                            <div class="quote-slider__nav-item"></div>
                            <div class="quote-slider__nav-item"></div>
                            <div class="quote-slider__nav-item quote-slider__nav-item_active"></div>
                            <div class="quote-slider__nav-item"></div>
                            <div class="quote-slider__nav-item"></div>
                            <div class="quote-slider__nav-item"></div>
                            <div class="quote-slider__nav-item"></div>
                            <div class="quote-slider__nav-item"></div>
                            <div class="quote-slider__nav-item"></div>
                            <div class="quote-slider__nav-item"></div>
                            <div class="quote-slider__nav-item"></div>
                        </div>
                    </div>
                    <div class="quote-slider__nav-arrow quote-slider__nav-arrow_right btn btn_type_icon"></div>
                </div>
            </div>
        </div>
    </section>

    <section class="contact contact_theme_emerald body__section">
        <div class="page-wrapper contact__wrap">
            <div class="contact__user-mess-block">
                <div class="section-title section-title_theme_classic">
                    <h3 class="section-title__name">GIVE US A GOOD NEWS</h3>
                </div>
                <form action="/" class="contact__form" method="post">
                    <label class="contact__label"><input name="name" type="text"
                                                         class="contact__name-input contact__input" placeholder="Name"></label>
                    <label class="contact__label"><input name="email" type="email"
                                                         class="contact__email-input contact__input"
                                                         placeholder="Email"></label>
                    <label class="contact__label"><input name="mess-subj" type="text"
                                                         class="contact__subject-input contact__input"
                                                         placeholder="Subject"></label>
                    <label class="contact__label"><textarea name="mess" class="contact__message-input contact__input"
                                                            placeholder="Your Message"></textarea></label>
                    <input type="submit" class="btn btn_type_classic btn_theme_classic-emerald contact__submit-input"
                           value="SUBMIT" onclick="event.preventDefault()">
                </form>
            </div>
            <div class="contact__client-col">
                <div class="section-title section-title_theme_classic">
                    <h3 class="section-title__name">OUR HAPPY CLIENT</h3>
                </div>
                <div class="contact__client-list">
                    <a class="contact__client-item icon anchor anchor_type_icon"
                       style="background-image: url('/style/style-image/icon/company/company-logo-1.png') "></a>
                    <a class="contact__client-item icon anchor anchor_type_icon"
                       style="background-image: url('/style/style-image/icon/company/company-logo-2.png') "></a>
                    <a class="contact__client-item icon anchor anchor_type_icon"
                       style="background-image: url('/style/style-image/icon/company/company-logo-3.png') "></a>
                    <a class="contact__client-item icon anchor anchor_type_icon"
                       style="background-image: url('/style/style-image/icon/company/company-logo-4.png') "></a>
                    <a class="contact__client-item icon anchor anchor_type_icon"
                       style="background-image: url('/style/style-image/icon/company/company-logo-5.png') "></a>
                    <a class="contact__client-item icon anchor anchor_type_icon"
                       style="background-image: url('/style/style-image/icon/company/company-logo-6.png') "></a>
                    <a class="contact__client-item icon anchor anchor_type_icon"
                       style="background-image: url('/style/style-image/icon/company/company-logo-7.png') "></a>
                    <a class="contact__client-item icon anchor anchor_type_icon"
                       style="background-image: url('/style/style-image/icon/company/company-logo-8.png') "></a>
                    <a class="contact__client-item icon anchor anchor_type_icon"
                       style="background-image: url('/style/style-image/icon/company/company-logo-9.png') "></a>
                    <a class="contact__client-item icon anchor anchor_type_icon"
                       style="background-image: url('/style/style-image/icon/company/company-logo-10.png') "></a>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer footer_theme_emerald body__section">
        <div class="page-wrapper footer__wrap">
            <div class="footer__top-section">
                <div class="footer__brand-block">
                    <div class="logo-block logo-block_theme_emerald footer__logo">
                        <img class="logo-block__logo footer__logo-img" src="/style/style-image/border-logo.png"
                             alt="logo">
                        <span class="logo-block__brand footer__brand">tyrest</span>
                    </div>
                    <p class="footer__about-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
                        dignissimos explicabo magnam nobis obcaecati perspiciatis reprehenderit rerum voluptas. Alias
                        aliquid amet asperiores consectetur</p>
                </div>
                <div class="footer__location-block">
                    <div class="section-title section-title_theme_small-white footer__section-title">
                        <h4 class="section-title__name">OUR STUDIO</h4>
                    </div>
                    <div class="icon-text icon-text_theme_white footer__location-text">
                        <p class="icon-text__item icon-text__item_icon_location">Ruko cucruk, Jl. Radio luar dalem jos
                            <br>No.12 - 13, Kalideres - Jakarta Barat <br>11480 - Indonesia</p>
                        <p class="icon-text__item icon-text__item_icon_handset">(+62) 21-2224 3333</p>
                    </div>
                </div>
                <div class="footer__share-block">
                    <div class="section-title section-title_theme_small-white footer__section-title">
                        <h4 class="section-title__name">STAY IN TOUCH</h4>
                    </div>
                    <div class="footer__share-block-wrap">
                        <form class="footer__mailing">
                            <label for="mailing-input" style="display: none"></label>
                            <input id="mailing-input" type="email" class="footer__mailing-input"
                                   placeholder="Subscribe our newsletter">
                            <input type="submit" class="footer__mailing-submit" value="" onclick="event.preventDefault()">
                        </form>
                        <div class="social-share social-share_theme_white">
                            <div class="social-share__item">
                                <div class="social-share__icon"
                                     style="background-image: url('/style/style-image/icon/social-net/facebook-icon.png')">
                                </div>
                            </div>
                            <div class="social-share__item">
                                <div class="social-share__icon"
                                     style="background-image: url('/style/style-image/icon/social-net/dribbble-icon.png')">
                                </div>
                            </div>
                            <div class="social-share__item">
                                <div class="social-share__icon"
                                     style="background-image: url('/style/style-image/icon/social-net/google-icon.png')">
                                </div>
                            </div>
                            <div class="social-share__item">
                                <div class="social-share__icon"
                                     style="background-image: url('/style/style-image/icon/social-net/instagram-icon.png')">
                                </div>
                            </div>
                            <div class="social-share__item">
                                <div class="social-share__icon"
                                     style="background-image: url('/style/style-image/icon/social-net/twitter-icon.png')">
                                </div>
                            </div>
                            <div class="social-share__item">
                                <div class="social-share__icon"
                                     style="background-image: url('/style/style-image/icon/social-net/youtube-icon.png')">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="footer__bottom-section">
                <div class="footer__nav">
                    <span class="footer__nav-item">HELP</span>
                    <span class="footer__nav-item">TERM & CONDITION</span>
                    <span class="footer__nav-item">PRIVACY</span>
                </div>
                <div class="footer__copyright-block">
                    <span class="footer__copyright">Copyright © 2015 - Tyrest Creative</span>
                </div>
            </div>
        </div>
    </footer>

</body>
</html>