// Функция zoom карточки
import { openPopup, closePopup } from "./utils.js";

// const popups = {
//   popupImageSelector: ".popup__image",
//   popupCaptionSelector: ".popup__caption",
//   popupTypeZoomSelector: ".popup_type_zoom",
// };

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

function handleCardClick(cardName, cardImgLink) {
  openPopup(popupTypeZoom);
  popupImage.src = cardImgLink;
  popupCaption.textContent = cardName;
  popupImage.alt = cardName;
}

// Функция открытия Popup профиль
function openPropfilePopup() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(popupEdit);
}

// Редактирование имени и информации о себе
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(popupEdit);
}

export { handleCardClick, openPropfilePopup, formSubmitHandler };
