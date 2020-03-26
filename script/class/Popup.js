
//TODO: Задокументировать код
class Popup {
  _animDuration;
  _styleTheme;
  _zIndex;
  _exitActivateScroll;

  container;
  obj;
  exitCrossObj;

  constructor(animDuration, theme) {
    this._styleTheme = theme;
    this._animDuration = +animDuration;
  }

  create() {
    this.container = document.createElement('div');
    this.container.className = `popup ${this._styleTheme}`;
    this.container.style.display = 'none';
    this.container.style.animationDuration = this._animDuration + 's';
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
    if (this._exitActivateScroll) {
      document.body.style.overflowY = 'auto';
    }
    this.container.style.display = 'none';
  }

  hide() {
    this.container.classList.remove('popup_show');
    this.container.classList.add('popup_hide');

    setTimeout(this.handlerTimeoutHide.bind(this), this._animDuration * 1000);
  }

  open(zIndex = 100, exitActivateScroll = true) {
    if (this.container !== undefined) {
      this.show();
    } else {
      this.create();
      this.show();
    }

    this._exitActivateScroll = exitActivateScroll;
    this._zIndex = zIndex;
    this.container.style.zIndex = this._zIndex;

    console.log(this);
  }

  exit() {
    if (this.container !== undefined) {
      this.hide();
    }
  }
}

class NavMenu extends Popup {
  _navElemArr;
  _itemAnimDuration;

  _navElemDomObjs;

  constructor(animDuration, theme, itemAnimDuration, navElemArr) {
    super(animDuration, theme);
    this._navElemArr = navElemArr;
    this._itemAnimDuration = +itemAnimDuration;
    this._navElemDomObjs = [];
  }

  create() {
    super.create();
    let self = this;

    this.obj = document.createElement("div");
    this.obj.className = `nav-menu popup__widget`;

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

    this._navElemArr.forEach(function (item) {
      let currItem = document.createElement('div');
      currItem.className = 'nav-menu__item';
      currItem.innerHTML = item.inner_text;
      currItem.href = item.href;
      currItem.style.animationDuration = self._itemAnimDuration + 's';

      if (item.type === 'active') {
        currItem.classList.add('nav-menu__item_active');
      }

      self._navElemDomObjs.push(currItem);
      navList.append(currItem);
    });

    this.obj.append(navList);
    this.container.append(this.obj);
  }

  animNavItems() {
    let self = this;
    let i = 0;

    setTimeout(function () {
      self._navElemDomObjs[i].classList.add('nav-menu__item_show');
      let intervalID = setInterval(function () {
        i++;

        if (i >= self._navElemDomObjs.length) {
          clearInterval(intervalID);
        } else {
          self._navElemDomObjs[i].classList.add('nav-menu__item_show');
        }
      }, (self._itemAnimDuration * 1000) - 50);
    }, this._animDuration * 1000);
  }

  handlerTimeoutHide() {
    super.handlerTimeoutHide();

    this._navElemDomObjs.forEach(function (item) {
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
  }

  create(data) {
    super.create();

    this.obj = document.createElement('div');
    this.obj.classList = `popup__widget popup__widget_type_classic`;

    this.exitCrossObj = document.createElement('div');
    this.exitCrossObj.className = 'popup__exit-cross icon';
    this.obj.append(this.exitCrossObj);
  }

  changeContent(data) {
  }

  open(data, zIndex = 200, exitActivateScroll = true) {
    let self = this;

    //TODO: Переписать под async/await
    let bindShow = this.show.bind(this);
    new Promise(function (resolve, reject) {
      if (data === undefined || data === null) {
        reject(new Error('data is not exist'));
      }

      if (self.container !== undefined) {
        self.changeContent(data);
        resolve();
      } else {
        self.create(data);
        resolve();
      }
    }).then(
        bindShow,
        error => console.log(error)
    );

    this._exitActivateScroll = exitActivateScroll;
    this._zIndex = zIndex;
    this.container.style.zIndex = this._zIndex;
  }
}

class NotePopup extends Widget {
  _widgetType;
  _title;
  _text;

  constructor(animDuration, theme, widgetType) {
    super(animDuration, theme);

    let whiteList = ['small', 'big'];
    if (!whiteList.includes(widgetType)) {
      throw new ParamPopupError('is not valid', 'type');
    }

    this._widgetType = widgetType;
  }

  create(data) {
    super.create(data);
    this.obj.classList.add('note-popup');
    this.obj.classList.add(`note-popup_type_${this._widgetType}`);

    let titleContainer = document.createElement('div');
    titleContainer.className = 'note-popup__title-container';

    switch (this._widgetType) {
      case 'small':
        let titleDash = document.createElement('div');
        titleDash.className = 'note-popup__title-dash';
        titleContainer.append(titleDash);

        this._title = document.createElement('h3');
        this._title.className = 'note-popup__title';
        this._title.innerHTML = data.title;
        titleContainer.append(this._title);
        break;
      case 'big':
        let titleBlock = document.createElement('div');
        titleBlock.className = 'note-popup__title-block';

        this._title = document.createElement('span');
        this._title.className = 'note-popup__title-block-text';
        this._title.innerHTML = data.title;
        titleBlock.append(this._title);

        titleContainer.append(titleBlock);
        break;
    }

    this.obj.append(titleContainer);

    this._text = document.createElement('div');
    this._text.className = 'text-block size_m title-align_center theme_emerald note-popup__text';
    this._text.innerHTML = data.text;

    this.obj.append(this._text);

    this.container.append(this.obj);
  }

  changeContent(data) {
    super.changeContent(data);

    this._title.innerHTML = data.title;
    this._text.innerHTML = data.text;
  }
}

class PersonPopup extends Widget {
  name;
  post;
  img;
  textBlock;

  constructor(animDuration, theme) {
    super(animDuration, theme);
  }

  /*data {
    img_name,
    name,
    post,
    about
  }*/
  create(data) {
    super.create(data);
    this.obj.classList.add('person-popup');



    let nameBlock = document.createElement('div');
    nameBlock.className = 'person-popup__name-block';

    this.name = document.createElement('div');
    this.name.className = 'person-popup__name';
    this.name.innerText = data.name;
    nameBlock.append(this.name);

    this.post = document.createElement('div');
    this.post.className = 'person-popup__post';
    this.post.innerText = data.post;
    nameBlock.append(this.post);

    this.obj.append(nameBlock);

    let imgBlock = document.createElement('div');
    imgBlock.className = 'person-popup__img-block';

    let imgContainer = document.createElement('div');
    imgContainer.className = 'person-popup__img-container';
    imgBlock.append(imgContainer);

    this.img = document.createElement('img');
    this.img.className = 'person-popup__img';
    this.img.src = `/style/upd-image/workers/${data.img_name}`;
    imgContainer.append(this.img);

    this.obj.append(imgBlock);

    this.textBlock = document.createElement('div');
    this.textBlock.className = 'person-popup__text-block text-block size_m';
    this.textBlock.innerHTML = data.about;

    this.obj.append(this.textBlock);

    this.container.append(this.obj);
  }

  changeContent(data) {
    super.changeContent(data);

    this.name.innerText = data.name;
    this.post.innerText = data.post;
    this.img.src = `/style/upd-image/workers/${data.img_name}`;
    this.textBlock.innerHTML = data.about;
  }
}


class WorkListPopup extends Widget {
  _workListObj;
  _navObj;

  _numPage;
  _worksOnPage;
  _currWorkList = [];

  _requester = new Requester('GET');
  _projectPopup;

  constructor(animDuration, theme, numWorksOnPage, projectPopup) {
    super(animDuration, theme);
    this._worksOnPage = numWorksOnPage;

    this._projectPopup = projectPopup;
  }


  async uploadNumPage() {
    let numWorks;

    try {
      let numWorksObj = await this._requester.getData('getNumWorks.php',{});
      numWorks = numWorksObj.num_works;
    } catch (e) {
      if (e.name === 'RequestError') {
        alert(e.message);
        return;
      } else {
        throw e;
      }
    }

    this._numPage = Math.ceil(numWorks / this._worksOnPage);
  }

  async uploadWorksData(page, numWorksOnPage) {
    try {
      let result = await this._requester.getData('getWorkList.php',{
        page: page,
        worksOnPage: this._worksOnPage
      });

      return result;
    } catch (e) {
      throw e;
    }
  }

  // data = {
  //   img_name,
  //   name,
  //   desc,
  //   id
  // }
  createWorkItem(data) {
    let self = this;

    let item = document.createElement('div');
    item.className = `work-tile ${this._styleTheme}`;
    {
      let imgBlock = document.createElement('div');
      imgBlock.className = 'work-tile__img';
      imgBlock.style.backgroundImage = `url(\'/style/upd-image/works/${data.img_name}\')`;
      item.append(imgBlock);

      let content = document.createElement('div');
      content.className = 'work-tile__content';
      item.append(content);
      {
        let name = document.createElement('div');
        name.className = 'work-tile__name';
        name.innerText = data.title;
        content.append(name);

        let desc = document.createElement('p');
        desc.className = 'work-tile__desc';
        desc.innerText = data.desc;
        content.append(desc);

        let linkBlock = document.createElement('div');
        linkBlock.className = 'work-tile__link-block';
        content.append(linkBlock);
        {
          let anchor = document.createElement('a');
          anchor.className = `anchor anchor_type_arrow ${this._styleTheme} size_l`;
          anchor.dataset.workId = data.id;
          anchor.addEventListener('click', self.worksItemHandler.bind(self));
          linkBlock.append(anchor);
          {
            let anchorText = document.createElement('span');
            anchorText.className = 'anchor__text';
            anchorText.innerText = 'See All';
            anchor.append(anchorText);

            let anchorArrow = document.createElement('div');
            anchorArrow.className = 'anchor__arrow';
            anchor.append(anchorArrow);
          }
        }
      }
    }

    return item;
  }

  // data = {
  //   page = int;
  // }
  async create(data) {
    super.create(data);

    await this.uploadNumPage();

    let workList;
    try {
      workList = await this.uploadWorksData(data.selected_page - 1, this._worksOnPage);
    } catch (e) {
      if (e.name === 'ReguestError') {
        alert(e.message);
        return;
      } else {
        throw e;
      }
    }

    this._navObj = new WorksNav(this._numPage, 0.15, this.navCallback.bind(this));

    let self = this;

    this.obj.classList.add('works-popup');
    this.container.append(this.obj);
    {
      let worksHead = document.createElement('div');
      worksHead.className = 'works-popup__head';
      this.obj.append(worksHead);
      {
        let popupTitle = document.createElement('div');
        popupTitle.className = 'works-popup__title-block';
        popupTitle.innerText = 'Our Works';
        worksHead.append(popupTitle);
      }

      this._workListObj = document.createElement('div');
      this._workListObj.className = 'works-popup__works-list';
      this.obj.append(this._workListObj);
      {
        this.appendWorksItem(workList);
      }

      if (this._navObj !== undefined) {
        let worksBottom = document.createElement('div');
        worksBottom.className = 'works-popup__bottom';
        this.obj.append(worksBottom);
        {
          worksBottom.append(this._navObj.createNav());
          this._navObj.launch(data.selected_page - 1);
        }
      }
    }

  }

  async removeWorksItem() {
    this._currWorkList.forEach(function (item) {
      item.remove();
    });

    this._currWorkList;
  }

  async reuploadWorks(page) {
    let self = this;
    let workList;

    try {
      workList = await this.uploadWorksData(page - 1, this._worksOnPage);
    } catch (e) {
      if (e.name === 'ReguestError') {
        alert(e.message);
        return;
      } else {
        throw e;
      }
    }

    this.appendWorksItem(workList);
  }

  async navCallback(page) {
    this.commitContainerHeight();

    await this.removeWorksItem();
    await this.reuploadWorks(page);

    this._workListObj.style.height = '';
  }

  appendWorksItem(workList) {
    let self = this;

    workList.forEach(function (item, index) {
      let currItem = self.createWorkItem(item);
      self._workListObj.append(currItem);
      self._currWorkList.push(currItem);
    });
  }

  async worksItemHandler(event) {
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

    this._projectPopup.open(projectData, this._zIndex + 1, false);
  }

  commitContainerHeight() {
    let currHeight = this._workListObj.clientHeight;
    this._workListObj.style.height = `${currHeight}px`;
  }
}


class ProjectPopup extends Widget{
  _carousel;
  _shareBlock;
  _workerList;
  _aboutText;
  _projectLink;
  _projectName;

  workerArray = [];

  constructor(animDuration, theme) {
    super(animDuration, theme);
    this._carousel = new ProjectCarousel(this._styleTheme);
    this._shareBlock = new ShareBlock('theme_dark');
  }

  createSectionTitle(text, sizeStyle) {
    let sectionTitle = document.createElement('h4');
    sectionTitle.className = `project-popup__section-title ${sizeStyle}`;
    sectionTitle.innerText = text;
    return sectionTitle;
  }

  // workerData = {
  //   id: int,
  //   img_name: 'str',
  //   name: 'str',
  //   post: 'str'
  // }
  createWorker(workerData) {
    let worker = document.createElement('div');
    worker.className = 'project-popup__worker';
    worker.dataset.id = workerData.id;
    {
      let img = document.createElement('div');
      img.className = 'project-popup__worker-img';
      img.style.backgroundImage = `url(\'/style/upd-image/workers/${workerData.img_name}\')`;
      worker.append(img);

      let nameBlock = document.createElement('div');
      nameBlock.className = 'project-popup__worker-name-block';
      worker.append(nameBlock);
      {
        let name = document.createElement('span');
        name.className = 'project-popup__worker-name';
        name.innerText = workerData.name;
        nameBlock.append(name);

        let post = document.createElement('span');
        post.className = 'project-popup__worker-post';
        post.innerText = workerData.post;
        nameBlock.append(post);
      }
    }

    return worker;
  }

  // data = {
  //   project_name: 'str',
  //   about_text: 'str',
  //   work_link: 'str',
  //   carousel_item: [
  //     {
  //       img_name: 'str'
  //     }
  //   ],
  //   worker_items: [
  //     {
  //       id: int,
  //       img_name: 'str',
  //       name: 'str',
  //       post: 'str'
  //     }
  //   ],
  //   share_items: [
  //     {
  //       icon_name: 'str',
  //       soc_name: 'str'
  //     }
  //   ]
  // }
  create(data) {
    super.create(data);
    let self = this;

    let hr = document.createElement('div');
    hr.className = 'project-popup__hr';

    this.obj.classList.add('project-popup');
    this.container.append(this.obj);
    {
      this.exitCrossObj.classList.add('project-popup__exit-cross');

      let head = document.createElement('div');
      head.className = 'project-popup__head';
      this.obj.append(head);
      {
        let nameBlock = document.createElement('div');
        nameBlock.className = 'project-popup__name-block';
        head.append(nameBlock);
        {
          let nameDash = document.createElement('div');
          nameDash.className = 'project-popup__name-dash';
          nameBlock.append(nameDash);

          this._projectName = document.createElement('span');
          this._projectName.className = 'project-popup__name';
          this._projectName.innerText = data.title;
          nameBlock.append(this._projectName);
        }
      }

      this._carousel.create(data.img_arr, this.obj);

      let about = document.createElement('div');
      about.className = 'project-popup__about';
      this.obj.append(about);
      {
        let textSection = document.createElement('div');
        textSection.className = 'project-popup__text-section';
        about.append(textSection);
        {
          textSection.append(this.createSectionTitle('ABOUT PROJECT', 'size_m'));

          this._aboutText = document.createElement('div');
          this._aboutText.className = `text-block size_m title-align_left ${this._styleTheme} project-popup__text`;
          this._aboutText.innerHTML = data.desc;
          textSection.append(this._aboutText);

          this._projectLink = document.createElement('a');
          this._projectLink.className = `project-popup__anchor anchor anchor_type_arrow ${this._styleTheme} size_l`;
          this._projectLink.href = data.work_link;
          textSection.append(this._projectLink);
          {
            let linkText = document.createElement('span');
            linkText.className = 'anchor__text';
            linkText.innerText = 'See All Project in Dribbble';
            this._projectLink.append(linkText);

            let linkArrow = document.createElement('div');
            linkArrow.className = 'anchor__arrow';
            this._projectLink.append(linkArrow);
          }
        }

        about.append(hr.cloneNode());

        let infoBlock = document.createElement('div');
        infoBlock.className = 'project-popup__info-block';
        about.append(infoBlock);
        {
          let workerSection = document.createElement('div');
          workerSection.className = 'project-popup__worker-section';
          infoBlock.append(workerSection);
          {
            workerSection.append(this.createSectionTitle('WORKERS', 'size_m'));

            this._workerList = document.createElement('div');
            this._workerList.className = 'project-popup__worker-list';
            workerSection.append(this._workerList);
            {
              data.workers.forEach(function (item, index) {
                let worker = self.createWorker(item)
                self.workerArray[index] = worker;
                self._workerList.append(worker);
              });
            }
          }

          infoBlock.append(hr.cloneNode());

          let shareSection = document.createElement('div');
          shareSection.className = 'project-popup__share-section';
          infoBlock.append(shareSection);
          {
            shareSection.append(this.createSectionTitle('SHARE', 'size_s'));

            this._shareBlock.create(data.share_items, shareSection);
          }
        }
      }
    }

    this.container.append(this.obj);
  }

  // data = {
  //   title: 'str',
  //   desc: 'str',
  //   work_link: 'str',
  //   img_arr: ['str'],
  //   workers: [
  //     {
  //       id: int,
  //       img_name: 'str',
  //       name: 'str',
  //       post: 'str'
  //     }
  //   ],
  //   share_items: [
  //     {
  //       icon_name: 'str',
  //       soc_name: 'str'
  //     }
  //   ]
  // }
  changeContent(data) {
    super.changeContent(data);
    let self = this;

    this._carousel.changeContent(data.img_arr);

    this._projectName.innerText = data.title;
    this._aboutText.innerHTML = data.desc;
    this._projectLink.href = data.work_link;

    for (let item of this.workerArray) {
      item.remove();
    }

    this.workerArray = [];

    data.workers.forEach(function (item, index) {
      let worker = self.createWorker(item)
      self.workerArray[index] = worker;
      self._workerList.append(worker);
    });
  }

  exit() {
    super.exit();
    this._carousel.deactivate();
  }
}