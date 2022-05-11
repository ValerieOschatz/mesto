const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupFullImage = document.querySelector('.popup_type_full-image'),
      fullImage = popupFullImage.querySelector('.popup__image'),
      fullImageTitle = popupFullImage.querySelector('.popup__image-title'),
      popupCloseButton = popupFullImage.querySelector('.popup__close-button');

class Card {
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
    popupFullImage.classList.add('popup_opened');
  }
  
  _handleClosePopup() {
    fullImage.src = '';
    fullImageTitle.textContent = '';
    popupFullImage.classList.remove('popup_opened');
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._handleOpenPopup();
    })
    
    popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    })
  }
}

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  document.querySelector('.elements__list').prepend(cardElement);
});

