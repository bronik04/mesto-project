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

// Функция закрытия Popup по клику на Overlay
export function handleOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}
