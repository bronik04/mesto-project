let popup = document.querySelectorAll(".popup");
let popupEdit = document.querySelector(".popup_type_edit");
let popupAdd = document.querySelector(".popup_type_add");
let editButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");
let closeButton = document.querySelectorAll(".popup__close-button");
let ProfileName = document.querySelector(".profile__name");
let ProfileDescription = document.querySelector(".profile__description");
let PopupName = document.querySelector(".popup__text-field_type_name");
let PopupDescription = document.querySelector(
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

// closeButton[0].addEventListener("click", closePopup);
// closeButton[1].addEventListener("click", closePopup);
// console.log("closeButton: ", closeButton);

// closeButton.addEventListener("click", function () {
//   popup.classList.remove("popup_opened");
// });

PopupName.value = ProfileName.textContent;
PopupDescription.value = ProfileDescription.textContent;

// Редактирование имени и информации о себе

const formElement = document.querySelector(".popup__form");

function formSubmitHandler(evt) {
  evt.preventDefault();
  ProfileName.textContent = PopupName.value;
  ProfileDescription.textContent = PopupDescription.value;
  popup.classList.remove("popup_opened");
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

  elements.append(cardElement);
}

initialCards.forEach((item) => {
  addCards(item.name, item.link);
});

// 3. Форма добавления карточки

addButton.addEventListener("click", function () {
  popupAdd.classList.add("popup_opened");
});

// 5. Лайк карточки
// Почему не работает?

// let elementHeart = document.querySelector(".element__heart");

// elementHeart.addEventListener("click", function (evt) {
//   evt.target.classList.toggle("element__heart_active");
// });
