class ScrollComputer {
  constructor() {
    this.scrollWidth = null;
  }

  static calcScrollWidth() {
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    this.scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  }

  static computeScroll(compElemSelector) {
    if (this.scrollWidth !== null) {
      let style = document.createElement('style');
      style.innerHTML = `${compElemSelector} {padding-right: ${this.scrollWidth}px`;
      document.head.append(style);
    }
  }
}

ScrollComputer.calcScrollWidth();