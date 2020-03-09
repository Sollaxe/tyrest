class InfinityCarousel {
  obj;
  cssClass;

  _itemContainer;
  _containerHeight;
  _containerGap;
  _containerAnimDuration;
  _items;
  _itemSpaceReq;
  _arrPrev;
  _arrNext;

  _currOffset = 0;

  _numFirstVisibleItem = 0;
  _numActiveItem = 2;
  _numLastVisibleItem = 4;

  _slidePrevBind;
  _slideNextBind;

  _slideHandler;

  constructor(cssClassName, containerAnimDuration, slideHandler = null) {
    this.cssClass = cssClassName;
    this._containerAnimDuration = containerAnimDuration;
    this._slideHandler = slideHandler;
  }

  create() {
//abstract
  }

  setOn(selector) {
    let self = this;

    this.obj = document.querySelector(selector);

    this._arrPrev = this.obj.querySelector(`.${this.cssClass}__nav-arrow[data-action="prev"]`);
    this._slidePrevBind = this.slidePrev.bind(this);
    this._arrPrev.addEventListener('click', this._slidePrevBind);

    this._arrNext = this.obj.querySelector(`.${this.cssClass}__nav-arrow[data-action="next"]`);
    this._slideNextBind = this.slideNext.bind(this);
    this._arrNext.addEventListener('click', this._slideNextBind);

    this._itemContainer = this.obj.querySelector(`.${this.cssClass}__item-container`);
    this._itemContainer.style.transition = `transform ${this._containerAnimDuration}s`;
    this._containerHeight = this._itemContainer.clientHeight;
    this._containerGap = parseInt(getComputedStyle(this._itemContainer).gridColumnGap);

    this._items = this._itemContainer.children;
    this._itemSpaceReq = this._items[0].clientWidth + this._containerGap;

    for (let i = this._numFirstVisibleItem; i <= this._numLastVisibleItem; i++) {
      this._items[i].classList.add('visible')
    }

    this._items[this._numActiveItem].classList.add('active');


    window.addEventListener('resize', function () {
      if (self._containerHeight !== self._itemContainer.clientHeight) {

        for (let i = self._numFirstVisibleItem; i <= self._numLastVisibleItem; i++) {
          self._items[i].classList.remove('visible');
        }

        for (let i = 0; i < self._items.length; i++) {
          self._items[i].style.transition = 'none';
        }

        self._containerGap = parseInt(getComputedStyle(self._itemContainer).gridColumnGap);
        self._containerHeight = self._itemContainer.clientHeight;
        self._itemSpaceReq = self._items[0].clientWidth + self._containerGap;

        self._items[self._numActiveItem].classList.remove('active');

        self._currOffset = 0;
        self._numFirstVisibleItem = 0;
        self._numActiveItem = 2;
        self._numLastVisibleItem = 4;

        for (let i = self._numFirstVisibleItem; i <= self._numLastVisibleItem; i++) {
          self._items[i].classList.add('visible');
        }

        for (let i = 0; i < self._items.length; i++) {
          self._items[i].style.transition = '';
        }

        self._items[self._numActiveItem].classList.add('active');
        self._itemContainer.style.transform = `translateX(${self._currOffset}px)`;

        if (self._slideHandler !== null) {
          let num = +self._items[self._numActiveItem].dataset.num;
          self._slideHandler(num);
        }
      }
    });
  }

  slideNext() {
    let self = this;
    let promise;

    this._arrNext.removeEventListener('click', this._slideNextBind);

    this._items[this._numActiveItem].classList.remove('active');
    this._items[this._numFirstVisibleItem].classList.remove('visible');

    if (this._numLastVisibleItem === this._items.length - 1) {
      promise = this.swapFirstToLastItem();
    } else {
      promise = new Promise(function (resolve) {
        self._numFirstVisibleItem++;
        self._numLastVisibleItem++;
        self._currOffset -= self._itemSpaceReq;
        self._numActiveItem++;
        self._itemContainer.style.transform = `translateX(${self._currOffset}px)`;

        self._items[self._numLastVisibleItem].classList.add('visible');
        self._items[self._numActiveItem].classList.add('active');

        resolve();
      });
    }

    promise.then(function () {
      if (self._slideHandler !== null) {
        let num = +self._items[self._numActiveItem].dataset.num;
        self._slideHandler(num);
      }

      setTimeout(function () {
        self._arrNext.addEventListener('click', self._slideNextBind);
      }, self._containerAnimDuration * 1000);
    });
  }

  slidePrev() {
    let self = this;
    let promise;

    this._arrPrev.removeEventListener('click', this._slidePrevBind);

    this._items[this._numActiveItem].classList.remove('active');
    this._items[this._numLastVisibleItem].classList.remove('visible');

    if (this._numFirstVisibleItem === 0) {
      promise = this.swapLastToFirstItem();
    } else {
      promise = new Promise(function (resolve) {
        self._numFirstVisibleItem--;
        self._numLastVisibleItem--;
        self._currOffset += self._itemSpaceReq;
        self._numActiveItem--;
        self._itemContainer.style.transform = `translateX(${self._currOffset}px)`;

        self._items[self._numFirstVisibleItem].classList.add('visible');
        self._items[self._numActiveItem].classList.add('active');

        resolve();
      });
    }

    promise.then(function () {
      if (self._slideHandler !== null) {
        let num = +self._items[self._numActiveItem].dataset.num;
        self._slideHandler(num);
      }

      setTimeout(function () {
        self._arrPrev.addEventListener('click', self._slidePrevBind);
      }, self._containerAnimDuration * 1000);
    });
  }

  swapLastToFirstItem() {
    let self = this;

    let item = self._items[self._items.length-1];
    self._itemContainer.prepend(item);

    this._itemContainer.style.transition = 'none';
    this._itemContainer.style.transform = `translateX(${-this._itemSpaceReq}px)`;

    return new Promise(function (resolve) {
      setTimeout(function () {
        self._itemContainer.style.transition = `transform ${self._containerAnimDuration}s`;
        self._itemContainer.style.transform = 'translateX(0)';

        self._items[self._numFirstVisibleItem].classList.add('visible');
        self._items[self._numActiveItem].classList.add('active');
        resolve();
      }, 1);
    });
  }

  swapFirstToLastItem() {
    let self = this;

    let item = this._items[0];
    this._itemContainer.append(item);

    this._itemContainer.style.transition = 'none';
    this._itemContainer.style.transform = `translateX(${this._currOffset + this._itemSpaceReq}px)`;

    return new Promise(function (resolve) {
      setTimeout(function () {
        self._itemContainer.style.transition = `transform ${self._containerAnimDuration}s`;
        self._itemContainer.style.transform = `translateX(${self._currOffset}px)`;

        self._items[self._numLastVisibleItem].classList.add('visible');
        self._items[self._numActiveItem].classList.add('active');
        resolve();
      }, 1);
    });
  }
}