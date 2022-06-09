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
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

function createCard(object) {
  const newCard = new Card(object, 'b7beb2f2-51a9-4b03-8658-31d9c29a3434', '.element-template', handleOpenPopupFullImage(object));
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
      cardList.addItem(createCard(cardAdded));
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

function handleOpenPopupFullImage(object) {
  return () => popupFullImage.open(object);
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

function setStartValues() {
  const { name, info } = profileInfo.getUserInfo();
  nameInput.value = name;
  professionInput.value = info;
}

profileValidation.enableValidation();
newCardValidation.enableValidation();
popupFullImage.setEventListeners();
popupFormAdd.setEventListeners();
popupFormEdit.setEventListeners();

buttonEdit.addEventListener('click', handlePopupEditOpen);
buttonAdd.addEventListener('click', handlePopupAddOpen);