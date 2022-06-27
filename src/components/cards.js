// eslint-disable-next-line no-unused-vars
const initialCards = [
  {
    name: "Алмазная шахта «Мир», Якутия",
    link: "https://static.tildacdn.com/tild6336-3238-4436-b966-313836346165/02_shachta_mir.jpg",
  },
  {
    name: "Ординская пещера, Пермский край",
    link: "https://static.tildacdn.com/tild3931-6539-4230-b733-383936376339/03_ordinskaya_pesher.jpg",
  },
  {
    name: "Соловецкий монастырь, Архангельская область",
    link: "https://static.tildacdn.com/tild6130-6139-4366-b034-383961383638/04_Solovki.jpg",
  },
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const popupTypeAdd = document.querySelector(".popup_type_add");
const placeName = document.querySelector(".popup__input_type_place-name");
const placeLink = document.querySelector(".popup__input_type_place-link");
const formNewPlace = document.querySelector(".popup__form_type_add-img");

import { handleCardClick } from "./modal.js";
import { closePopup, handleActiveButton } from "./utils.js";

// Создаем новую карточку
function createCards(cardName, cardImgLink) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__img");

  cardElement.querySelector(".element__text").textContent = cardName;
  elementImage.src = cardImgLink;
  elementImage.alt = cardName;

  // Добавление лайков
  cardElement
    .querySelector(".element__heart")
    .addEventListener("click", toggleLike);

  // Удаление карточки
  cardElement
    .querySelector(".element__trash-button")
    .addEventListener("click", removeCard);

  // Зум карточки
  elementImage.addEventListener("click", () =>
    handleCardClick(cardName, cardImgLink)
  );

  return cardElement;
}
// Функция рендера карточек

function renderCard(name, url, contanier) {
  const card = createCards(name, url);
  contanier.prepend(card);
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link, cardsContainer);
});

// Функция добавления лайка
function toggleLike(evt) {
  evt.target.classList.toggle("element__heart_active");
}

// Функция удаления карточки
function removeCard(evt) {
  evt.target.closest(".element").remove();
}

// 4. Добавление карточки

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  renderCard(placeName.value, placeLink.value, cardsContainer);
  formNewPlace.reset();
  closePopup(popupTypeAdd);
  handleActiveButton();
}

export { handleNewPlaceFormSubmit, formNewPlace };
