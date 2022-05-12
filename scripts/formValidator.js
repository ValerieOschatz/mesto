export default class FormValidator {
  constructor(configSettings, form) {
    this._configSettings = configSettings;
    this._form = form;
  }
  
  _showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }

  _hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      this._hideInputError(formElement, inputElement, config);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement, config) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, config);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, config);
        this._toggleButtonState(inputList, buttonElement, config);
      })
    })
  }

  setFormStartSettings() {
    const inputList = Array.from(this._form.querySelectorAll(this._configSettings.inputSelector));
    const buttonElement = this._form.querySelector(this._configSettings.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, this._configSettings);

    inputList.forEach(inputElement => {
      this._hideInputError(this._form, inputElement, this._configSettings);
    })
  }

  enableValidation() {
    this._setEventListeners(this._form, this._configSettings);
  }
};