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
  cardListSelector,
  popupEditSelector,
  popupImageSelector,
  initialCards,
  settings
} from './data.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';

const profileValidation = new FormValidator(settings, formEdit);
const newCardValidation = new FormValidator(settings, formAdd);

const cardList = new Section({ 
  items: initialCards,
  renderer: (cardItems) => {
    cardItems.forEach(cardItem => {
      const popupFullImage = new PopupWithImage(popupImageSelector, cardItem);
      const card = new Card(cardItem, '.element-template', () => popupFullImage.open());
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    });
  }}, cardListSelector
);

// function handleOpenPopupFullImage(object) {
//   const popupFullImage = new PopupWithImage(popupImageSelector, {link: object.link, name: object.name});
// }

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

// function openPopupFullImage(object) {
//   fullImage.src = object.link;
//   fullImage.alt = object.name;
//   fullImageTitle.textContent = object.name;
//   // openPopup(popupFullImage);
// }

// export function handleOpenPopupFullImage(object) {
//   return () => openPopupFullImage(object);
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
  
//   const card = new Section({ 
//     items: cardAdded,
//     renderer: (cardItem) => {
//       const newCard = new Card(cardItem, '.element-template', handleOpenPopupFullImage(cardItem));
//       const cardElement = newCard.generateCard();
//       card.addItem(cardElement);
//     }}, cardListSelector
//   );
//   card.renderItems();

//   closePopup(popupAdd);
// }

profileValidation.enableValidation();
newCardValidation.enableValidation();
cardList.renderItems();

// buttonEdit.addEventListener('click', handlePopupEditOpen);
// buttonAdd.addEventListener('click', handlePopupAddOpen);
// formEdit.addEventListener('submit', handleEditFormSubmit);
// formAdd.addEventListener('submit', handleAddFormSubmit);
