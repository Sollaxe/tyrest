class Popup {
  constructor(animDuration, theme) {
    this.container = null;
    this.styleTheme = theme;
    this.animDuration = animDuration;
    this.obj = null;
    this.exitCrossObj = null;
  }

  create() {
    this.container = document.createElement('div');
    this.container.className = `popup ${this.styleTheme}`;
    this.container.style.display = 'none';
    this.container.style.animationDuration = this.animDuration + 's';
    document.body.prepend(this.container);
  }

  show() {
    this.container.style.display = 'flex';
    document.body.style.overflowY = 'hidden';
    this.container.classList.remove('popup_hide');
    this.container.classList.add('popup_show');

    let exitBind = this.exit.bind(this);
    this.exitCrossObj.addEventListener('click', exitBind);
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
      this.create();
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
    super(animDuration, theme);
    this.navElemArr = navElemArr;
    this.itemAnimDuration = itemAnimDuration;
    this.navElemDomObjs = [];
  }

  create() {
    super.create();
    let self = this;

    this.obj = document.createElement("div");
    this.obj.className = `nav-menu ${this.styleTheme} popup__widget`;

    this.exitCrossObj = document.createElement('div');
    this.exitCrossObj.className = 'nav-menu__exit-cross icon';
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
  }
}

class Widget extends Popup {
  constructor(animDuration, theme) {
    super(animDuration, theme);
    this.objData = null;
  }

  create(data) {
    super.create();
    this.objData = data;
  }

  changeContent(data) {
    this.objData = data;
  }

  open(data) {
    let self = this;

    let bindShow = this.show.bind(this);
    new Promise(function (resolve, reject) {
      if (data === undefined || data === null) {
        reject(new Error('data is not exist'));
      }

      if (self.container !== null) {
        self.changeContent(data);
        resolve();
      } else {
        self.create(data);
        resolve();
      }
    }).then(
        bindShow,
        error => alert(error)
    );
  }
}

class NotePopup extends Widget {
  constructor(animDuration, theme, widgetType) {
    super(animDuration, theme);

    let whiteList = ['small', 'big'];
    if (!whiteList.includes(widgetType)) {
      throw new ValueNotePopupError('is not valid', 'type');
    }

    this.widgetType = widgetType;
  }

  create(data) {
    super.create(data);

    this.obj = document.createElement('div');
    this.obj.classList = `note-popup note-popup_type_${this.widgetType} popup__widget popup__widget_type_classic`;

    this.exitCrossObj = document.createElement('div');
    this.exitCrossObj.className = 'note-popup__exit-cross icon';
    this.obj.append(this.exitCrossObj);

    let titleContainer = document.createElement('div');
    titleContainer.className = 'note-popup__title-container';

    switch (this.widgetType) {
      case 'small':
        let titleDash = document.createElement('div');
        titleDash.className = 'note-popup__title-dash';
        let title = document.createElement('h3');
        title.className = 'note-popup__title';
        title.innerHTML = this.objData.note_title;

        titleContainer.append(titleDash);
        titleContainer.append(title);
        break;
      case 'big':
        let titleBlock = document.createElement('div');
        titleBlock.className = 'note-popup__title-block';
        let titleText = document.createElement('span');
        titleText.className = 'note-popup__title-block-text';
        titleText.innerHTML = this.objData.note_title;

        titleBlock.append(titleText);
        titleContainer.append(titleBlock);
        break;
    }
    this.obj.append(titleContainer);

    let text = document.createElement('div');
    text.className = 'text-block text-block_theme_emerald note-popup__text';
    text.innerHTML = this.objData.note_text;
    this.obj.append(text);

    this.container.append(this.obj);
  }
}

/*<div class="popup popup_show" style="display: flex">
      <div class="note-popup note-popup_theme_emerald popup__widget popup__widget_type_classic">
          <div class="note-popup__exit-cross icon"></div>
          <div class="note-popup__title-block">
              <div class="note-popup__title-dash"></div>
              <h3 class="note-popup__title">TITLE</h3>
          </div>
          <div class="note-popup__title-container">
                <div class="note-popup__title-block">
                    <span class="note-popup__title-block-text">Help</span>
                </div>
           </div>
          <div class="note-popup__text">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis distinctio esse iste laborum non odio quasi reiciendis? Assumenda autem cumque excepturi, iure odit sunt ut? A doloribus ex necessitatibus <ullam class=""></ullam></p>
              <br>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci aliquam aspernatur atque beatae consequatur delectus error, exercitationem hic ipsa laudantium maxime modi pariatur quos ratione reiciendis repellat sint soluta!</p>
              <br>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias debitis esse id inventore iure mollitia optio, quam qui quia, tenetur velit vitae voluptatibus? Ab corporis dolor est, nam natus ut.</p>
          </div>
      </div>
  </div>
*/

let note = new NotePopup(0.2, 'popup_theme_emerald', 'small');
note.open({
  note_title: 'TITLE',
  note_text:'<div class="text-block__title"><span class="text-block__title-text">OUR STORY</span></div>\n' +
      '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis distinctio esse iste laborum non odio quasi reiciendis? Assumenda autem cumque excepturi, iure odit sunt ut? A doloribus ex necessitatibus <ullam class=""></ullam></p>\n' +
      '<div class="text-block__title"><span class="text-block__title-text">OUR STORY</span></div>\n' +
      '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci aliquam aspernatur atque beatae consequatur delectus error, exercitationem hic ipsa laudantium maxime modi pariatur quos ratione reiciendis repellat sint soluta!</p>\n' +
      '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias debitis esse id inventore iure mollitia optio, quam qui quia, tenetur velit vitae voluptatibus? Ab corporis dolor est, nam natus ut.</p>'
});