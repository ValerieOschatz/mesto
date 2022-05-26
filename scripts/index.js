import {
  popupEdit,
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
  popupAddSelector
} from './data.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

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

const popupFullImage = new PopupWithImage(popupImageSelector);

const popupFormAdd = new PopupWithForm({
  popupSelector: popupAddSelector,
  handleFormSubmit: (formData) => {
    const cardAdded = createCard(formData);
    cardList.addItem(cardAdded);
  }
});

function handleOpenPopupFullImage(object) {
  return () => popupFullImage.open(object);
}

function handlePopupAddOpen() {
  newCardValidation.cleanErrors();
  popupFormAdd.open();
}



// function handlePopupEditOpen() {
//   nameInput.value = profileName.textContent;
//   professionInput.value = profileProfession.textContent;
//   profileValidation.cleanErrors();
//   openPopup(popupEdit);
// }

// function renderCard(list, card) {
//   const cardElement = createCard(card);
//   list.prepend(cardElement);
// }

// function handleEditFormSubmit() {
//   profileName.textContent = nameInput.value;
//   profileProfession.textContent = professionInput.value;
//   closePopup(popupEdit);
// }

cardList.renderItems();
profileValidation.enableValidation();
newCardValidation.enableValidation();
popupFullImage.setEventListeners();
popupFormAdd.setEventListeners();

// buttonEdit.addEventListener('click', handlePopupEditOpen);
buttonAdd.addEventListener('click', handlePopupAddOpen);
// formEdit.addEventListener('submit', handleEditFormSubmit);
// formAdd.addEventListener('submit', handleAddFormSubmit);