export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      this._handleClickClose(evt);
    });
  }
}