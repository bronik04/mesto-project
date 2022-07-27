import Popup from 'Popup';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    super.open();
    this._popupTitle = this.popupSelector.querySelector(".");
    this._popupImg = this.popupSelector.querySelector(".");
  }
};
