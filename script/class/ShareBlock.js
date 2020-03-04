class ShareBlock {
  _styleTheme;
  obj;

  constructor(theme) {
    this._styleTheme = theme;
  }

  // itemData = {
  //   icon_name: 'str',
  //   soc_name: 'str'
  // };
  createItem(itemData) {
    let item = document.createElement('div');
    item.className = 'social-share__item';
    item.dataset.socialName = itemData.soc_name;
    {
      let icon = document.createElement('div');
      icon.className = 'social-share__icon';
      icon.style.backgroundImage = `url(\'/style/upd-image/social-net/${this._styleTheme}/${itemData.icon_name}\')`;
      item.append(icon);
    }

    return item;
  }

  // dataArray = [
  //   {
  //     icon_name: 'str',
  //     soc_name: 'str'
  //   }
  // ];
  create(dataArray, parentElem) {
    let self = this;

    this.obj = document.createElement('div');
    this.obj.className = `social-share ${this._styleTheme} project-popup__social-share`;

    dataArray.forEach(function (itemData) {
      self.obj.append(self.createItem(itemData));
    });

    parentElem.append(this.obj);
  }
}