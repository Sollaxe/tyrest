
//TODO: Задокументировать, а также найти и убрать всякую грязь
class WorksNav {
  numPage; //Кол-во страниц
  nav; // Объект с навигацией
  navCarousel; // Карусель с элементами навигации

  _itemArr = []; // Массив с элементами навигации
  _activeItem; // Активный элемент навигации
  _activeItemIndex; // Индекс активного элемента навигации
  _arrowPrev; // Стрелка "назад"
  _arrowNext; // Стрелка "вперёд"

  _itemWidth; // - ширина элемента навигации
  _itemGap; // - отступы между элементами навигации
  _itemSpaceReq; // - item space requirement, или требование к пространству для одного элемента (ширина + отступ)
  _carouselWidth; // - ширина видимого окна карусели навигации
  _numMaxVisibleItem; // - максимальное количество видимых элементов навигации исходя из размера карусели
  _numVisibleItem; // - количество видимых элементов навигации исходя из кол-ва страниц, если "numPage" меньше "_numMaxVisibleItem", то равен "numPage", если нет, то равен _numMaxVisibleItem
  _carouselElemOffset; // - текущий отступ от начального положения карусели (в количестве элементов)
  _carouselOffset; // - текущий отступ от начального положения карусели (в пикселях)
  _itemAnimDuration;

  //Индекс последнего видимого элемента, вынесен отдельно так как вычисляется крайне нетривиальным образом
  //Мы изначально не знаем какой у нас элемент последний, поэтому перед отрисовкой элементов навигации приблизительно прикидываем на каком индексе последний элемент
  //Но если активный элемент отрисовывается не первым (а такое вполне возможно), то в цикле натыкаемся на элемент, которого не существует и начинаем отрисовывать
  //элементы слева от активного(т.е. в обратном порядке), а потом корректируем значение индекса
  _lastItemIndex;
  _firstItemIndex; //Индекс первого видимого элемента (с его вычислением всё гораздо проще);

  constructor(numPage, itemAnimDuration, toggleCallback) {
    this.numPage = numPage;
    this._itemAnimDuration = itemAnimDuration;
    this._toggleItemsCallback = toggleCallback;
  }

  createNavItem(num) {
    let item = document.createElement('div');
    item.className = 'works-popup__nav-item m_unselect';
    item.innerText = num;
    item.dataset.num = num;
    item.style.transform = 'scale(0)';
    item.style.animationDuration = this._itemAnimDuration + 's';
    return item;
  }

  createNav() {
    this.nav = document.createElement('nav');
    this.nav.className = 'works-popup__nav';

    this.bindSlideBack = this.slideBack.bind(this);
    this.bindSlideForward = this.slideForward.bind(this);

    {
      this._arrowPrev = document.createElement('div');
      this._arrowPrev.className = 'works-popup__nav-arrow icon';
      this._arrowPrev.style.backgroundImage = 'url(\'/style/style-image/icon/dark-arrow-left-icon.png\')';
      this._arrowPrev.addEventListener('click', this.bindSlideBack);
      this.nav.append(this._arrowPrev);

      this.navCarousel = document.createElement('div');
      this.navCarousel.className = 'works-popup__nav-carousel';
      this.nav.append(this.navCarousel);
      {
        this.navContainer = document.createElement('div');
        this.navContainer.className = 'works-popup__nav-container';
        this.navContainer.style.marginLeft = '0px';
        this.navContainer.style.transition = this._itemAnimDuration + 's';
        this.navCarousel.append(this.navContainer);
        {
          for (let i = 0; i < this.numPage; i++) {
            let currNavItem = this.createNavItem(i + 1);
            this._itemArr[i] = currNavItem;
            this.navContainer.append(currNavItem);
          }
        }
      }

      this._arrowNext = document.createElement('div');
      this._arrowNext.className = 'works-popup__nav-arrow icon';
      this._arrowNext.style.backgroundImage = 'url(\'/style/style-image/icon/dark-arrow-right-icon.png\')';
      this._arrowNext.addEventListener('click', this.bindSlideForward);
      this.nav.append(this._arrowNext);
    }

    this._carouselElemOffset = 0;
    return this.nav;
  }

  activateItem(index) {
    if (this._activeItem !== undefined) {
      this._activeItem.classList.remove('active');
    }

    this._activeItemIndex = index;

    this._activeItem = this._itemArr[index];
    this._activeItem.classList.add('active');
  }

  launch(index) {
    let self = this;
    this.activateItem(index);
    this.computeGeometry();
    this.drawItem();

    this._itemArr.forEach(function (item) {
      item.addEventListener('click', self.navItemHandler.bind(self));
    });
  }

  async navItemHandler(event) {
    let currElem = event.currentTarget;
    if (currElem !== self._activeItem) {
      let currPage = +currElem.dataset.num;

      try {
        this._toggleItemsCallback(currPage);
      } catch (e) {
        alert(e.message);
        throw e;
      }

      this.activateItem(currPage - 1);
    }
  }

  //Вычисление геометрии карусели
  computeGeometry() {
    let containerStyle = getComputedStyle(this.navContainer);
    let carouselStyle = getComputedStyle(this.navCarousel);
    let itemStyle = getComputedStyle(this._itemArr[0]);

    this._itemWidth = parseInt(itemStyle.width);
    this._itemGap = parseInt(containerStyle.gridColumnGap);
    this._itemSpaceReq = this._itemWidth + this._itemGap;

    this._carouselWidth = parseInt(carouselStyle.maxWidth);
    this._carouselOffset = parseInt(this.navContainer.style.marginLeft);

    this.computeVisibleItem();

    let bindRecomputeGeometry = this.recomputeGeometry.bind(this);
    let bindRedrawItem = this.redrawItem.bind(this);
    window.addEventListener('resize', function () {
      bindRecomputeGeometry();
      bindRedrawItem();
    });
  }

  //Перевычисление геометрии
  recomputeGeometry() {
    let currWidth = parseInt(getComputedStyle(this.navCarousel).maxWidth);
    if (this._carouselWidth !== currWidth) {
      this._carouselWidth = currWidth;
      this.computeVisibleItem();
    }
  }

  //Вычисление параметров для видимых элементов навигации
  computeVisibleItem() {
    //Мы прибавляем к ширине карусели ширину отступа, так как у последнего элемента навигации нет отступа и количество видимых элементов, без этого, вычисляется неверно
    this._numMaxVisibleItem = (this._carouselWidth + this._itemGap) / this._itemSpaceReq;
    this._numVisibleItem = this.numPage < this._numMaxVisibleItem ? this.numPage : this._numMaxVisibleItem;

    //Индекс первого видимого элемента,
    //Так как он может быть не в начале окна карусели, а, например в середине, то мы пытаемся на него перейти
    //функция перехода к элементу возвратит уже индекс того элемента, который по факту находится в начале
    this._firstItemIndex = this.slideOnItem(this._activeItemIndex);

    this._lastItemIndex = (this._firstItemIndex + this._numVisibleItem) - 1; //вычисление индекса последнего видимого элемента
  }

  //Перейти на один элемент вперёд
  slideForward() {
    if (this._carouselElemOffset + this._numVisibleItem < this.numPage) {
      let self = this;
      this._arrowNext.removeEventListener('click', this.bindSlideForward);

      this._itemArr[this._firstItemIndex].style.transform = 'scale(0)';
      this._firstItemIndex++;

      this._carouselOffset += this._itemSpaceReq;
      this.navContainer.style.marginLeft = '-' + this._carouselOffset + 'px';
      this._carouselElemOffset++;

      this._lastItemIndex++;
      this._itemArr[this._lastItemIndex].style.transform = 'scale(1)';

      setTimeout(function () {
        self._arrowNext.addEventListener('click', self.bindSlideForward)
      }, this._itemAnimDuration * 1000);
    } else {
      return false;
    }
  }

  //Перейти на один элемент назад
  slideBack() {
    if (this._carouselElemOffset > 0) {
      let self = this;
      this._arrowPrev.removeEventListener('click', this.bindSlideBack);

      this._itemArr[this._lastItemIndex].style.transform = 'scale(0)';
      this._lastItemIndex--;

      this._carouselOffset -= this._itemSpaceReq;
      this.navContainer.style.marginLeft = '-' + this._carouselOffset + 'px';
      this._carouselElemOffset--;

      this._firstItemIndex--;
      this._itemArr[this._firstItemIndex].style.transform = 'scale(1)';

      setTimeout(function () {
        self._arrowPrev.addEventListener('click', self.bindSlideBack)
      }, this._itemAnimDuration * 1000);
    } else {
      return false;
    }
  }

  //Переход на индекс
  slideOnItem(index) {
    for (let i = index; i >= 0; i--) {
      if (i + this._numVisibleItem <= this.numPage) {
        this._carouselOffset = this._itemSpaceReq * i;
        this.navContainer.style.marginLeft = '-' + this._carouselOffset + 'px';
        this._carouselElemOffset = i;
        return i;
      }
    }
  }

  //Отрисовка элементов
  drawItem() {
    //Отрисовка видимых элементов навигации
    for (let i = this._firstItemIndex; i <= this._lastItemIndex; i++) {
      let currItem = this._itemArr[i];
      if (currItem !== undefined) {
        currItem.style.transform = 'scale(1)';
      }
    }
  }

  //Переотрисовка элементов
  redrawItem() {
    for (let i = this._firstItemIndex; i <= this._lastItemIndex; i++) {
      this._itemArr[i].style.transform = 'scale(0)';
    }

    this.drawItem();
  }
}