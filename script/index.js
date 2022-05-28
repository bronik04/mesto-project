const popup = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButton = document.querySelectorAll(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popupName = document.querySelector(".popup__text-field_type_name");
const popupDescription = document.querySelector(
  ".popup__text-field_type_description"
);
const imageButton = document.querySelector(".element__img");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeZoom = document.querySelector(".popup_type_zoom");
const elementText = document.querySelector(".element__text");

const formElement = document.querySelector(".popup__form");
const popupTypeEdit = document.querySelector(".popup_type_edit");

// 1. Работа модальных окон. Открытие и закрытие модального окна

// Функция открытия Popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
// Функция закрытия Popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
// Функция открытия Popup профиль
function openPropfilePopup() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(popupEdit);
}

editButton.addEventListener("click", openPropfilePopup);

closeButton.forEach((item) => {
  item.addEventListener("click", () => closePopup(item.closest(".popup")));
});

// Редактирование имени и информации о себе
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(popupEdit);
}

formElement.addEventListener("submit", formSubmitHandler);

// 2. Шесть карточек «из коробки»
// https://cuva.ru/blog/20-udivitelnyh-mest-rossii

let elements = document.querySelector(".elements");
// Создаем новую карточку
function createCards(cardName, cardImgLink) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

  cardElement.querySelector(".element__text").textContent = cardName;
  cardElement.querySelector(".element__img").src = cardImgLink;
  // Добавление лайков
  // ?Почему такой странный перенос строк? Как исправить?
  cardElement
    .querySelector(".element__heart")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__heart_active");
    });
  // Удаление карточки
  cardElement
    .querySelector(".element__trash-button")
    .addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });
  // Зум карточки
  cardElement
    .querySelector(".element__img")
    .addEventListener("click", function (evt) {
      popupTypeZoom.classList.add("popup_opened");
      popupImage.src = cardImgLink;
      popupCaption.textContent = cardName;
    });

  elements.prepend(cardElement);
}

initialCards.forEach((item) => {
  createCards(item.name, item.link);
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
  createCards(placeName.value, placeLink.value);
  popupTypeAdd.classList.remove("popup_opened");
});
