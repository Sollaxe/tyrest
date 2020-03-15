class HeadSlider {
  obj;

  _noteRequester = new Requester('GET');

  _btnMore;
  _notePopup;

  _textContainer;
  _textItemArr;
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

    this._btnMore = this.obj.querySelector(`${objSelector}__btn-more`);
  }

  launch() {
    this.computeHeight();

    if (this._titleContainer.children.length !== this._textContainer.children.length ||
        this._titleContainer.children.length !== this._nav.children.length) {
      throw new HeadSliderError('Number of title-block not equal number of text-block');
    }

    let currTitleItem = this._titleContainer.children[0];
    let currTextItem = this._textContainer.children[0];

    this.obj.dataset.currId = currTextItem.dataset.id;

    currTitleItem.classList.add('active');
    currTextItem.classList.add('active');
    this._nav.children[0].classList.add('active');

    this.setNavHandler();
    this._btnMore.addEventListener('click', this.btnHandler.bind(this));
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

  async btnHandler() {

    let itemId = +this.obj.dataset.currId;
    let dataNote = null;

    try {
      dataNote = await this.getNoteData(itemId);
    } catch (e) {
      alert(e.message); //TODO: Сделать в этом месте вызов окна пользовательской ошибки
      return;
    }

    if (this._notePopup === undefined) {
      this._notePopup = new NotePopup(0.2, 'theme_emerald', 'small');
    }

    this._notePopup.open(dataNote);
  }

  /**
   *
   * @param id
   * @return obj
   */
  async getNoteData(id) {
    await this._noteRequester.sendRequest('test.php', {
      id: id,
    });
    return await this._noteRequester.getResult();
  }

  slideOn(num) {
    this._titleContainer.children[this._currSlideNum].classList.remove('active');
    this._textContainer.children[this._currSlideNum].classList.remove('active');
    this._nav.children[this._currSlideNum].classList.remove('active');

    let currTitleItem = this._titleContainer.children[num];
    let currTextItem = this._textContainer.children[num];

    this.obj.dataset.currId = currTextItem.dataset.id;

    currTitleItem.classList.add('active');
    currTextItem.classList.add('active');
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