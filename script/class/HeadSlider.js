class HeadSlider {
  obj;

  _textContainer;
  _titleContainer;
  _nav;
  _currSlideNum;

  constructor(objSelector) {
    this.obj = document.querySelector(objSelector);
    this._titleContainer = document.querySelector(`${objSelector}__title-container`);
    this._textContainer = document.querySelector(`${objSelector}__text-container`);
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
    let arr = this._textContainer.children;
    let max = 0;

    for (let i = 0; i < arr.length; i++) {
      let height = arr[i].clientHeight;
      max = (max < height) ? height : max;
    }

    this._textContainer.style.height = `${max}px`;
  }

  //TODO: Написать функции для обработки свайпа слайдов
}