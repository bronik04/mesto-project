const popupList = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const profileButton = document.querySelector(".profile__edit-button");
const newPlaceButton = document.querySelector(".profile__add-button");
const popupCloseButton = document.querySelectorAll(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const popupName = popupEdit.querySelector(".popup__text-field_type_name");
const popupDescription = popupEdit.querySelector(
  ".popup__text-field_type_description"
);
const imageButton = document.querySelector(".element__img");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupTypeZoom = document.querySelector(".popup_type_zoom");
const elementText = document.querySelector(".element__text");

const formElement = document.querySelector(".popup__form_type_edit");
const popupTypeEdit = document.querySelector(".popup_type_edit");
// Переиминовал переменную
const cardsContainer = document.querySelector(".elements");
// Вынес переменную из функции createCards
const cardTemplate = document.querySelector("#card-template").content;
// переменные для добавления
const popupTypeAdd = document.querySelector(".popup_type_add");
const formNewPlace = document.querySelector(".popup__form_type_add-img");
const placeName = document.querySelector(".popup__text-field_type_place-name");
const placeLink = document.querySelector(".popup__text-field_type_place-link");

// 1. Работа модальных окон. Открытие и закрытие модального окна

// Функция открытия Popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
// Функция закрытия Popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Функция добавления лайка
function addHeart(evt) {
  evt.target.classList.toggle("element__heart_active");
}

// Функция удаления карточки
function removeCard(evt) {
  evt.target.closest(".element").remove();
}

// Функция открытия Popup профиль
function openPropfilePopup() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(popupEdit);
}

profileButton.addEventListener("click", openPropfilePopup);

popupCloseButton.forEach((item) => {
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
    .addEventListener("click", addHeart);

  // Удаление карточки
  cardElement
    .querySelector(".element__trash-button")
    .addEventListener("click", removeCard);

  // Зум карточки
  // todo Разобраться в функции
  function zoomCards() {
    openPopup(popupTypeZoom);
    popupImage.src = cardImgLink;
    popupCaption.textContent = cardName;
    popupImage.alt = cardName;
  }

  elementImage.addEventListener("click", zoomCards);

  return cardElement;
}

function renderCard(name, url, contanier) {
  const card = createCards(name, url);
  contanier.prepend(card);
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link, cardsContainer);
});

// 3. Форма добавления карточки

newPlaceButton.addEventListener("click", function () {
  openPopup(popupAdd);
});

// 4. Добавление карточки

function addSubmitHandler(evt) {
  evt.preventDefault();
  renderCard(placeName.value, placeLink.value, cardsContainer);
  formNewPlace.reset();
  closePopup(popupTypeAdd);
}

formNewPlace.addEventListener("submit", addSubmitHandler);
// Сергей огромное Вам спасибо, Ваши замечания действительно делают мой код лучше!
