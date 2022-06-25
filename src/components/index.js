const popupAdd = document.querySelector(".popup_type_add");
const profileButton = document.querySelector(".profile__edit-button");
const newPlaceButton = document.querySelector(".profile__add-button");
const popupCloseButton = document.querySelectorAll(".popup__close-button");

const formElement = document.querySelector(".popup__form_type_edit");
// const formElement = document.forms.profile_edit_form;
// Импорты
import { enableValidation } from "./validate.js";
import { openPopup, closePopup, clickOverlayHendler } from "./utils.js";
import { addSubmitHandler, formNewPlace } from "./cards.js";
import { openPropfilePopup, formSubmitHandler } from "./modal.js";

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

// Обработчик закрытия Popup по клику на Overlay
document.addEventListener("click", clickOverlayHendler);

profileButton.addEventListener("click", openPropfilePopup);

popupCloseButton.forEach((item) => {
  item.addEventListener("click", () => closePopup(item.closest(".popup")));
});

formElement.addEventListener("submit", formSubmitHandler);

// 3. Форма добавления карточки

newPlaceButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

formNewPlace.addEventListener("submit", addSubmitHandler);
