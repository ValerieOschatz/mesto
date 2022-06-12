export default class Card {
  constructor({ link, name, owner, likes, _id }, userId, cardSelector, handleImageClick, handlePopupVerificationOpen, handleLikeClick) {
    this._image = link;
    this._title = name;
    this._ownerId = owner._id;
    this._likes = likes;
    this._cardId = _id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handlePopupVerificationOpen = handlePopupVerificationOpen;
    this._handleLikeClick = handleLikeClick;
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

    if (this.checkLike()) {
      this._elementLikeButton.classList.add('element__like-button_active');
    }
    
    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    this._elementTitle.textContent = this._title;
    this._elementLikeCounter.textContent = this._likes.length;

    return this._element;
  }

  handleElementDelete() {
    this._element.remove();
    this._element = null;
  }

  checkLike = () => this._likes.some(like => like._id === this._userId);

  _countLikes(likes) {
    this._likes = likes;
    this._elementLikeCounter.textContent = likes.length;
  }

  setLikes({ likes }) {
    this._countLikes(likes);
    this._elementLikeButton.classList.toggle('element__like-button_active');
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleImageClick(this._image, this._title);
    })

    this._elementDeleteButton.addEventListener('click', () => {
      this._handlePopupVerificationOpen(this._cardId, this);
    })

    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this);
    })
  }
};