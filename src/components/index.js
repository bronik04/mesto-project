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
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeZoom = document.querySelector(".popup_type_zoom");
const popupEdit = document.querySelector(".popup_type_edit");
const popupName = popupEdit.querySelector(".popup__input_type_name");
const popupDescription = popupEdit.querySelector(
  ".popup__input_type_description"
);
let userId;
// Импорты
import "../pages/index.css";
import FormValidator from "./FormValidator.js";
import {
  renderLoading,
  cleanErrorUnderline,
  cleanErrorText,
  disableButton,
} from "./utils.js";

import { createCard } from "./cards.js";

import { openPopup, closePopup } from "./modal.js";

import Api from "./Api";
import Section from "./Section";
import { apiConfig, validationConfig, userConfig } from "../utils/data";
import UserInfo from "./UserInfo";


const api = new Api(apiConfig);
const userInfo = new UserInfo(userConfig);





const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(validationConfig, avatarChangeForm);
avatarFormValidation.enableValidation();

const placeFormValidation = new FormValidator(validationConfig, formNewPlace);
placeFormValidation.enableValidation();


popupCloseButton.forEach((item) => {
  item.addEventListener("click", () => closePopup(item.closest(".popup")));
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
newPlaceButton.addEventListener("click", () => openPopup(popupAdd));

// Получаем данные пользователя и карточки
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, initialCards]) => {
    console.log(user);
    userInfo.setUserInfo(user);
    userId = user._id;

    // Promise getInitialCards()
    // const cardList = new Section({
    //   items: initialCards,
    //   renderer: () => {
    //     cardList.renderItems();
    //     cardList.addItem();
    //   }
    // }, ".elements"
    // );

    initialCards.reverse().forEach((card) => {
      renderCard(
        card,
        cardsContainer,
        userId,
        handleToggleLike,
        removeCard,
        handleCardClick
      );
    });
  });

// Функция рендера карточек
function renderCard(
  cardElement,
  container,
  userId,
  handleToggleLike,
  removeCard,
  handleCardClick
) {
  container.prepend(
    createCard(
      cardElement,
      userId,
      handleToggleLike,
      removeCard,
      handleCardClick
    )
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

  api.addCards(inputElement)
    .then((cardData) => {
      renderCard(
        cardData,
        cardsContainer,
        userId,
        handleToggleLike,
        removeCard,
        handleCardClick
      );
      closePopup(popupTypeAdd);
      disableButton(newPlaceSubmitButton);
      formNewPlace.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(placeSubmitButton, false));
}

formNewPlace.addEventListener("submit", handleNewPlaceFormSubmit);

// Редактирование имени и информации о себе
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(profileSubmitButton, true);
  api.editProfile({ name: popupName.value, about: popupDescription.value })
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
      avatarChangeForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(avatarSubmitButton, false));
}

avatarChangeForm.addEventListener("submit", changeAvatarSubmit);

function handleToggleLike(evt, cardId, likesNumber, card) {
  likesNumber.textContent = card.likes.length;
  if (!evt.target.classList.contains("element__heart_active")) {
    api.addLike(cardId)
      .then((data) => {
        evt.target.classList.toggle("element__heart_active");
        likesNumber.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.removeLike(cardId)
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
// Обработчик zoom карточки
function handleCardClick(cardName, cardImgLink) {
  openPopup(popupTypeZoom);
  popupImage.src = cardImgLink;
  popupCaption.textContent = cardName;
  popupImage.alt = cardName;
}

// Функция открытия Popup профиль
function openProfilePopup() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(popupEdit);
  cleanErrorUnderline();
  cleanErrorText();
}

profileButton.addEventListener("click", openProfilePopup);

// Александр, это было "больно", но необходимо! Спаосибо за исправления!
