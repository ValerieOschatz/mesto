import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._buttonSubmit = this._form.querySelector('.popup__submit-button');
    this._buttonSubmitText = this._buttonSubmit.textContent;
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}