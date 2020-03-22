
/**
 * @class ProjectCarousel
 *
 * @method constructor
 *    @param str theme - Тема карусели
 *
 * @method setNavHandlers - Установить обработчики на элементы навигации
 * @method navItemHandler - Обработчик элементов навигации
 * @method slideNext - Переключить на след.слайд
 * @method slidePrev - Переключить на пред.слайд
 *
 * @method slideOn - Переключить на N-ый слайд
 *    @param int id - Идентификатор слайда(отсчёт с нуля)
 *
 * @method createItem - Создать слайд
 *    @param obj data - Объект с данными слайда
 *        @property string img_name - Имя файла с картинкой
 *
 * @method createNavItem - Создать элемент навигации
 *    @param int num - Номер элемента навигации(отсчёт с нуля)
 *
 * @method create - Создать карусель и вставить в родительский элемент
 *    @param array dataArray - массив с данными карусели
 *    @param DOM parentElem - Родительский элемент
 *
 * @method changeContent - Изменить контент карусели(слайды и навигацию)
 *    @param array dataArray - Новый массив с данными карусели
 *
 * TODO: Пересмотреть функционал данного метода и переделать(при надобности)
 * @method deactivate - Сброс обработчиков с панели навигации карусели
 *
 * @property string _styleTheme - Тема карусели
 * @property int _currSlideId - Идентификатор текущего слайда(отсчёт с нуля)
 * @property int _currNumSlide - Текущее количество слайдов
 * @property array _navItemArray - Массив с DOM элементами навигации
 * @property array _itemArray - Массив с DOM элементами слайдов
 *
 * @property DOM arrNext - Кнопка "Вперёд"
 * @property DOM arrPrev - Кнопка "Назад"
 * @property DOM nav - Навигация
 * @property DOM itemContainer - Контейнер со слайдами
 * @property DOM obj - Карусель
 */
class ProjectCarousel {
  _styleTheme;
  _currSlideId;
  _currNumSlide;
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
    for (let i = 0; i < this.nav.children.length; i++) {
      this.nav.children[i].addEventListener('click', this.navItemHandler.bind(this));
    }
  }

  //TODO: Попробовать вынести объявление этой функции в конструтор и сразу её там привязать к контексту (дабы не плодить методы)
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

  createItem(img_name) {
    let imgContainer = document.createElement('div');
    imgContainer.className = 'project-carousel__item';
    {
      let img = document.createElement('img');
      img.className = 'project-carousel__item-img';
      img.src = `/style/upd-image/works/${img_name}`;
      img.alt = img_name;
      imgContainer.append(img);
    }

    return imgContainer;
  }

  createNavItem(num) {
    let navItem = document.createElement('div');
    navItem.className = 'project-carousel__nav-item';
    navItem.dataset.num = String(num);
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
      this._navItemArray[i] = item;
      this.nav.append(item);
    }

    this.slideOn(0);
    this.setNavHandlers();
  }

  deactivate() {
    this._currSlideId = null;
    for (let i = 0; i < this.nav.children.length; i++) {
      this.nav.children[i].removeEventListener('click', this._bindItemHandler);
    }
  }
}