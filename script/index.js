let popup = document.querySelector(".popup");
let popupEdit = document.querySelector(".popup_type_edit");
let popupAdd = document.querySelector(".popup_type_add");
let editButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");
let closeButton = document.querySelector(".popup__close-button");
let ProfileName = document.querySelector(".profile__name");
let ProfileDescription = document.querySelector(".profile__description");
let PopupName = document.querySelector(".popup__text-field_type_name");
let PopupDescription = document.querySelector(
  ".popup__text-field_type_description"
);

PopupName.value = ProfileName.textContent;
PopupDescription.value = ProfileDescription.textContent;

editButton.addEventListener("click", function () {
  popupEdit.classList.add("popup_opened");
});

addButton.addEventListener("click", function () {
  popupAdd.classList.add("popup_opened");
});

closeButton.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

// Пункт второй. Редактирование имени и информации о себе

const formElement = document.querySelector(".popup__form");

function formSubmitHandler(evt) {
  evt.preventDefault();
  ProfileName.textContent = PopupName.value;
  ProfileDescription.textContent = PopupDescription.value;
  popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);

// Пункт третий. Шесть карточек «из коробки»

const initialCards = [
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

let elements = document.querySelector(".elements");

function addCards(cardName, cardImgLink) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

  cardElement.querySelector(".element__text").textContent = cardName;
  cardElement.querySelector(".element__img").src = cardImgLink;
  cardElement
    .querySelector(".element__heart")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__heart_active");
    });

  elements.append(cardElement);
}

initialCards.forEach((item) => {
  addCards(item.name, item.link);
});

// 5. Лайк карточки
// Видимо нужно делать в цикле
let elementHeart = document.querySelector(".element__heart");

elementHeart.addEventListener("click", function (evt) {
  evt.target.classList.toggle("element__heart_active");
});
