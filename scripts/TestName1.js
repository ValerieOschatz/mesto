export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._image = data.link;
    this._title = data.name;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
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
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementDeleteButton = this._element.querySelector('.element__delete-button');
    this._elementLikeButton = this._element.querySelector('.element__like-button');
    this._setEventListeners();
    
    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    this._elementTitle.textContent = this._title;

    return this._element;
  }

  _handleElementDelete() {
    this._element.remove();
  }

  _handleLikeClick() {
    this._elementLikeButton.classList.toggle('element__like-button_active');
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleImageClick();
    })

    this._elementDeleteButton.addEventListener('click', () => {
      this._handleElementDelete();
    })

    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeClick();
    })
  }
};