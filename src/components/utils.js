// Функция открытия Popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", pressKeyHeandler);
}

// Функция закрытия Popup
function closePopup(popup) {
  cleanErrorUnderline();
  cleanErrorText();
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", pressKeyHeandler);
}

// Функция закрытия Popup по клику на Esc
function pressKeyHeandler(evt) {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(activePopup);
  }
}

// Функция очистки полей ошибок
function cleanErrorText() {
  const errorList = document.querySelectorAll(".popup__error");
  errorList.forEach((error) => {
    error.textContent = "";
  });
}

function cleanErrorUnderline() {
  const inputList = document.querySelectorAll(".popup__input");
  inputList.forEach((inputElement) => {
    inputElement.classList.remove("popup__input_type_error");
  });
}

// Функция закрытия Popup по клику на Overlay
function clickOverlayHendler(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

export { openPopup, closePopup, clickOverlayHendler };
