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

import Card from './card.js';
import FormValidator from './formValidator.js';

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

function handlePopupEditOpen() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
  setStartSettings(formEdit);
  openPopup(popupEdit);
}

function handlePopupAddOpen() {
  formAdd.reset();
  setStartSettings(formAdd);
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

function validateForm(form) {
  const validationForm = new FormValidator(settings, form);
  validationForm.enableValidation();
}

function setStartSettings(form) {
  const validationForm = new FormValidator(settings, form);
  validationForm.setFormStartSettings();
}

validateForm(formEdit);
validateForm(formAdd);

buttonEdit.addEventListener('click', handlePopupEditOpen);
buttonAdd.addEventListener('click', handlePopupAddOpen);
formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);