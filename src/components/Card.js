export default class Card {
  constructor({ link, name, owner, likes }, userId, cardSelector, handleImageClick, setLikes) {
    this._image = link;
    this._title = name;
    this._ownerId = owner._id;
    this._likes = likes;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._setLikes = setLikes;
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
    this._elementLikeCounter = this._element.querySelector('.element__like-counter');
    this._setEventListeners();

    if(this._userId !== this._ownerId) {
      this._elementDeleteButton.remove();
    }
    
    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    this._elementTitle.textContent = this._title;
    this._elementLikeCounter.textContent = this._likes.length;

    return this._element;
  }

  // countLikes(array) {
  //   this._elementLikeCounter.textContent = array.length;
  // }

  _handleElementDelete() {
    this._element.remove();
    this._element = null;
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