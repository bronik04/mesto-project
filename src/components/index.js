const popupAdd = document.querySelector(".popup_type_add");
const profileButton = document.querySelector(".profile__edit-button");
const newPlaceButton = document.querySelector(".profile__add-button");
const popupCloseButton = document.querySelectorAll(".popup__close-button");
const profileForm = document.querySelector(".popup__form_type_edit");

// Переменные из modal.js
const profileSubmitButton = document.querySelector(".popup__button_type_edit");

// Импорты
import "../pages/index.css";
import { enableValidation } from "./validate.js";
import { openPopup, closePopup, renderLoading } from "./utils.js";
import {
  handleNewPlaceFormSubmit,
  formNewPlace,
  renderCard,
  cardsContainer,
} from "./cards.js";

import {
  openProfilePopup as openProfilePopup,
  profileName,
  profileDescription,
  popupName,
  popupDescription,
  popupEdit,
  profileAvatar,
} from "./modal.js";

import { getUser, getInitialCards, editProfile } from "./api";

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

let userId;

// Получаем данные пользователя и карточки
Promise.all([getUser(), getInitialCards()]).then(([user, initialCards]) => {
  // Promise getUser()
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profileAvatar.src = user.avatar;
  userId = user._id;

  // Promise getInitialCards()
  initialCards.reverse().forEach((card) => {
    renderCard(card, cardsContainer, userId);
  });
});

// Редактирование имени и информации о себе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(profileSubmitButton, true);
  editProfile({ name: popupName.value, about: popupDescription.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(profileSubmitButton, false));
}

formNewPlace.addEventListener("submit", handleNewPlaceFormSubmit);
