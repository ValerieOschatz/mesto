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
  elementsList,
  initialCards,
  settings
} from './data.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';

export default function openPopup(popupElement) {
  popupElement.addEventListener('click', handleClickPopupClose);
  document.addEventListener('keydown', handleKeyPopupClose);
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.removeEventListener('click', handleClickPopupClose);
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

function validateForm(formElement) {
  const formValidate = new FormValidator(settings, formElement);
  formValidate.enableValidation();
  formValidate.setFormStartSettings();
}

function handlePopupEditOpen() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
  validateForm(formEdit);
  openPopup(popupEdit);
}

function handlePopupAddOpen() {
  formAdd.reset();
  validateForm(formAdd);
  openPopup(popupAdd);
}

function renderCard(list, card) {
  const newCard = new Card(card, '.element-template');
  const cardElement = newCard.generateCard();

  list.prepend(cardElement);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupEdit);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const cardAdded = {};
  cardAdded.name = placeInput.value;
  cardAdded.link = linkInput.value;
  renderCard(elementsList, cardAdded);
  closePopup(popupAdd);
}

initialCards.forEach((item) => {
  renderCard(elementsList, item);
});

buttonEdit.addEventListener('click', handlePopupEditOpen);
buttonAdd.addEventListener('click', handlePopupAddOpen);
formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);