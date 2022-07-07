export function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

// Функция открытия Popup
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapeKey);
  document.addEventListener("click", handleOverlay);
}

// Функция закрытия Popup
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscapeKey);
  document.removeEventListener("click", handleOverlay);
}

// Функция закрытия Popup по клику на Esc
export function handleEscapeKey(evt) {
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

export function disableButton(buttonElement) {
  buttonElement.classList.add("popup__button_disabled");
  buttonElement.disabled = true;
}

// Функция закрытия Popup по клику на Overlay
export function handleOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}
