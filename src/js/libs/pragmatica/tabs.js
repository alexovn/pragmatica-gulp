export class PragmaTabs {
  constructor(selector, options) {
    this.el = document.querySelector(selector);

    this.init();
  }
  clickHandler(event) {
    if (event.target.classList.contains("pragma-tabs__control")) {
      event.preventDefault();
      let item = event.target;
      if (!item.classList.contains("active")) {
        this.removeActiveAll();
        let content = document.querySelector(item.attributes.href.value);
        item.classList.add("active");
        content.classList.add("active");
      }
    }
  }
  removeActiveAll() {
    let active = this.el.querySelectorAll(".active");
    for (let i = 0; i < active.length; i++) {
      const element = active[i];
      element.classList.remove("active");
    }
  }
  init() {
    if (!this.el) return false;
    this.clickHandler = this.clickHandler.bind(this);
    this.el.addEventListener("click", this.clickHandler);
    this.el.classList.add("pragma-tabs-initialized");
  }
  destroy() {
    this.el.removeEventListener("click", this.clickHandler);
    this.el.classList.remove("pragma-tabs-initialized");
  }
}
