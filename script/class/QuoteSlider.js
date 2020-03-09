class QuoteSlider {
  obj;
  cssClass;

  _switchBlock;
  _itemArr;
  _itemGap;
  _activeItemNum;

  _nav;



  constructor(objSelector, cssClassName, activeItemNum) {
    this.obj = document.querySelector(objSelector);
    this.cssClass = cssClassName;
    this._activeItemNum = activeItemNum;

    this._switchBlock = this.obj.querySelector(`.${this.cssClass}__switch-block`);
    this._itemArr = this.obj.querySelectorAll(`.${this.cssClass}__switch-item`);
    this._itemGap = parseInt(getComputedStyle(this._itemArr[0]).gridRowGap);

    this._itemArr[this._activeItemNum].classList.add('active');

    this._nav = new InfinityCarousel('inf-carousel', 0.3, this.slideOn.bind(this));
    this._nav.setOn(`.${this.cssClass}__nav`);
  }


  computeHeight() {
    let maxHeight = this.findMaxItemHeight();

    this._switchBlock.style.height = `${maxHeight}px`;
    this._currHeight = maxHeight;
  }

  findMaxItemHeight() {
    let max = 0;

    for (let i = 0; i < this._itemArr.length; i++) {
      let height = this._itemArr[i].clientHeight;
      if (max < height) {
        max = height;
      }
    }

    return max;
  }

  slideOn(num) {
    this._itemArr[this._activeItemNum].classList.remove('active');
    this._activeItemNum = num;
    this._itemArr[this._activeItemNum].classList.add('active');
  }

  recomputeHeight() {
    let maxHeight = this.findMaxItemHeight();

    if (maxHeight !== this._currHeight) {
      this._switchBlock.style.height = `${maxHeight}px`;
      this._currHeight = maxHeight;
    }
  }

  launch() {
    this.computeHeight();
    window.addEventListener('resize', this.recomputeHeight.bind(this));
  }
}