export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add(".popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleClickOverlay);


  }

  close() {
    this._popup.classList.remove(".popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleClickOverlay);
  }

  _handleEscClose = (evt) => {
    evt.key === "Escape" && this.close();
  };

  _handleClickOverlay = (evt) => {
    evt.target.classList.contains("popup_opened") && this.close();
  };


  setEventListeners() {
    this._popup.querySelector(".popup__close-button")
      .addEventListener("click", () => this.close);
  }
};
