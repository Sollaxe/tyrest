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
    document.body.style.overflowY = 'hidden';
    this.container.classList.remove('popup_hide');
    this.container.classList.add('popup_show');
  }

  handlerTimeoutHide() {
    document.body.style.overflowY = 'auto';
    this.container.style.display = 'none';
  }

  hide() {
    this.container.classList.remove('popup_show');
    this.container.classList.add('popup_hide');

    let bindHandler = this.handlerTimeoutHide.bind(this);
    setTimeout(bindHandler, this.animDuration * 1000);
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
    this.navElemDomObjs = [];
    this.exitCrossObj = null;
  }

  createPopup() {
    super.createPopup();
    let self = this;

    this.obj = document.createElement("div");
    this.obj.className = `nav-menu popup__nav-menu ${this.styleTheme}`;

    this.exitCrossObj = document.createElement('div');
    this.exitCrossObj.className = 'nav-menu__exit-cross';
    this.obj.append(this.exitCrossObj);

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
      currItem.style.animationDuration = self.itemAnimDuration + 's';

      if (item.type === 'active') {
        currItem.classList.add('nav-menu__item_active');
      }

      self.navElemDomObjs.push(currItem);
      navList.append(currItem);
    });

    this.obj.append(navList);
    this.container.append(this.obj);
  }

  animNavItems() {
    let self = this;
    let i = 0;

    setTimeout(function () {
      self.navElemDomObjs[i].classList.add('nav-menu__item_show');
      let intervalID = setInterval(function () {
        i++;

        if (i >= self.navElemDomObjs.length) {
          clearInterval(intervalID);
        } else {
          self.navElemDomObjs[i].classList.add('nav-menu__item_show');
        }
      }, (self.itemAnimDuration * 1000) - 50);
    }, this.animDuration * 1000);
  }

  handlerTimeoutHide() {
    super.handlerTimeoutHide();

    this.navElemDomObjs.forEach(function (item) {
      item.classList.remove('nav-menu__item_show');
    })
  }

  show() {
    super.show();
    this.animNavItems();

    let exitBind = this.exit.bind(this);
    this.exitCrossObj.addEventListener('click', exitBind);
  }
}