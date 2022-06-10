import './index.css';

import {
  formEdit,
  formAdd,
  nameInput,
  professionInput,
  buttonEdit,
  buttonAdd,
  cardListSelector,
  popupImageSelector,
  popupAddSelector,
  popupEditSelector,
  popupDeleteSelector,
  profileNameSelector,
  profileInfoSelector,
  avatarSelector,
  settings
} from '../utils/data.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithVerification from '../components/PopupWithVerification.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

function createCard(object) {
  const newCard = new Card(object, profileInfo.userId, '.element-template', handleOpenPopupFullImage, handlePopupVerificationOpen, handleLikeClick);
  const cardElement = newCard.generateCard();
  return cardElement;
}

const cardList = new Section({
  renderer: (cardItem) => {
    const card = createCard(cardItem);
    cardList.addItem(card);
  }},
 cardListSelector);

const profileValidation = new FormValidator(settings, formEdit);
const newCardValidation = new FormValidator(settings, formAdd);
const profileInfo = new UserInfo({ profileNameSelector, profileInfoSelector, avatarSelector });
const popupFullImage = new PopupWithImage(popupImageSelector);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-43',
  token: 'b7beb2f2-51a9-4b03-8658-31d9c29a3434'
})

api.getUserInfo()
.then((userData) => {
  profileInfo.setUserInfo(userData);
  profileInfo.setAvatar(userData);
  profileInfo.setUserId(userData);
})
.catch((err) => {
  console.log(err);
})

api.getInitialCards()
.then((cardData) => {
  cardList.renderItems(cardData);
})
.catch((err) => {
  console.log(err);
})

const popupFormAdd = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleFormSubmit: (formData) => {
    api.addCard(formData)
    .then((res) => {
      const cardAdded = createCard(res);
      cardList.addItem(cardAdded);
    })
    .catch((err) => {
      console.log(err);
    })
  }
});

const popupFormEdit = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleFormSubmit: (formData) => {
    api.setUserData(formData)
    .then((res) => {
      profileInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
});

const popupVerification = new PopupWithVerification({
  popupSelector: popupDeleteSelector,
  handleFormSubmit: (cardId, card) => {
    api.deleteCard(cardId)
    .then(() => {
      card.handleElementDelete();
    })
    .catch((err) => {
      console.log(err);
    })
  }
});

function setStartValues() {
  const { name, info } = profileInfo.getUserInfo();
  nameInput.value = name;
  professionInput.value = info;
}

function handlePopupAddOpen() {
  newCardValidation.cleanErrors();
  popupFormAdd.open();
}

function handlePopupEditOpen() {
  setStartValues();
  profileValidation.cleanErrors();
  popupFormEdit.open();
}

function handleOpenPopupFullImage(link, name) {
  popupFullImage.open(link, name);
}

function handlePopupVerificationOpen(cardId, card) {
  popupVerification.open(cardId, card);
}

function handleLikeClick(cardId, card) {
  if (card.checkLike()) {
    api.removeCardLike(cardId)
    .then((res) => {
      card.countLikes(res);
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    api.setCardLike(cardId)
    .then((res) => {
      card.countLikes(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

profileValidation.enableValidation();
newCardValidation.enableValidation();
popupFullImage.setEventListeners();
popupFormAdd.setEventListeners();
popupFormEdit.setEventListeners();
popupVerification.setEventListeners();

buttonEdit.addEventListener('click', handlePopupEditOpen);
buttonAdd.addEventListener('click', handlePopupAddOpen);