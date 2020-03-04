/**
 * @class Navbar - класс панели навигации
 *
 * @method constructor
 *    @param str parentSelector - Селектор родительского блока для панели навигации, в данном случае это parent
 *    @param str theme - css-класс стилистической темы панели навигации
 *    @param array newElemArr - Массив с элементами навигации
 *
 * @method switchNav() - Запрашивает ширину документа, и исходя из этих данных переключает вид панели навигации
 * @method createNavbar() - Создаёт десктопную версию панели напигации
 * @method createButToNav() - Создаёт кнопку, для активации мобильной версии панели навигации
 * @method launch() - Вызывает методы Navbar'а, с вызова этой функции начинается функционирование данной программы
 *
 * @property array _navElemObj - массив с элементами меню
 *    @example array
 *    [
 *      {
 *        inner_text = 'str',
 *        type = 'str'
 *      }
 *    ]
 *
 * @property int _docSize - Ширина документа
 * @property string _styleTheme - Стиль навигации
 *
 * @property DOM parent - Родительский элемент
 * @property DOM menuBut - Кнопка вызова меню навигации
 * @property DOM obj - Навигация
 */
class Navbar {
  _navElemObj;
  _docSize;
  _styleTheme;

  parent;
  menuBut;
  obj;

  constructor(parentSelector, theme, navElemArr) {
    this.parent = document.querySelector(parentSelector);
    this._navElemObj = navElemArr;
    this._docSize = 0;
    this.menuBut = null;
    this.obj = null;
    this._styleTheme = theme;
  }

  switchNav() {
    this._docSize = document.documentElement.clientWidth;
    if (this._docSize < 901 && this.menuBut === null) {
      this.createButToNav();
    } else if (this._docSize >= 901 && this.obj === null) {
      this.createNavbar();
    }
  }

  createNavbar() {
    let self = this;
    this.obj = document.createElement('nav');
    this.obj.className = `navbar header__navbar ${this._styleTheme}`;

    this._navElemObj.forEach(function (item) {
      let currElem = document.createElement('a');
      currElem.className = 'anchor btn btn_type_flex navbar__item';
      currElem.innerHTML = item.inner_text;

      if (item.type === 'active') {
        currElem.classList.add('navbar__item_active');
      }

      self.obj.append(currElem);
    });

    this.parent.append(this.obj);
  }


  createButToNav() {
    this.menuBut = document.createElement('div');
    this.menuBut.className = 'header__btn-nav btn btn_type_icon';
    this.parent.append(this.menuBut);

    let navMenu = new NavMenu(0.2, 'theme_emerald', 0.13, this._navElemObj);
    let handlerMenuOpen =  navMenu.open.bind(navMenu);

    this.menuBut.addEventListener('click', handlerMenuOpen);
  }

  launch() {
    this.switchNav();

    let switchNavBind = this.switchNav.bind(this);
    window.addEventListener('resize', switchNavBind);
  }
}

/**
 * @function NavItem - Функция-конструктор для создания объектов-элементов навигации
 *
 * @param inner_text - Текст элемента навигации
 * @param type - тип элемента навигации
 */
function NavItem(inner_text, type = 'inactive') {
  this.inner_text = inner_text;
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