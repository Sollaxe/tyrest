
//TODO: Отформатировать код
class Popup {
  _animDuration;
  _styleTheme;
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
    document.body.style.overflowY = 'auto';
    this.container.style.display = 'none';
  }

  hide() {
    this.container.classList.remove('popup_show');
    this.container.classList.add('popup_hide');

    let bindHandler = this.handlerTimeoutHide.bind(this);
    setTimeout(bindHandler, this._animDuration * 1000);
  }

  open() {
    if (this.container !== undefined) {
      this.show();
    } else {
      this.create();
      this.show();
    }
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
  navElemDomObjs;

  constructor(animDuration, theme, itemAnimDuration, navElemArr) {
    super(animDuration, theme);
    this._navElemArr = navElemArr;
    this._itemAnimDuration = +itemAnimDuration;
    this.navElemDomObjs = [];
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
      currItem.innerHTML = item.innerText;
      currItem.style.animationDuration = self._itemAnimDuration + 's';

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
      }, (self._itemAnimDuration * 1000) - 50);
    }, this._animDuration * 1000);
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

  open(data) {
    let self = this;

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
  }
}

class NotePopup extends Widget {
  _widgetType;

  constructor(animDuration, theme, widgetType) {
    super(animDuration, theme);

    let whiteList = ['small', 'big'];
    if (!whiteList.includes(widgetType)) {
      throw new ParamPopupError('is not valid', 'type');
    }

    this._widgetType = widgetType;
  }

  changeContent(data) {
    super.changeContent(data);

    this.title.innerHTML = data.note_title;
    this.text.innerHTML = data.note_text;
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

        this.title = document.createElement('h3');
        this.title.className = 'note-popup__title';
        this.title.innerHTML = data.note_title;
        titleContainer.append(this.title);
        break;
      case 'big':
        let titleBlock = document.createElement('div');
        titleBlock.className = 'note-popup__title-block';

        this.title = document.createElement('span');
        this.title.className = 'note-popup__title-block-text';
        this.title.innerHTML = data.note_title;
        titleBlock.append(this.title);

        titleContainer.append(titleBlock);
        break;
    }

    this.obj.append(titleContainer);

    this.text = document.createElement('div');
    this.text.className = 'text-block size_m title-align_center theme_emerald note-popup__text';
    this.text.innerHTML = data.note_text;

    this.obj.append(this.text);

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


  // let note = new NotePopup(0.2, 'theme_emerald', 'big');
  // note.open({
  //   note_title: 'TITLE',
  //   note_text:'<div class="text-block__title"><span class="text-block__title-text">OUR STORY</span></div>\n' +
  //       '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis distinctio esse iste laborum non odio quasi reiciendis? Assumenda autem cumque excepturi, iure odit sunt ut? A doloribus ex necessitatibus <ullam class=""></ullam></p>\n' +
  //       '<div class="text-block__title"><span class="text-block__title-text">OUR STORY</span></div>\n' +
  //       '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci aliquam aspernatur atque beatae consequatur delectus error, exercitationem hic ipsa laudantium maxime modi pariatur quos ratione reiciendis repellat sint soluta!</p>\n' +
  //       '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias debitis esse id inventore iure mollitia optio, quam qui quia, tenetur velit vitae voluptatibus? Ab corporis dolor est, nam natus ut.</p>'
  // });



class PersonPopup extends Widget {
  constructor(animDuration, theme) {
    super(animDuration, theme);
  }

  changeContent(data) {
    super.changeContent(data);

    this.name.innerText = data.worker_name;
    this.post.innerText = data.worker_post;
    this.img.src = `/style/upd-image/workers/${data.img_name}`;
    this.textBlock.innerHTML = data.worker_about;
  }

  /*data {
    img_name,
    worker_name
    worker_post
    worker_about
  }*/
  create(data) {
    super.create(data);
    this.obj.classList.add('person-popup');



    let nameBlock = document.createElement('div');
    nameBlock.className = 'person-popup__name-block';

    this.name = document.createElement('div');
    this.name.className = 'person-popup__name';
    this.name.innerText = data.worker_name;
    nameBlock.append(this.name);

    this.post = document.createElement('div');
    this.post.className = 'person-popup__post';
    this.post.innerText = data.worker_post;
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
    this.textBlock.innerHTML = data.worker_about;

    this.obj.append(this.textBlock);

    this.container.append(this.obj);
  }
}

// let person = new PersonPopup(0.2, 'theme_emerald');
// person.open({
//   img_name: 'adam_ajax.png',
//   worker_name: 'Adam Ajax',
//   worker_post: 'Ceo & Managment',
//   worker_about: '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto culpa dolore ex facere incidunt iusto nam odit quasi quos ut. Distinctio enim et nostrum nulla quos ratione temporibus voluptas voluptate!</p>\n' +
//       '          <p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A beatae dicta, eaque earum libero magnam omnis quae quisquam quo voluptas.</p>\n' +
//       '          <p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate doloremque facere fuga labore repudiandae.</p>'
// });


/*<!--        <div class="person-popup popup__widget popup__widget_type_classic">-->
<!--            <div class="popup__exit-cross icon"></div>-->
    <!--            <div class="person-popup__img-block">-->
    <!--                <div class="person-popup__img-container">-->
    <!--                    <img src="/style/upd-image/workers/adam_ajax.png" class="person-popup__img">-->
    <!--                </div>-->
    <!---->
    <!--                <div class="person-popup__name-block">-->
    <!--                    <div class="person-popup__name">Adam Ajax</div>-->
<!--                    <div class="person-popup__post">Ceo & Managment</div>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--            <div class="person-popup__text-block">-->
    <!--                <div class="person-popup__title">About</div>-->
    <!--                <div class="text-block size_m">-->
    <!--                    <p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto culpa dolore ex facere incidunt iusto nam odit quasi quos ut. Distinctio enim et nostrum nulla quos ratione temporibus voluptas voluptate!</p>-->
<!--                    <p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A beatae dicta, eaque earum libero magnam omnis quae quisquam quo voluptas.</p>-->
<!--                    <p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate doloremque facere fuga labore repudiandae.</p>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->*/


class WorkListPopup extends Widget {
  workListObj;

  _navObj;

  constructor(animDuration, theme) {
    super(animDuration, theme);
    this._navObj = new WorksNav(  20, 0.15);
  }

  // data = {
  //   img_name,
  //   work_name,
  //   work_desc,
  //   work_id
  // }
  createWorkItem(data) {
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
        name.innerText = data.work_name;
        content.append(name);

        let desc = document.createElement('p');
        desc.className = 'work-tile__desc';
        desc.innerText = data.work_desc;
        content.append(desc);

        let linkBlock = document.createElement('div');
        linkBlock.className = 'work-tile__link-block';
        content.append(linkBlock);
        {
          let anchor = document.createElement('a');
          anchor.className = `anchor anchor_type_arrow ${this._styleTheme} size_l`;
          anchor.dataset.workId = data.work_id;
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
  //   work_arr = [array];
  // }
  changeContent(data) {
    super.changeContent(data);
    let self = this;

    let workListChildren = this.workListObj.children;
    for (let i = 0; i < workListChildren.length; i++) {
      workListChildren[i].remove();
    }

    data.work_arr.forEach(function (item, index) {
      let currItem = self.createWorkItem(item);
      self.workListObj.append(currItem);
    });

    this._navObj.activateItem(data.page - 1);
  }

  // data = {
  //   page = int;
  //   work_arr = [array];
  // }
  create(data) {
    super.create(data);
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

      this.workListObj = document.createElement('div');
      this.workListObj.className = 'works-popup__works-list';
      this.obj.append(this.workListObj);
      {
        data.work_arr.forEach(function (item, index) {
          let currItem = self.createWorkItem(item);
          self.workListObj.append(currItem);
        });
      }

      if (this._navObj !== undefined) {
        let worksBottom = document.createElement('div');
        worksBottom.className = 'works-popup__bottom';
        this.obj.append(worksBottom);
        {
          worksBottom.append(this._navObj.createNav());
          this._navObj.activateItem(data.page - 1);
        }
      }
    }

  }
}

// let test = new WorkListPopup(0.2, 'theme_emerald');
// test.open({
//   page: 1,
//   work_arr: [
//     {
//       img_name: 'maket-1.png',
//       work_name: 'test work',
//       work_desc: 'test desc',
//       work_id: 1
//     }
//   ]
// });
//
// setTimeout(function () {
//   test.exit();
//
//   setTimeout(function () {
//     test.open({
//       page: 2,
//       work_arr: [
//         {
//           img_name: 'maket-2.png',
//           work_name: 'test work',
//           work_desc: 'test desc',
//           work_id: 1
//         }
//       ]
//     });
//   }, 1500)
// }, 1000)

class ProjectPopup extends Widget{
  _carousel;
  _shareBlock;
  _workerArray = [];

  aboutText;
  projectLink;
  workerList;
  projectName;

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

          this.projectName = document.createElement('span');
          this.projectName.className = 'project-popup__name';
          this.projectName.innerText = data.project_name;
          nameBlock.append(this.projectName);
        }
      }

      this._carousel.create(data.carousel_item, this.obj);

      let about = document.createElement('div');
      about.className = 'project-popup__about';
      this.obj.append(about);
      {
        let textSection = document.createElement('div');
        textSection.className = 'project-popup__text-section';
        about.append(textSection);
        {
          textSection.append(this.createSectionTitle('ABOUT PROJECT', 'size_m'));

          this.aboutText = document.createElement('div');
          this.aboutText.className = `text-block size_m title-align_left ${this._styleTheme} project-popup__text`;
          this.aboutText.innerHTML = data.about_text;
          textSection.append(this.aboutText);

          this.projectLink = document.createElement('a');
          this.projectLink.className = `project-popup__anchor anchor anchor_type_arrow ${this._styleTheme} size_l`;
          this.projectLink.href = data.work_link;
          textSection.append(this.projectLink);
          {
            let linkText = document.createElement('span');
            linkText.className = 'anchor__text';
            linkText.innerText = 'See All Project in Dribbble';
            this.projectLink.append(linkText);

            let linkArrow = document.createElement('div');
            linkArrow.className = 'anchor__arrow';
            this.projectLink.append(linkArrow);
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

            this.workerList = document.createElement('div');
            this.workerList.className = 'project-popup__worker-list';
            workerSection.append(this.workerList);
            {
              data.worker_items.forEach(function (item, index) {
                let worker = self.createWorker(item)
                self._workerArray[index] = worker;
                self.workerList.append(worker);
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

  exit() {
    super.exit();
    this._carousel.exit();
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
  //   ]
  // }
  changeContent(data) {
    super.changeContent(data);
    let self = this;

    this._carousel.changeContent(data.carousel_item);

    this.projectName.innerText = data.project_name;
    this.aboutText.innerHTML = data.about_text;
    this.projectLink.href = data.work_link;

    for (let item of this._workerArray) {
      item.remove();
    }

    this._workerArray = [];

    data.worker_items.forEach(function (item, index) {
      let worker = self.createWorker(item)
      self._workerArray[index] = worker;
      self.workerList.append(worker);
    });
  }
}

// let test = new ProjectPopup(0.2, 'theme_emerald');
// test.open({
//   project_name: 'PROJECT',
//   about_text: '<p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab\n' +
//       '            culpa debitis dolores enim eveniet expedita ipsa, ipsum, itaque laborum laudantium minima\n' +
//       '            nostrum numquam odit perferendis praesentium quae qui ratione veritatis vero! A dolores eos\n' +
//       '            illum iusto laborum tenetur? Nihil?</p>\n' +
//       '        <p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab\n' +
//       '            culpa debitis dolores enim eveniet expedita ipsa, ipsum, itaque laborum laudantium minima\n' +
//       '            nostrum numquam odit perferendis praesentium quae qui ratione veritatis vero! A dolores eos\n' +
//       '            illum iusto laborum tenetur? Nihil?</p>\n' +
//       '        <p class="text-block__paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab\n' +
//       '            culpa debitis dolores enim eveniet expedita ipsa, ipsum, itaque laborum laudantium minima\n' +
//       '            nostrum numquam odit perferendis praesentium quae qui ratione veritatis vero! A dolores eos\n' +
//       '            illum iusto laborum tenetur? Nihil?</p>',
//   work_link: '#',
//   carousel_item: [
//     {
//       img_name: 'maket-1.png'
//     },
//     {
//       img_name: 'maket-2.png'
//     },
//     {
//       img_name: 'maket-1.png'
//     }
//   ],
//   worker_items: [
//     {
//       id: 1,
//       img_name: 'adam_ajax.png',
//       name: 'Adam Ajax',
//       post: 'Adam Ajax'
//     },
//     {
//       id: 1,
//       img_name: 'adam_ajax.png',
//       name: 'Adam Ajax',
//       post: 'Adam Ajax'
//     },
//     {
//       id: 1,
//       img_name: 'adam_ajax.png',
//       name: 'Adam Ajax',
//       post: 'Adam Ajax'
//     }
//   ],
//   share_items: [
//     {
//       icon_name: 'facebook-icon.png',
//       soc_name: 'facebook'
//     }
//   ]
// });