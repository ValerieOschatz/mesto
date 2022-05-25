import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { link, name }) {
    super(popupSelector);
    this._link = link;
    this._name = name;
    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__image-title');
  }

  open() {
    super.open();
    this._image.src = this._link;
    this._image.alt = this._link;
    this._title.textContent = this._name;
  }
}