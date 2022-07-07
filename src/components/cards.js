export const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const popupTypeAdd = document.querySelector(".popup_type_add");
export const placeName = document.querySelector(
  ".popup__input_type_place-name"
);
export const placeLink = document.querySelector(
  ".popup__input_type_place-link"
);
const formNewPlace = document.querySelector(".popup__form_type_add-img");

import { addLike, deleteCards, removeLike, addCards } from "./api.js";
import { handleCardClick } from "./modal.js";
import { closePopup, disableButton, renderLoading } from "./utils.js";

// Создаем новую карточку

function createCards(card, userId) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__img");

  cardElement.querySelector(".element__text").textContent = card.name;
  elementImage.src = card.link;
  elementImage.alt = card.name;

  // Добавление лайков
  const likesNumber = cardElement.querySelector(".element__heart-counter");
  const likeButton = cardElement.querySelector(".element__heart");

  // Проверка активного лайка
  if (
    card.likes.find((item) => {
      return userId === item._id;
    })
  ) {
    likeButton.classList.add("element__heart_active");
  }

  likesNumber.textContent = card.likes.length;
  likeButton.addEventListener("click", (evt) => {
    if (!evt.target.classList.contains("element__heart_active")) {
      addLike(card._id)
        .then((data) => {
          evt.target.classList.toggle("element__heart_active");
          likesNumber.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      removeLike(card._id)
        .then((data) => {
          evt.target.classList.toggle("element__heart_active");
          likesNumber.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  // Проверка на активную корзину
  const deleteButton = cardElement.querySelector(".element__trash-button");
  if (card.owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.style.display = "block";
  }

  // Удаление карточки
  deleteButton.addEventListener("click", (evt) => {
    deleteCards(card._id)
      .then(() => {
        evt.target.closest(".element").remove();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // Зум карточки
  elementImage.addEventListener("click", () =>
    handleCardClick(card.name, card.link)
  );
  return cardElement;
}
// Функция рендера карточек
export function renderCard(cardElement, container, userId) {
  container.prepend(createCards(cardElement, userId));
}

// Функция добавления лайка
// function toggleLike(evt) {
//   const likesNumber = document.querySelector(".element__heart-counter");

//   if (evt.target.classList.contains("element__heart_active")) {
//     likesNumber.textContent--;
//   } else {
//     likesNumber.textContent++;
//   }

//   evt.target.classList.toggle("element__heart_active");
// }

// 4. Добавление новой карточки
const placeSubmitButton = document.querySelector(".popup__button_type_img");

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  const inputElement = {
    name: placeName.value,
    link: placeLink.value,
  };
  renderLoading(placeSubmitButton, true);
  addCards(inputElement)
    .then((cardData) => {
      renderCard(cardData, cardsContainer, userId);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(placeSubmitButton, false));

  const newPlaceSubmitButton = document.querySelector(
    ".popup__button_type_img"
  );

  disableButton(newPlaceSubmitButton);

  formNewPlace.reset();
  closePopup(popupTypeAdd);
}

// Функция удаления карточки
// function removeCard(evt) {
//   console.log(card._id);
//   deleteCards(card._id)
//     .then((initialCards) => {
//       evt.target.closest(".element").remove();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

export { handleNewPlaceFormSubmit, formNewPlace };
