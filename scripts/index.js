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
  popupFullImage,
  fullImage,
  fullImageTitle,
  elementsList,
  initialCards,
  settings
} from './data.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profileValidation = new FormValidator(settings, formEdit);
const newCardValidation = new FormValidator(settings, formAdd);

function openPopup(popupElement) {
  popupElement.addEventListener('mousedown', handleClickPopupClose);
  document.addEventListener('keydown', handleKeyPopupClose);
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.removeEventListener('mousedown', handleClickPopupClose);
  document.removeEventListener('keydown', handleKeyPopupClose);
  popupElement.classList.remove('popup_opened');
}

function handleClickPopupClose(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget);
  }
}

function handleKeyPopupClose(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function handlePopupEditOpen() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
  profileValidation.cleanErrors();
  openPopup(popupEdit);
}

function handlePopupAddOpen() {
  formAdd.reset();
  newCardValidation.cleanErrors();
  openPopup(popupAdd);
}

function openPopupFullImage(object) {
  fullImage.src = object.link;
  fullImage.alt = object.name;
  fullImageTitle.textContent = object.name;
  openPopup(popupFullImage);
}

function handleOpenPopupFullImage(object) {
  return () => openPopupFullImage(object);
}

function createCard(object) {
  const newCard = new Card(object, '.element-template', handleOpenPopupFullImage(object));
  const cardElement = newCard.generateCard();
  return cardElement;
}

function renderCard(list, card) {
  const cardElement = createCard(card);
  list.prepend(cardElement);
}

function handleEditFormSubmit() {
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupEdit);
}

function handleAddFormSubmit() {
  const cardAdded = {};
  cardAdded.name = placeInput.value;
  cardAdded.link = linkInput.value;
  renderCard(elementsList, cardAdded);
  closePopup(popupAdd);
}

initialCards.forEach((item) => {
  renderCard(elementsList, item);
});

profileValidation.enableValidation();
newCardValidation.enableValidation();

buttonEdit.addEventListener('click', handlePopupEditOpen);
buttonAdd.addEventListener('click', handlePopupAddOpen);
formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);