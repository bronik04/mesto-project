const cardTemplate = document.querySelector("#card-template").content;
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
  likesNumber.textContent = card.likes.length;
  const likeButton = cardElement.querySelector(".element__heart");

  // Проверка активного лайка
  if (
    card.likes.find((item) => {
      return userId === item._id;
    })
  ) {
    likeButton.classList.add("element__heart_active");
  }

  // Проверка на активную корзину
  const deleteButton = cardElement.querySelector(".element__trash-button");
  if (card.owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.style.display = "block";
  }

  // Удаление карточки
  deleteButton.addEventListener("click", (evt) => {
    removeCard(evt, card._id);
  });
  // Переключение лайка
  likeButton.addEventListener("click", (evt) => {
    handleToggleLike(evt, card._id, likesNumber, card);
  });

  // Зум карточки
  elementImage.addEventListener("click", () =>
    handleCardClick(card.name, card.link)
  );

  return cardElement;
}
