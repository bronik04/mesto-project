const cardTemplate = document.querySelector("#card-template").content;
import { addLike, deleteCards, removeLike } from "./api.js";
import { handleCardClick } from "./modal.js";

// Создаем новую карточку

export function createCard(card, userId, handleToggleLike, removeCard) {
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
  // likeButton.addEventListener("click", (evt) => {
  //   if (!evt.target.classList.contains("element__heart_active")) {
  //     addLike(card._id)
  //       .then((data) => {
  //         evt.target.classList.toggle("element__heart_active");
  //         likesNumber.textContent = data.likes.length;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     removeLike(card._id)
  //       .then((data) => {
  //         evt.target.classList.toggle("element__heart_active");
  //         likesNumber.textContent = data.likes.length;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // });
  // Проверка на активную корзину
  const deleteButton = cardElement.querySelector(".element__trash-button");
  if (card.owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.style.display = "block";
  }

  // Удаление карточки
  deleteButton.addEventListener("click", removeCard);

  // Зум карточки
  elementImage.addEventListener("click", () =>
    handleCardClick(card.name, card.link)
  );
  return cardElement;
}

// Функция добавления лайка
