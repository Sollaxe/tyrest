class ScrollComputer {
  constructor(compElemSelector) {
    this.scrollWidth = 0;
    this.elemSelector = compElemSelector;
  }

  calcScrollWidth() {
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    this.scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  }

  computeScroll() {
    this.calcScrollWidth();
    if (this.scrollWidth !== 0) {
      let style = document.createElement('style');
      style.innerHTML = `${this.elemSelector} {padding-right: ${this.scrollWidth}px`;
      document.head.append(style);
    }
  }
}