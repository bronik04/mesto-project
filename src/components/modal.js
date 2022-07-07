// Функция zoom карточки
import { openPopup, cleanErrorUnderline, cleanErrorText } from "./utils.js";

export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeZoom = document.querySelector(".popup_type_zoom");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupName = popupEdit.querySelector(".popup__input_type_name");
export const popupDescription = popupEdit.querySelector(
  ".popup__input_type_description"
);

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
