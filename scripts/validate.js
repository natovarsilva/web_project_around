function enableValidation(settings) {
  const formElement = document.querySelector(settings.formSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );

  const buttonElement = formElement.querySelector(".form__submit");

  inputList.forEach(function (input) {
    input.addEventListener("input", function () {
      checkInputValidity(input, settings);
      toggleButtonState(inputList, buttonElement);
    });
  });

  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    // proceso activar botón submit
    buttonElement.disabled = true;
    buttonElement.classList.add("form__submit_inactive"); //crear clase en el popup y darle estilos
  } else {
    //proceso desactivar botón submit
    buttonElement.disabled = false;
    buttonElement.classList.remove("form__submit_inactive");
  }
}

// revisión si el input es válido y decide que hacer en ese caso
function checkInputValidity(input, settings) {
  if (input.validity.valid) {
    hideInputError(input, settings); //hacer si todo es válido
  } else {
    showInputError(input, settings); //hacer si hay un error
  }
}

//revisión que todos los inputs sean validos para activar el botón
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function showInputError(input, settings) {
  const errorElement = document.querySelector(`#${input.name}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add(settings.inputErrorClass);
}

function hideInputError(input, settings) {
  const errorElement = document.querySelector(`#${input.name}-error`);
  input.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__text-input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
});

enableValidation({
  formSelector: "#form-new-place", // se usa el id porque si hay dos forms con la misma clase, solo se va a tomar el primero siempre
  inputSelector: ".form__text-input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
});

enableValidation({
  formSelector: "#form-update-avatar", // se usa el id porque si hay dos forms con la misma clase, solo se va a tomar el primero siempre
  inputSelector: ".form__text-input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
});
