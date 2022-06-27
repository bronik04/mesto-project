// Функция открытия Popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapeKey);
  // Обработчик закрытия Popup по клику на Overlay
  document.addEventListener("click", handleOverlay);
}

// Функция закрытия Popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscapeKey);
  document.removeEventListener("click", handleOverlay);
}

// Функция закрытия Popup по клику на Esc
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

// Функция очистки полей ошибок
export function cleanErrorText() {
  const errorList = document.querySelectorAll(".popup__error");
  errorList.forEach((error) => {
    error.textContent = "";
  });
}

export function cleanErrorUnderline() {
  const inputList = document.querySelectorAll(".popup__input");
  inputList.forEach((inputElement) => {
    inputElement.classList.remove("popup__input_type_error");
  });
}

export function handleActiveButton() {
  const buttonList = document.querySelectorAll(".popup__button");
  buttonList.forEach((buttonElement) => {
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.disabled = true;
  });
}

// Функция закрытия Popup по клику на Overlay
function handleOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

export { openPopup, closePopup, handleOverlay };
