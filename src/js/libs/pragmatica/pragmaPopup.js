export default class pragmaPopup {
    constructor(selector, options = "") {
      this.el = selector || document.querySelector("[data-modal-popup]");

      this.window = document.querySelector(this.el.attributes.href.value);
      this.overlay =
        document.querySelector(options.overlayClass) ||
        this.window.querySelector("[data-modal-overlay]");

      this.init();
    }

    init() {
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.el.addEventListener("click", this.open);
      this.overlay.addEventListener("click", this.close);
    }

    open(e) {
      e.preventDefault(e);
      this.window.classList.add("content-show");
    }

    close() {
      this.window.classList.remove("content-show");
    }

    destroy() {
      this.close();
      this.el.removeEventListener("click", this.open);
      this.overlay.removeEventListener("click", this.close);
    }
  }