export const popupAdd = document.querySelector(".popup_type_add");
export const profileButton = document.querySelector(".profile__edit-button");
export const newPlaceButton = document.querySelector(".profile__add-button");
export const popupCloseButton = document.querySelectorAll(".popup__close-button");
export const profileForm = document.querySelector(".popup__form_type_edit");
// Переменные из modal.js
export const profileSubmitButton = document.querySelector(".popup__button_type_edit");
export const avatarButton = document.querySelector(".profile__avatar-button");
export const avatarChangeForm = document.querySelector(".popup__form_type_avatar");
export const avatarPopup = document.querySelector(".popup_type_avatar");
export const profileAvatar = document.querySelector(".profile__avatar");
export const avatarInput = document.querySelector(".popup__input_type_avatar-link");
export const avatarSubmitButton = document.querySelector(".popup__button_type_avatar");
// Переменные из cards.js
export const placeSubmitButton = document.querySelector(".popup__button_type_img");
export const placeName = document.querySelector(".popup__input_type_place-name");
export const placeLink = document.querySelector(".popup__input_type_place-link");
export const popupTypeAdd = document.querySelector(".popup_type_add");
export const formNewPlace = document.querySelector(".popup__form_type_add-img");
export const cardsContainer = document.querySelector(".elements");
export const newPlaceSubmitButton = document.querySelector(".popup__button_type_img");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
export const popupImage = document.querySelector(".popup__image");
export const popupCaption = document.querySelector(".popup__caption");
export const popupTypeZoom = document.querySelector(".popup_type_zoom");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupName = popupEdit.querySelector(".popup__input_type_name");
export const popupDescription = popupEdit.querySelector(
  ".popup__input_type_description"
);

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
}
