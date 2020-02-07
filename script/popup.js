class Popup {
  constructor(animDuration) {
    this.container = null;
    this.animDuration = animDuration;
  }

  createPopup() {
    this.container = document.createElement('div');
    this.container.className = 'popup';
    this.container.style.display = 'none';
    this.container.style.animationDuration = this.animDuration + 's';
    document.body.prepend(this.container);
  }

  show() {
    this.container.style.display = 'flex';
    document.body.overflowY = 'hidden';
    this.container.classList.remove('popup_hide');
    this.container.classList.add('popup_show');
  }

  hide() {
    let self = this;
    this.container.classList.remove('popup_show');
    this.container.classList.add('popup_hide');

    setTimeout(function() {
      document.body.overflowY = 'auto';
      self.container.style.display = 'none';
    }, this.animDuration * 1000);
  }

  open() {
    if (this.container !== null) {
      this.show();
    } else {
      this.createPopup();
      this.show();
    }
  }

  exit() {
    if (this.container !== null) {
      this.hide();
    }
  }
}

class NavMenu extends Popup {
  constructor(animDuration, theme, itemAnimDuration, navElemArr) {
    super(animDuration);
    this.styleTheme = theme;
    this.navElemArr = navElemArr;
    this.itemAnimDuration = itemAnimDuration;
    this.obj = null;
  }

  createPopup() {
    super.createPopup();

    this.obj = document.createElement("div");
    this.obj.className = `nav-menu popup__nav-menu ${this.styleTheme}`;

    let navHead = document.createElement('h3');
    navHead.className = 'nav-menu__head';
    navHead.innerHTML = 'MENU';
    this.obj.append(navHead);

    let navSeparator = document.createElement('div');
    navSeparator.className = 'nav-menu__separator';
    this.obj.append(navSeparator);

    let navList = document.createElement('nav');
    navList.className = 'nav-menu__list';

    this.navElemArr.forEach(function (item) {
      let currItem = document.createElement('div');
      currItem.className = 'nav-menu__item';
      currItem.innerHTML = item.innerText;

      if (item.type === 'active') {
        currItem.classList.add('nav-menu__item_active');
      }

      navList.append(currItem);
    });

    this.obj.append(navList);
    this.container.append(this.obj);
  }
}
