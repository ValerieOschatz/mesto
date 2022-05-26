import {
  popupEdit,
  formEdit,
  nameInput,
  professionInput,
  buttonEdit,
  profileName,
  profileProfession,
  popupAdd,
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
  popupImageSelector
} from './data.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';

const profileValidation = new FormValidator(settings, formEdit);
const newCardValidation = new FormValidator(settings, formAdd);

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

const popupFullImage = new PopupWithImage(popupImageSelector);

function openPopupFullImage({ link, name }) {
  popupFullImage.open({ link, name });
}

function handleOpenPopupFullImage(object) {
  return () => openPopupFullImage(object);
}


// function handlePopupEditOpen() {
//   nameInput.value = profileName.textContent;
//   professionInput.value = profileProfession.textContent;
//   profileValidation.cleanErrors();
//   openPopup(popupEdit);
// }

// function handlePopupAddOpen() {
//   formAdd.reset();
//   newCardValidation.cleanErrors();
//   openPopup(popupAdd);
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

// function handleAddFormSubmit() {
//   const cardAdded = {};
//   cardAdded.name = placeInput.value;
//   cardAdded.link = linkInput.value;
//   renderCard(elementsList, cardAdded);
//   closePopup(popupAdd);
// }

profileValidation.enableValidation();
newCardValidation.enableValidation();

cardList.renderItems();

// buttonEdit.addEventListener('click', handlePopupEditOpen);
// buttonAdd.addEventListener('click', handlePopupAddOpen);
// formEdit.addEventListener('submit', handleEditFormSubmit);
// formAdd.addEventListener('submit', handleAddFormSubmit);