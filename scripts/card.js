import {
  popupFullImage,
  fullImage,
  fullImageTitle
} from './data.js';

import openPopup from './index.js';

export default class Card {
  constructor(data) {
    this._image = data.link;
    this._title = data.name;
    this._alt = data.name;
  }
  
  _getTemplate() {
    const cardElement = document
    .querySelector('.element-template')
    .content
    .querySelector('.element')
    .cloneNode(true);
    
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._title;
    this._element.querySelector('.element__title').textContent = this._title;

    return this._element;
  }

  _handleOpenPopup() {
    fullImage.src = this._image;
    fullImage.alt = this._title;
    fullImageTitle.textContent = this._title;
    openPopup(popupFullImage);
  }

  _handleElementDelete() {
    this._element.remove();
  }

  _handleLikeClick() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup();
    })

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleElementDelete();
    })

    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    })
  }
};