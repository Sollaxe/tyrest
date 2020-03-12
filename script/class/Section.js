
//TODO: Вместо затычек написать запросы к серверу
class Section {
  obj;

  _cssClass;

  constructor(cssClassName) {
    this._cssClass = cssClassName;
    this.obj = document.querySelector(`.${this._cssClass}`);
  }

  //abstract
  setHandlers() {
  }
}


class AboutSection extends Section {
  _btnMore;
  _notePopup;

  constructor(cssClassName) {
    super(cssClassName);
    this._btnMore = this.obj.querySelector(`.${this._cssClass}__btn-more`);
    this._notePopup = new NotePopup(0.2, 'theme_emerald', 'big');

    this._btnMore.addEventListener('click', this.btnHandler.bind(this));
  }

  btnHandler() {
    if (this._notePopup === undefined) {
      this._notePopup = new NotePopup(0.2, 'theme_emerald', 'small');
    }

    this._notePopup.open({
      note_title: 'TITLE',
      note_text:'<div class="text-block__title"><span class="text-block__title-text">OUR STORY</span></div>\n' +
          '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis distinctio esse iste laborum non odio quasi reiciendis? Assumenda autem cumque excepturi, iure odit sunt ut? A doloribus ex necessitatibus <ullam class=""></ullam></p>\n' +
          '<div class="text-block__title"><span class="text-block__title-text">OUR STORY</span></div>\n' +
          '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci aliquam aspernatur atque beatae consequatur delectus error, exercitationem hic ipsa laudantium maxime modi pariatur quos ratione reiciendis repellat sint soluta!</p>\n' +
          '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias debitis esse id inventore iure mollitia optio, quam qui quia, tenetur velit vitae voluptatibus? Ab corporis dolor est, nam natus ut.</p>'
    });
  }
}

class TeamSection extends Section {
  _btnHiring;
  _personPopup;
  _notePopup;
  _items;

  constructor(cssClassName) {
    super(cssClassName);
    this._items = this.obj.querySelectorAll(`.${this._cssClass}__list-item`);
    this._btnHiring = this.obj.querySelector(`.${this._cssClass}__btn-hiring`);

    this._btnHiring.addEventListener('click', this.btnHandler.bind(this));

    for (let i = 0; i < this._items.length; i++) {
      this._items[i].addEventListener('click', this.itemHandler.bind(this));
    }
  }

  btnHandler() {
    if (this._notePopup === undefined) {
      this._notePopup = new NotePopup(0.2, 'theme_emerald', 'small');
    }

    this._notePopup.open({
      note_title: 'HIRING',
      note_text:'<div class="text-block__title"><span class="text-block__title-text">OUR STORY</span></div>\n' +
          '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis distinctio esse iste laborum non odio quasi reiciendis? Assumenda autem cumque excepturi, iure odit sunt ut? A doloribus ex necessitatibus <ullam class=""></ullam></p>\n' +
          '<div class="text-block__title"><span class="text-block__title-text">OUR STORY</span></div>\n' +
          '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci aliquam aspernatur atque beatae consequatur delectus error, exercitationem hic ipsa laudantium maxime modi pariatur quos ratione reiciendis repellat sint soluta!</p>\n' +
          '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias debitis esse id inventore iure mollitia optio, quam qui quia, tenetur velit vitae voluptatibus? Ab corporis dolor est, nam natus ut.</p>'
    });
  }

  itemHandler() {
    if (this._personPopup === undefined) {
      this._personPopup = new PersonPopup(0.2, 'theme_emerald');
    }

    this._personPopup.open({
      img_name: 'adam_ajax.png',
      worker_name: 'Adam Ajax',
      worker_post: 'Ceo & Managment',
      worker_about: '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto culpa dolore ex facere incidunt iusto nam odit quasi quos ut. Distinctio enim et nostrum nulla quos ratione temporibus voluptas voluptate!</p>\n' +
          '          <p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A beatae dicta, eaque earum libero magnam omnis quae quisquam quo voluptas.</p>\n' +
          '          <p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate doloremque facere fuga labore repudiandae.</p>'
    });
  }
}

class WorkSection extends Section {
  _btnMore;
  _projectPopup;
  _worksPopup;
  _items;

  constructor(cssClassName) {
    super(cssClassName);
    this._items = this.obj.querySelectorAll(`.${this._cssClass}__item`);
    this._btnMore = this.obj.querySelector(`.${this._cssClass}__btn-more`);

    this._btnMore.addEventListener('click', this.btnHandler.bind(this));

    for (let i = 0; i < this._items.length; i++) {
      this._items[i].addEventListener('click', this.itemHandler.bind(this));
    }
  }

  btnHandler() {
    if (this._worksPopup === undefined) {
      this._worksPopup = new WorkListPopup(0.2, 'theme_emerald');
    }

    this._worksPopup.open({
      page: 1,
      work_arr: [
        {
          img_name: 'maket-1.png',
          work_name: 'headSlider work',
          work_desc: 'headSlider desc',
          work_id: 1
        }
      ]
    });
  }

  itemHandler() {
    if (this._projectPopup === undefined) {
      this._projectPopup = new ProjectPopup(0.2, 'theme_emerald');
    }

    this._projectPopup.open({
      project_name: 'PROJECT',
      about_text: '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab\n' +
          '            culpa debitis dolores enim eveniet expedita ipsa, ipsum, itaque laborum laudantium minima\n' +
          '            nostrum numquam odit perferendis praesentium quae qui ratione veritatis vero! A dolores eos\n' +
          '            illum iusto laborum tenetur? Nihil?</p>\n' +
          '        <p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab\n' +
          '            culpa debitis dolores enim eveniet expedita ipsa, ipsum, itaque laborum laudantium minima\n' +
          '            nostrum numquam odit perferendis praesentium quae qui ratione veritatis vero! A dolores eos\n' +
          '            illum iusto laborum tenetur? Nihil?</p>\n' +
          '        <p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab\n' +
          '            culpa debitis dolores enim eveniet expedita ipsa, ipsum, itaque laborum laudantium minima\n' +
          '            nostrum numquam odit perferendis praesentium quae qui ratione veritatis vero! A dolores eos\n' +
          '            illum iusto laborum tenetur? Nihil?</p>',
      work_link: '#',
      carousel_item: [
        {
          img_name: 'maket-1.png'
        },
        {
          img_name: 'maket-2.png'
        },
        {
          img_name: 'maket-1.png'
        }
      ],
      worker_items: [
        {
          id: 1,
          img_name: 'adam_ajax.png',
          name: 'Adam Ajax',
          post: 'Adam Ajax'
        },
        {
          id: 1,
          img_name: 'adam_ajax.png',
          name: 'Adam Ajax',
          post: 'Adam Ajax'
        },
        {
          id: 1,
          img_name: 'adam_ajax.png',
          name: 'Adam Ajax',
          post: 'Adam Ajax'
        }
      ],
      share_items: [
        {
          icon_name: 'facebook-icon.png',
          soc_name: 'facebook'
        }
      ]
    });
  }
}