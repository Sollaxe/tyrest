
class Navbar {
  constructor(headSelector, theme, navElemArr) {
    this.head = document.querySelector(headSelector);
    this.navElemObj = navElemArr;
    this.docSize = 0;
    this.butToNav = null;
    this.navbar = null;
    this.objTheme = theme;
  }

  checkSize() {
    this.docSize = this.getDocumentSize();
    if (this.docSize < 901 && this.butToNav === null) {
      this.createButToNav();
    } else if (this.docSize >=901 && this.navbar === null) {
      this.createNavbar();
    }
  }

  getDocumentSize() {
    return document.documentElement.clientWidth;
  }

  createNavbar() {
    let self = this;
    this.navbar = document.createElement('nav');
    this.navbar.className = 'navbar header__navbar';

    let themeStyle;
    switch (this.objTheme) {
      case 'emerald':
        themeStyle = 'navbar_theme_emerald';
        break;
    }

    this.navbar.classList.add(themeStyle);

    this.navElemObj.forEach(function (item) {
      let currElem = document.createElement('a');
      currElem.className = 'anchor btn btn_type_flex navbar__item';
      currElem.innerHTML = item.innerText;

      if (item.type === 'active') {
        currElem.classList.add('navbar__item_active');
      }

      self.navbar.append(currElem);
    });

    this.head.append(this.navbar);
  }


  createButToNav() {
    this.butToNav = document.createElement('div');
    this.butToNav.className = 'header__btn-nav btn btn_type_icon';
    this.head.append(this.butToNav);
  }

  launch() {
    let self = this;
    this.docSize = this.getDocumentSize();

    if (this.docSize < 901) {
      this.createButToNav();
    } else {
      this.createNavbar();
    }

    window.addEventListener('resize', function () {
      self.checkSize();
    });
  }
}

nav = new Navbar('.header__top', 'emerald', [
  {
    type: 'active',
    innerText: 'HOME',
  },
  {
    type: 'inactive',
    innerText: 'ABOUT',
  },
  {
    type: 'inactive',
    innerText: 'EXPERTISE',
  },
  {
    type: 'inactive',
    innerText: 'TEAMS',
  },
  {
    type: 'inactive',
    innerText: 'WORKS',
  },
  {
    type: 'inactive',
    innerText: 'PEOPLE SAY',
  },
  {
    type: 'inactive',
    innerText: 'CONTACT',
  },
]);

/*<a class="anchor btn btn_type_flex navbar__item">EXPERTISE</a>
    <a class="anchor btn btn_type_flex navbar__item">TEAMS</a>
    <a class="anchor btn btn_type_flex navbar__item">WORKS</a>
    <a class="anchor btn btn_type_flex navbar__item">PEOPLE SAY</a>
<a class="anchor btn btn_type_flex navbar__item">CONTACT</a>*/

nav.launch();