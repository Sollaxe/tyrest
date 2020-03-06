class HeadSlider {
  obj;

  _textContainer;
  _textItemArr;
  _highestTextItem;
  _currHeight;
  _titleContainer;
  _nav;
  _currSlideNum;

  constructor(objSelector) {
    this.obj = document.querySelector(objSelector);
    this._titleContainer = document.querySelector(`${objSelector}__title-container`);
    this._textContainer = document.querySelector(`${objSelector}__text-container`);
    this._textItemArr = this._textContainer.children;
    this._nav = document.querySelector(`${objSelector}__nav`);
    this._currSlideNum = 0;

  }

  launch() {
    this.computeHeight();

    if (this._titleContainer.children.length !== this._textContainer.children.length ||
        this._titleContainer.children.length !== this._nav.children.length) {
      throw new HeadSliderError('Number of title-block not equal number of text-block');
    }

    this.setNavHandler();

    window.addEventListener('resize', this.recomputeHeight.bind(this));
  }

  setNavHandler() {
    for (let i = 0; i < this._nav.children.length; i++) {
      this._nav.children[i].addEventListener('click', this.navHandler.bind(this));
    }
  }

  navHandler(event) {
    let target = event.currentTarget;
    let targetNum = target.dataset.num;

    if (targetNum !== this._currSlideNum) {
      this.slideOn(targetNum);
    }
  }

  slideOn(num) {
    this._titleContainer.children[this._currSlideNum].classList.remove('active');
    this._textContainer.children[this._currSlideNum].classList.remove('active');
    this._nav.children[this._currSlideNum].classList.remove('active');

    this._titleContainer.children[num].classList.add('active');
    this._textContainer.children[num].classList.add('active');
    this._nav.children[num].classList.add('active');

    this._currSlideNum = num;
  }

  computeHeight() {
    let maxHeight = this.findMaxItemHeight();

    this._textContainer.style.height = `${maxHeight}px`;
    this._currHeight = maxHeight;
  }

  findMaxItemHeight() {
    let max = 0;

    for (let i = 0; i < this._textItemArr.length; i++) {
      let height = this._textItemArr[i].clientHeight;
      if (max < height) {
        max = height;
      }
    }

    return max;
  }

  recomputeHeight() {
    let maxHeight = this.findMaxItemHeight();

    if (maxHeight !== this._currHeight) {
      this._textContainer.style.height = `${maxHeight}px`;
      this._currHeight = maxHeight;
    }
  }

  //TODO: Написать функции для обработки свайпа слайдов
}