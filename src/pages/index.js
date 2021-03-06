import './index.css';

import {
  formEdit,
  formAdd,
  formAvatar,
  nameInput,
  professionInput,
  buttonEdit,
  buttonAdd,
  buttonAvatar,
  cardListSelector,
  popupImageSelector,
  popupAddSelector,
  popupEditSelector,
  popupDeleteSelector,
  popupAvatarSelector,
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
const avatarValidation = new FormValidator(settings, formAvatar);
const profileInfo = new UserInfo({ profileNameSelector, profileInfoSelector, avatarSelector });
const popupFullImage = new PopupWithImage(popupImageSelector);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-43',
  headers: {
    authorization: 'b7beb2f2-51a9-4b03-8658-31d9c29a3434',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cardData]) => {
  profileInfo.setUserInfo(userData);
  cardList.renderItems(cardData.reverse());
})
.catch((err) => {
  console.log(err);
})

const popupFormAdd = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleFormSubmit: (formData) => {
    popupFormAdd.renderLoading(true);
    api.addCard(formData)
    .then((res) => {
      const cardAdded = createCard(res);
      cardList.addItem(cardAdded);
      popupFormAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormAdd.renderLoading(false);
    })
  }
});

const popupFormEdit = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleFormSubmit: (formData) => {
    popupFormEdit.renderLoading(true);
    api.setUserData(formData)
    .then((res) => {
      profileInfo.setUserInfo(res);
      popupFormEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormEdit.renderLoading(false);
    })
  }
});

const popupVerification = new PopupWithVerification({
  popupSelector: popupDeleteSelector,
  handleFormSubmit: (cardId, card) => {
    api.deleteCard(cardId)
    .then(() => {
      card.handleElementDelete();
      popupVerification.close();
    })
    .catch((err) => {
      console.log(err);
    })
  }
});

const popupFormAvatar = new PopupWithForm({
  popupSelector: popupAvatarSelector,
  handleFormSubmit: (formData) => {
    popupFormAvatar.renderLoading(true);
    api.changeAvatar(formData)
    .then((res) => {
      profileInfo.setUserInfo(res);
      popupFormAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormAvatar.renderLoading(false);
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

function handlePopupAvatarOpen(evt) {
  evt.preventDefault();
  avatarValidation.cleanErrors();
  popupFormAvatar.open();
}

function handleLikeClick(cardId, card) {
  if (card.checkLike()) {
    api.removeCardLike(cardId)
    .then((res) => {
      card.setLikes(res);
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    api.addCardLike(cardId)
    .then((res) => {
      card.setLikes(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

profileValidation.enableValidation();
newCardValidation.enableValidation();
avatarValidation.enableValidation();
popupFullImage.setEventListeners();
popupFormAdd.setEventListeners();
popupFormEdit.setEventListeners();
popupVerification.setEventListeners();
popupFormAvatar.setEventListeners();

buttonEdit.addEventListener('click', handlePopupEditOpen);
buttonAdd.addEventListener('click', handlePopupAddOpen);
buttonAvatar.addEventListener('click', handlePopupAvatarOpen);