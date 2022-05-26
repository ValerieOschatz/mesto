import {
  // popupEdit,
  formEdit,
  nameInput,
  professionInput,
  buttonEdit,
  profileName,
  profileProfession,
  // popupAdd,
  formAdd,
  placeInput,
  linkInput,
  buttonAdd,
  // popupFullImage,
  fullImage,
  fullImageTitle,
  elementsList,
  initialCards,
  settings,
  cardListSelector,
  popupImageSelector,
  popupAddSelector,
  popupEditSelector,
  profileNameSelector,
  profileInfoSelector
} from './data.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

function createCard(object) {
  const newCard = new Card(object, '.element-template', handleOpenPopupFullImage(object));
  const cardElement = newCard.generateCard();
  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = createCard(cardItem);
    cardList.addItem(card);
  },
}, cardListSelector);

const profileValidation = new FormValidator(settings, formEdit);
const newCardValidation = new FormValidator(settings, formAdd);
const profileInfo = new UserInfo({ profileNameSelector, profileInfoSelector });
const popupFullImage = new PopupWithImage(popupImageSelector);

const popupFormAdd = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleFormSubmit: (formData) => {
    const cardAdded = createCard(formData);
    cardList.addItem(cardAdded);
  }
});

const popupFormEdit = new PopupWithForm({
  popupSelector: popupEditSelector,
  handleFormSubmit: (formData) => {
    profileInfo.setUserInfo(formData);
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
  const startInputValues = profileInfo.getUserInfo();
  nameInput.value = startInputValues.name;
  professionInput.value = startInputValues.info;

  profileValidation.cleanErrors();
  popupFormEdit.open();
}

cardList.renderItems();
profileValidation.enableValidation();
newCardValidation.enableValidation();
popupFullImage.setEventListeners();
popupFormAdd.setEventListeners();
popupFormEdit.setEventListeners();

buttonEdit.addEventListener('click', handlePopupEditOpen);
buttonAdd.addEventListener('click', handlePopupAddOpen);