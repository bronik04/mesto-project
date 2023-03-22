import {
  avatarButton, avatarChangeForm, avatarInput, avatarPopup, avatarSubmitButton,
  cardsContainer,
  formNewPlace,
  newPlaceButton,
  newPlaceSubmitButton,
  placeLink,
  placeName,
  placeSubmitButton, popupAdd, popupCaption,
  popupCloseButton,
  popupDescription, popupEdit, popupImage,
  popupName,
  popupTypeAdd, popupTypeZoom,
  profileAvatar, profileButton,
  profileDescription,
  profileForm,
  profileName,
  profileSubmitButton, validationConfig
} from './constans';
import "../pages/index.css";
import { enableValidation } from "./validate.js";
import {
  renderLoading,
  cleanErrorUnderline,
  cleanErrorText,
  disableButton,
} from "./utils.js";
import { createCard } from "./cards.js";
import { openPopup, closePopup } from "./modal.js";
import {
  getUser,
  getInitialCards,
  editProfile,
  editAvatar,
  addCards,
  deleteCards,
  addLike,
  removeLike,
} from "./api";

let userId;
enableValidation(validationConfig);

popupCloseButton.forEach((item) => {
  item.addEventListener("click", () => closePopup(item.closest(".popup")));
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

newPlaceButton.addEventListener("click", () => openPopup(popupAdd));

Promise.all([getUser(), getInitialCards()]).then(([user, initialCards]) => {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profileAvatar.src = user.avatar;
  userId = user._id;

  initialCards.reverse().forEach((card) => {
    renderCard(
      card,
      cardsContainer,
      userId,
      handleToggleLike,
      removeCard,
      handleCardClick
    );
  });
});

function renderCard(
  cardElement,
  container,
  userId,
  handleToggleLike,
  removeCard,
  handleCardClick
) {
  container.prepend(
    createCard(
      cardElement,
      userId,
      handleToggleLike,
      removeCard,
      handleCardClick
    )
  );
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const inputElement = {
    name: placeName.value,
    link: placeLink.value,
  };
  renderLoading(placeSubmitButton, true);

  addCards(inputElement)
    .then((cardData) => {
      renderCard(
        cardData,
        cardsContainer,
        userId,
        handleToggleLike,
        removeCard,
        handleCardClick
      );
      closePopup(popupTypeAdd);
      disableButton(newPlaceSubmitButton);
      formNewPlace.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(placeSubmitButton, false));
}

formNewPlace.addEventListener("submit", handleNewPlaceFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(profileSubmitButton, true);
  editProfile({ name: popupName.value, about: popupDescription.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(profileSubmitButton, false));
}

// Попап аватара
avatarButton.addEventListener("click", () => {
  openPopup(avatarPopup);
  cleanErrorUnderline();
  cleanErrorText();
  disableButton(avatarSubmitButton);
  avatarChangeForm.reset();
});

// Изменение Аватара
function changeAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(avatarSubmitButton, true);
  editAvatar({ avatar: avatarInput.value })
    .then((editData) => {
      profileAvatar.src = editData.avatar;
      closePopup(avatarPopup);
      avatarChangeForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(avatarSubmitButton, false));
}

avatarChangeForm.addEventListener("submit", changeAvatarSubmit);

function handleToggleLike(evt, cardId, likesNumber, card) {
  likesNumber.textContent = card.likes.length;
  if (!evt.target.classList.contains("element__heart_active")) {
    addLike(cardId)
      .then((data) => {
        evt.target.classList.toggle("element__heart_active");
        likesNumber.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    removeLike(cardId)
      .then((data) => {
        evt.target.classList.toggle("element__heart_active");
        likesNumber.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Функция удаления карточки
function removeCard(evt, cardId) {
  deleteCards(cardId)
    .then(() => {
      evt.target.closest(".element").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}
// Обработчик zoom карточки
function handleCardClick(cardName, cardImgLink) {
  openPopup(popupTypeZoom);
  popupImage.src = cardImgLink;
  popupCaption.textContent = cardName;
  popupImage.alt = cardName;
}

// Функция открытия Popup профиль
function openProfilePopup() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(popupEdit);
  cleanErrorUnderline();
  cleanErrorText();
}

profileButton.addEventListener("click", openProfilePopup);
