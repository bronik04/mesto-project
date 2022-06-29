import { data } from "autoprefixer";

import { placeName, placeLink } from "./cards.js";
import { popupName, popupDescription } from "./modal.js";

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "1f5793bc-1e32-4ef0-8692-e14a9b20b057",
    "Content-Type": "application/json",
  },
};

export const onResponce = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(onResponce);
};


export const editProfile = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(onResponce);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(onResponce);
};

export const addCards = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(onResponce);
};

export const deleteCards = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(onResponce);
};
