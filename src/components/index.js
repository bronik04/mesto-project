const popupAdd = document.querySelector(".popup_type_add");
const profileButton = document.querySelector(".profile__edit-button");
export const newPlaceButton = document.querySelector(".profile__add-button");
const popupCloseButton = document.querySelectorAll(".popup__close-button");
const profileForm = document.querySelector(".popup__form_type_edit");

// Импорты
import "../pages/index.css";
import { enableValidation } from "./validate.js";
import { openPopup, closePopup } from "./utils.js";
import {
  handleNewPlaceFormSubmit,
  formNewPlace,
} from "./cards.js";

import {
  openPropfilePopup,
  handleProfileFormSubmit,
  profileName,
  profileDescription,
  profileAvatar,
} from "./modal.js";

import { getUser } from "./api";


enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

profileButton.addEventListener("click", openPropfilePopup);

popupCloseButton.forEach((item) => {
  item.addEventListener("click", () => closePopup(item.closest(".popup")));
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

// 3. Форма добавления карточки

newPlaceButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

formNewPlace.addEventListener("submit", handleNewPlaceFormSubmit);
// Получаем данные пользователя
getUser()
  .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.src = data.avatar;
  })
  .catch((err) => {
    console.log(err);
  });


