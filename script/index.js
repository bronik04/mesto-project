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

// 5. Лайк карточки
// Видимо нужно делать в цикле
let elementHeart = document.querySelector(".element__heart");
console.log("elementHeart: ", elementHeart);

elementHeart.addEventListener("click", function (evt) {
  evt.target.classList.toggle("element__heart_active");
});
