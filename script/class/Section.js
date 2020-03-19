
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

  _noteRequester = new Requester('GET');

  constructor(cssClassName) {
    super(cssClassName);
    this._btnMore = this.obj.querySelector(`.${this._cssClass}__btn-more`);

    this._btnMore.addEventListener('click', this.btnHandler.bind(this));
  }

  async btnHandler() {
    let dataNote;

    try {
      dataNote = await this._noteRequester.getData('getNoteAbout.php',{});
    } catch (e) {
      if (e.name === 'RequestError') {
        alert(e.message);
        return;
      } else {
        throw e;
      }
    }

    if (this._notePopup === undefined) {
      this._notePopup = new NotePopup(0.2, 'theme_emerald', 'big');
    }

    this._notePopup.open(dataNote);
  }
}

class TeamSection extends Section {
  _btnHiring;
  _personPopup;
  _notePopup;
  _items;

  _requester = new Requester('GET');

  constructor(cssClassName) {
    super(cssClassName);
    this._items = this.obj.querySelectorAll(`.${this._cssClass}__list-item`);
    this._btnHiring = this.obj.querySelector(`.${this._cssClass}__btn-hiring`);

    this._btnHiring.addEventListener('click', this.btnHandler.bind(this));

    for (let i = 0; i < this._items.length; i++) {
      this._items[i].addEventListener('click', this.itemHandler.bind(this));
    }
  }

  async btnHandler() {
    let dataNote;

    try {
      dataNote = await this._requester.getData('getNoteHiring.php',{});
    } catch (e) {
      if (e.name === 'RequestError') {
        alert(e.message);
        return;
      } else {
        throw e;
      }
    }

    if (this._notePopup === undefined) {
      this._notePopup = new NotePopup(0.2, 'theme_emerald', 'big');
    }

    this._notePopup.open(dataNote);
  }

  async itemHandler(event) {
    let personId = event.currentTarget.dataset.workerId;

    console.log(event.currentTarget.dataset);
    let personData;

    try {
      personData = await this._requester.getData('getPersonInfo.php',{
        id: personId
      });
    } catch (e) {
      if (e.name === 'RequestError') {
        alert(e.message);
        return;
      } else {
        throw e;
      }
    }

    if (this._personPopup === undefined) {
      this._personPopup = new PersonPopup(0.2, 'theme_emerald');
    }

    this._personPopup.open(personData);
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