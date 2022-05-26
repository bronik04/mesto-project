let popup = document.querySelectorAll(".popup");
let popupEdit = document.querySelector(".popup_type_edit");
let popupAdd = document.querySelector(".popup_type_add");
let editButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");
let closeButton = document.querySelectorAll(".popup__close-button");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let popupName = document.querySelector(".popup__text-field_type_name");
let popupDescription = document.querySelector(
  ".popup__text-field_type_description"
);

// 1. Работа модальных окон. Открытие и закрытие модального окна

editButton.addEventListener("click", function () {
  popupEdit.classList.add("popup_opened");
});

// ? Можно ли было сделать проще?

function closePopup() {
  popup.forEach((item, index) => {
    popup[index].classList.remove("popup_opened");
  });
}

closeButton.forEach((item, index) => {
  closeButton[index].addEventListener("click", closePopup);
});

popupName.value = profileName.textContent;
popupDescription.value = profileDescription.textContent;

// Редактирование имени и информации о себе

const formElement = document.querySelector(".popup__form");
const popupTypeEdit = document.querySelector(".popup_type_edit");

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popupTypeEdit.classList.remove("popup_opened");
  // Можно было и так
  //closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);

// 2. Шесть карточек «из коробки»
// https://cuva.ru/blog/20-udivitelnyh-mest-rossii

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

let elements = document.querySelector(".elements");

function addCards(cardName, cardImgLink) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

  cardElement.querySelector(".element__text").textContent = cardName;
  cardElement.querySelector(".element__img").src = cardImgLink;
  // Почему такой странный перенос строк? Как исправить?
  cardElement
    .querySelector(".element__heart")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__heart_active");
    });
  // Нужно ли здесь добовлять кнопку удаления?
  cardElement
    .querySelector(".element__trash-button")
    .addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });

  //elements.append(cardElement);
  elements.prepend(cardElement);
}

initialCards.forEach((item) => {
  addCards(item.name, item.link);
});

// 3. Форма добавления карточки

addButton.addEventListener("click", function () {
  popupAdd.classList.add("popup_opened");
});

// 4. Добавление карточки
const popupTypeAdd = document.querySelector(".popup_type_add");
const addNewPlace = document.querySelector(".popup__save-button_type_img");
const placeName = document.querySelector(".popup__text-field_type_place-name");
const placeLink = document.querySelector(".popup__text-field_type_place-link");

addNewPlace.addEventListener("click", function (evt) {
  evt.preventDefault();
  addCards(placeName.value, placeLink.value);
  popupTypeAdd.classList.remove("popup_opened");
});

// 6. Удаление карточки
//  Удаляет все карточки и только по нажатию на первую кнопку

// ! Почему это работает в функции добавления карточек а здесь нет?

// function deleteCardHandler(evt) {
//   evt.target.closest(".element").remove();
// }

// const deleteButton = document.querySelector(".element__trash-button");
// deleteButton.addEventListener("click", deleteCardHandler);
