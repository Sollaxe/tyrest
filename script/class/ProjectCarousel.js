class ProjectCarousel {
  _styleTheme;
  _currSlideId;
  _currNumSlide;
  _bindItemHandler;
  _navItemArray = [];
  _itemArray = [];

  arrNext;
  arrPrev;
  nav;
  itemContainer;
  obj;

  constructor(theme) {
    this._styleTheme = theme;
  }

  setNavHandlers() {
    this._bindItemHandler = this.navItemHandler.bind(this);

    for (let i = 0; i < this.nav.children.length; i++) {
      this.nav.children[i].addEventListener('click', this._bindItemHandler);
    }
  }



  navItemHandler(event) {
    let item = event.currentTarget;
    let id = +item.dataset.num;
    this.slideOn(id);
  }

  slideNext() {
    this.slideOn(this._currSlideId + 1);
  }

  slidePrev() {
    this.slideOn(this._currSlideId - 1);
  }


  slideOn(id) {
    if (id === this._currSlideId) {
      return false;
    }

    if (id >= 0 && id < this._currNumSlide) {

      if (this._currSlideId !== undefined && this._currSlideId !== null) {
        this.nav.children[this._currSlideId].classList.remove('active');
      }

      this._currSlideId = id;
      let currOffset = this.obj.clientWidth * this._currSlideId;

      this.nav.children[id].classList.add('active');
      this.itemContainer.style.transform = `translateX(-${currOffset}px)`;
    } else {
      return false;
    }
  }

  createItem(data) {
    let imgContainer = document.createElement('div');
    imgContainer.className = 'project-carousel__item';
    {
      let img = document.createElement('img');
      img.className = 'project-carousel__item-img';
      img.src = `/style/upd-image/works/${data.img_name}`;
      img.alt = data.img_name;
      imgContainer.append(img);
    }

    return imgContainer;
  }

  createNavItem(id) {
    let navItem = document.createElement('div');
    navItem.className = 'project-carousel__nav-item';
    navItem.dataset.num = String(id);
    return navItem;
  }

  // dataArray = [
  //   {
  //     image_name: 'str'
  //   }
  // ];
  create(dataArray, parentElem) {
    let self = this;
    this._currNumSlide = dataArray.length;

    this.obj = document.createElement('div');
    this.obj.className = `project-carousel ${this._styleTheme}`;
    {
      this.arrPrev = document.createElement('div');
      this.arrPrev.className = 'project-carousel__nav-arrow project-carousel__nav-arrow_left icon';
      this.arrPrev.addEventListener('click', this.slidePrev.bind(this));
      this.obj.append(this.arrPrev);

      this.arrNext = document.createElement('div');
      this.arrNext.className = 'project-carousel__nav-arrow project-carousel__nav-arrow_right icon';
      this.arrNext.addEventListener('click', this.slideNext.bind(this));
      this.obj.append(this.arrNext);


      this.nav = document.createElement('div');
      this.nav.className = 'project-carousel__nav';
      this.obj.append(this.nav);
      {
        for (let i = 0; i < this._currNumSlide; i++) {
          let item = this.createNavItem(i);
          this._navItemArray[i] = item;
          this.nav.append(item);
        }
      }

      this.itemContainer = document.createElement('div');
      this.itemContainer.className = 'project-carousel__container';
      this.obj.append(this.itemContainer);
      {
        dataArray.forEach(function (dataItem, index) {
          let item = self.createItem(dataItem);
          self._itemArray[index] = item;
          self.itemContainer.append(item);
        });
      }
    }

    parentElem.append(this.obj);

    this.slideOn(0);

    window.addEventListener('resize', function () {
      let currOffset = self.obj.clientWidth * self._currSlideId;
      self.itemContainer.style.transform = `translateX(-${currOffset}px)`;
    });

    this.setNavHandlers();
  }

  changeContent(dataArray) {
    let self = this;
    this._currNumSlide = dataArray.length;

    for (let item of this._navItemArray) {
      item.remove();
    }

    this._navItemArray = [];

    dataArray.forEach(function (dataItem, index) {
      let item = self.createItem(dataItem);
      self._itemArray[index] = item;
      self.itemContainer.append(item);
    });

    for (let item of this._navItemArray) {
      item.remove();
    }

    this._navItemArray = [];

    for (let i = 0; i < this._currNumSlide; i++) {
      let item = this.createNavItem(i);
      this._navItemArray = item;
      this.nav.append(item);
    }

    this.slideOn(0);
    this.setNavHandlers();
  }

  exit() {
    this._currSlideId = null;
    for (let i = 0; i < this.nav.children.length; i++) {
      this.nav.children[i].removeEventListener('click', this._bindItemHandler);
    }
  }
}