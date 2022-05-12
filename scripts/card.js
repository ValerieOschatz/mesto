import {
  popupFullImage,
  fullImage,
  fullImageTitle
} from './data.js';

import openPopup from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._image = data.link;
    this._title = data.name;
    this._alt = data.name;
    this._cardSelector = cardSelector;
  }
  
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const elementImage = this._element.querySelector('.element__image');
    const elementTitle = this._element.querySelector('.element__title');

    elementImage.src = this._image;
    elementImage.alt = this._title;
    elementTitle.textContent = this._title;

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