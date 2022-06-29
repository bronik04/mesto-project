const popupAdd = document.querySelector(".popup_type_add");
const profileButton = document.querySelector(".profile__edit-button");
export const newPlaceButton = document.querySelector(".profile__add-button");
const popupCloseButton = document.querySelectorAll(".popup__close-button");
const profileForm = document.querySelector(".popup__form_type_edit");
const prifileAvatar = document.querySelector(".profile__avatar");
// Импорты
import "../pages/index.css";
import { enableValidation } from "./validate.js";
import { openPopup, closePopup } from "./utils.js";
import {
  handleNewPlaceFormSubmit,
  formNewPlace,
  placeName,
  placeLink,
  renderCard,
  cardsContainer,
} from "./cards.js";

import {
  openPropfilePopup,
  handleProfileFormSubmit,
  profileName,
  profileDescription,
} from "./modal.js";

import { getUser, getInitialCards, editProfile, addCards } from "./api.js";
import { data } from "autoprefixer";

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
    prifileAvatar.src = data.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

const nameObj = {
  name: "Marie Skłodowska Curie",
  about: "Physicist and Chemist",
};

// Редактируем данные пользователя
editProfile(nameObj).then((data) => {
  console.log(data);
});

// Получаем карточки
getInitialCards()
  .then((initialCards) => {
    initialCards.forEach((card) => {
      console.log(card);
      renderCard(card.name, card.link, cardsContainer);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// addCards().then();
