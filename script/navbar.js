/**
 * @class Navbar - класс панели навигации
 *
 * @method switchNav() - Запрашивает ширину документа, и исходя из этих данных переключает вид панели навигации
 * @method getDocumentSize() - Возвращает ширину документа
 *    @return int - ширина объекта
 * @method createNavbar() - Создаёт десктопную версию панели напигации
 * @method createButToNav() - Создаёт кнопку, для активации мобильной версии панели навигации
 * @method launch() - Вызывает методы Navbar'а, с вызова этой функции начинается функционирование данной программы
 *
 * @param str parentSelector - Селектор родительского блока для панели навигации, в данном случае это parent
 * @param str theme - css-класс стилистической темы панели навигации
 * @param array newElemArr - Массив с элементами навигации
 */
class Navbar {
  constructor(parentSelector, theme, navElemArr) {
    this.parent = document.querySelector(parentSelector);
    this.navElemObj = navElemArr;
    this.docSize = 0;
    this.butToNav = null;
    this.navbar = null;
    this.objTheme = theme;
  }

  switchNav() {
    this.docSize = this.getDocumentSize();
    if (this.docSize < 901 && this.butToNav === null) {
      this.createButToNav();
    } else if (this.docSize >= 901 && this.navbar === null) {
      this.createNavbar();
    }
  }

  getDocumentSize() {
    return document.documentElement.clientWidth;
  }

  createNavbar() {
    let self = this;
    this.navbar = document.createElement('nav');
    this.navbar.className = `navbar header__navbar ${this.objTheme}`;

    this.navElemObj.forEach(function (item) {
      let currElem = document.createElement('a');
      currElem.className = 'anchor btn btn_type_flex navbar__item';
      currElem.innerHTML = item.innerText;

      if (item.type === 'active') {
        currElem.classList.add('navbar__item_active');
      }

      self.navbar.append(currElem);
    });

    this.parent.append(this.navbar);
  }


  createButToNav() {
    this.butToNav = document.createElement('div');
    this.butToNav.className = 'header__btn-nav btn btn_type_icon';
    this.parent.append(this.butToNav);

    let navMenu = new NavMenu(0.2, 'popup_theme_emerald', 0.13, this.navElemObj);
    let handlerMenuOpen =  navMenu.open.bind(navMenu);

    this.butToNav.addEventListener('click', handlerMenuOpen);
  }

  launch() {
    this.switchNav();

    let switchNavBind = this.switchNav.bind(this);
    window.addEventListener('resize', switchNavBind);
  }
}

/**
 *
 * @param innerText - Текст элемента навигации
 * @param type - тип элемента навигации
 * @constructor
 */
function NavItem(innerText, type = 'inactive') {
  this.innerText = innerText;
  this.type = type;
}


let navbar = new Navbar('.header__top', 'navbar_theme_emerald', [
  new NavItem('HOME', 'active'),
  new NavItem('ABOUT'),
  new NavItem('EXPERTISE'),
  new NavItem('TEAMS'),
  new NavItem('WORKS'),
  new NavItem('PEOPLE SAY'),
  new NavItem('CONTACT'),
]);

navbar.launch();