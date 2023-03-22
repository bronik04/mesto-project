export function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

export function cleanErrorText() {
  const errorList = document.querySelectorAll(".popup__error");
  errorList.forEach((error) => {
    error.textContent = "";
  });
}

export function cleanErrorUnderline() {
  const inputList = document.querySelectorAll(".popup__input");
  inputList.forEach((inputElement) => {
    inputElement.classList.remove("popup__input_type_error");
  });
}

export function disableButton(buttonElement) {
  buttonElement.classList.add("popup__button_disabled");
  buttonElement.disabled = true;
}
