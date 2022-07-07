const popupAdd = document.querySelector(".popup_type_add");
const profileButton = document.querySelector(".profile__edit-button");
const newPlaceButton = document.querySelector(".profile__add-button");
const popupCloseButton = document.querySelectorAll(".popup__close-button");
const profileForm = document.querySelector(".popup__form_type_edit");
// Переменные из modal.js
const profileSubmitButton = document.querySelector(".popup__button_type_edit");
const avatarButton = document.querySelector(".profile__avatar-button");
const avatarChangeForm = document.querySelector(".popup__form_type_avatar");
const avatarPopup = document.querySelector(".popup_type_avatar");
const profileAvatar = document.querySelector(".profile__avatar");
const avatarInput = document.querySelector(".popup__input_type_avatar-link");
const avatarSubmitButton = document.querySelector(".popup__button_type_avatar");
// Переменные из cards.js
const placeSubmitButton = document.querySelector(".popup__button_type_img");
const placeName = document.querySelector(".popup__input_type_place-name");
const placeLink = document.querySelector(".popup__input_type_place-link");
const popupTypeAdd = document.querySelector(".popup_type_add");
const formNewPlace = document.querySelector(".popup__form_type_add-img");
const cardsContainer = document.querySelector(".elements");
const newPlaceSubmitButton = document.querySelector(".popup__button_type_img");

// Импорты
import "../pages/index.css";
import { enableValidation } from "./validate.js";
import {
  openPopup,
  closePopup,
  renderLoading,
  cleanErrorUnderline,
  cleanErrorText,
  disableButton,
} from "./utils.js";

import { createCard } from "./cards.js";

import {
  openProfilePopup as openProfilePopup,
  profileName,
  profileDescription,
  popupName,
  popupDescription,
  popupEdit,
} from "./modal.js";

import {
  getUser,
  getInitialCards,
  editProfile,
  editAvatar,
  addCards,
  deleteCards,
  addLike,
  removeLike,
} from "./api";

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
    renderCard(card, cardsContainer, userId, handleToggleLike, removeCard);
  });
});

// Функция рендера карточек
function renderCard(
  cardElement,
  container,
  userId,
  handleToggleLike,
  removeCard
) {
  container.prepend(
    createCard(cardElement, userId, handleToggleLike, removeCard)
  );
}

// Обработчик добавления новой карточки
function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  const inputElement = {
    name: placeName.value,
    link: placeLink.value,
  };
  renderLoading(placeSubmitButton, true);
  addCards(inputElement)
    .then((cardData) => {
      renderCard(
        cardData,
        cardsContainer,
        userId,
        removeCard,
        handleToggleLike
      );
      closePopup(popupTypeAdd);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(placeSubmitButton, false));

  disableButton(newPlaceSubmitButton);

  formNewPlace.reset();
}

formNewPlace.addEventListener("submit", handleNewPlaceFormSubmit);

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

// Попап аватара
avatarButton.addEventListener("click", () => {
  openPopup(avatarPopup);
  cleanErrorUnderline();
  cleanErrorText();
  disableButton(avatarSubmitButton);
  avatarChangeForm.reset();
});

// Изменение Аватара
function changeAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(avatarSubmitButton, true);
  editAvatar({ avatar: avatarInput.value })
    .then((editData) => {
      profileAvatar.src = editData.avatar;
      closePopup(avatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(avatarSubmitButton, false));
  avatarChangeForm.reset();
}

avatarChangeForm.addEventListener("submit", changeAvatarSubmit);

function handleToggleLike(evt, cardId, likesNumber, card) {
  likesNumber.textContent = card.likes.length;
  if (!evt.target.classList.contains("element__heart_active")) {
    addLike(cardId)
      .then((data) => {
        evt.target.classList.toggle("element__heart_active");
        likesNumber.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    removeLike(cardId)
      .then((data) => {
        evt.target.classList.toggle("element__heart_active");
        likesNumber.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Функция удаления карточки
function removeCard(evt, cardId) {
  deleteCards(cardId)
    .then(() => {
      evt.target.closest(".element").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}
