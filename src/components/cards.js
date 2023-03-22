const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  card,
  userId,
  handleToggleLike,
  removeCard,
  handleCardClick
) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__img");

  cardElement.querySelector(".element__text").textContent = card.name;
  elementImage.src = card.link;
  elementImage.alt = card.name;

  const likesNumber = cardElement.querySelector(".element__heart-counter");
  likesNumber.textContent = card.likes.length;
  const likeButton = cardElement.querySelector(".element__heart");

  if (
    card.likes.find((item) => {
      return userId === item._id;
    })
  ) {
    likeButton.classList.add("element__heart_active");
  }

  const deleteButton = cardElement.querySelector(".element__trash-button");
  if (card.owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.style.display = "block";
  }

  deleteButton.addEventListener("click", (evt) => {
    removeCard(evt, card._id);
  });

  likeButton.addEventListener("click", (evt) => {
    handleToggleLike(evt, card._id, likesNumber, card);
  });

  elementImage.addEventListener("click", () =>
    handleCardClick(card.name, card.link)
  );

  return cardElement;
}
