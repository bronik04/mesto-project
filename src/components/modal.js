// Функция zoom карточки
import {
  openPopup,
  closePopup,
  cleanErrorUnderline,
  cleanErrorText,
} from "./utils.js";

import { editAvatar, editProfile } from "./api.js";


export const profileName = document.querySelector(".profile__name");
export const profileDescription = document
  .querySelector(".profile__description");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeZoom = document.querySelector(".popup_type_zoom");
const popupEdit = document.querySelector(".popup_type_edit");
export const popupName = popupEdit
  .querySelector(".popup__input_type_name");
export const popupDescription = popupEdit
  .querySelector(".popup__input_type_description");

const avatarButton = document
  .querySelector(".profile__avatar-button");
const avatarChangeForm = document
  .querySelector(".popup__form_type_avatar");
const avatarPopup = document
  .querySelector(".popup_type_avatar");
export const profileAvatar = document
  .querySelector(".profile__avatar");
const avatarInput = document
  .querySelector(".popup__input_type_avatar-link");

export function handleCardClick(cardName, cardImgLink) {
  openPopup(popupTypeZoom);
  popupImage.src = cardImgLink;
  popupCaption.textContent = cardName;
  popupImage.alt = cardName;
}

// Функция открытия Popup профиль
export function openProfilePopup() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(popupEdit);
  cleanErrorUnderline();
  cleanErrorText();
}

// Редактирование имени и информации о себе
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  editProfile({ name: popupName.value, about: popupDescription.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEdit);
    })
    .catch((err) => console.log(err));
}


// Попап аватара
avatarButton.addEventListener("click", () => {
  openPopup(avatarPopup);
  cleanErrorUnderline();
  cleanErrorText();
  // todo Очищать поле после закрытия попапа
})

// Изменение Аватара 
function changeAvatarSubmit(evt) {
  evt.preventDefault();
  editAvatar({ avatar: avatarInput.value })
    .then((editData) => {
      profileAvatar.src = editData.avatar;
    })
    .catch((err) => console.log(err));
  // profileAvatar.src = avatarInput.value;
  avatarChangeForm.reset();
  closePopup(avatarPopup);
}

avatarChangeForm.addEventListener("submit", changeAvatarSubmit)

