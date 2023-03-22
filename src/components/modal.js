export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapeKey);
  document.addEventListener("click", handleOverlay);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscapeKey);
  document.removeEventListener("click", handleOverlay);
}

export function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

export function handleOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}
