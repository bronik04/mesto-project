export default class Section {
  constructor({ items, renderer }, contanierSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._contanier = document.querySelector(contanierSelector);
  }

  renderItems() {
    this._renderedItems.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(card) {
    this._container.prepend(card);
  }


};

