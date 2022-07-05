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
  renderCard,
  cardsContainer
} from "./cards.js";

import {
  openProfilePopup as openProfilePopup,
  handleProfileFormSubmit,
  profileName,
  profileDescription,
  profileAvatar,
} from "./modal.js";

import { getUser, getInitialCards } from "./api";


enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

profileButton.addEventListener("click", openProfilePopup);

popupCloseButton.forEach((item) => {
  item.addEventListener("click", () => closePopup(item.closest(".popup")));
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

newPlaceButton.addEventListener("click", () => openPopup(popupAdd));

formNewPlace.addEventListener("submit", handleNewPlaceFormSubmit);

let userId;
// Получаем данные пользователя

Promise.all([getUser(), getInitialCards()])
  .then(([user, initialCards]) => {
    // Promise getUser()
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.src = user.avatar;
    userId = user._id;

    // Promise getInitialCards()
    initialCards.reverse().forEach((card) => {
      renderCard(card, cardsContainer, userId);
    })
  })
