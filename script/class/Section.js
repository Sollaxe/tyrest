
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
  _worksPopup;
  _items;

  projectPopup = new ProjectPopup(0.2, 'theme_emerald');
  _requester = new Requester('GET');

  constructor(cssClassName) {
    super(cssClassName);
    this._items = this.obj.querySelectorAll(`.${this._cssClass}__item`);
    this._btnMore = this.obj.querySelector(`.${this._cssClass}__btn-more`);

    this._btnMore.addEventListener('click', this.btnHandler.bind(this));

    for (let i = 0; i < this._items.length; i++) {
      this._items[i].addEventListener('click', this.itemHandler.bind(this));
    }
  }

  async btnHandler() {
    if (this._worksPopup === undefined) {
      this.createWorksPopup(1);
    } else {
      this._worksPopup.open({});
    }
  }

  async createWorksPopup(selectedPageNum) {
    this._worksPopup = new WorkListPopup(0.2, 'theme_emerald', 6, this.projectPopup);

    this._worksPopup.open({
      selected_page: selectedPageNum
    });
  }

  async itemHandler(event) {
    let workId = +event.currentTarget.dataset.workId;
    let projectData;

    try {
      projectData = await this._requester.getData('getProject.php',{
        id: workId
      });
    } catch (e) {
      if (e.name === 'RequestError') {
        alert(e.message);
        return;
      } else {
        throw e;
      }
    }

    this.projectPopup.open(projectData);
  }
}