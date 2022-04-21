'use strict';

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

function showInputError(formElement, inputElement, errorMessage, object) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(object['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object['errorClass']);
}

function hideInputError(formElement, inputElement, object) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object['inputErrorClass']);
  errorElement.classList.remove(object['errorClass']);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, object) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  } else {
    hideInputError(formElement, inputElement, object);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, object) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object['inactiveButtonClass']);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(object['inactiveButtonClass']);
    buttonElement.removeAttribute('disabled');
  }
}

function setEventListeners(formElement, object) {
  const inputList = Array.from(formElement.querySelectorAll(object['inputSelector']));
  const buttonElement = formElement.querySelector(object['submitButtonSelector']);
  toggleButtonState(inputList, buttonElement, object);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, object);
      toggleButtonState(inputList, buttonElement, object);
    })
  })
}

function setFormStartSettings(formElement, object) {
  const inputList = Array.from(formElement.querySelectorAll(object['inputSelector']));
  const buttonElement = formElement.querySelector(object['submitButtonSelector']);
  toggleButtonState(inputList, buttonElement, object);
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, object);
  })
}

function enableValidation(object) {
  const formList = Array.from(document.querySelectorAll(object['formSelector']));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, object);
  });
}

enableValidation(settings);
