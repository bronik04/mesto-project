import { profileName, profileDescription, prifileAvatar } from "./modal.js";

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "1f5793bc-1e32-4ef0-8692-e14a9b20b057",
    "Content-Type": "application/json",
  },
};

const onFulfilled = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(onFulfilled)
    .then((data) => {
      console.log(data);
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      prifileAvatar.src = data.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const getInitialCards = () => {
//   return fetch("", {});
//   // ...
// };
