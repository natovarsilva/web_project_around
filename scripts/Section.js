export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    this.items.forEach((item) => this._renderer(item)); // el array "items" se repetirá usando la función "renderer" para item (por ahora, si son varios agregar)
  }
  addItem(item) {
    this._containerSelector.prepend(item);
  }
}
