import Popup from "./Popup.js";

export default class PopupWithVerification extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId, this._card);
      this.close();
    });
  }
}