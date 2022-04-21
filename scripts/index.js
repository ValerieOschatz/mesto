'use strict';

const popupEdit = document.querySelector('.popup_type_edit'),
      buttonCloseEdit = popupEdit.querySelector('.popup__close-button'),
      formEdit = popupEdit.querySelector('.popup__form'),
      nameInput = formEdit.querySelector('#name'),
      professionInput = formEdit.querySelector('#profession'),
      buttonEdit = document.querySelector('.profile__edit-button'),
      profileName = document.querySelector('.profile__name'),
      profileProfession = document.querySelector('.profile__profession'),
      popupAdd = document.querySelector('.popup_type_add'),
      buttonCloseAdd = popupAdd.querySelector('.popup__close-button'),
      formAdd = popupAdd.querySelector('.popup__form'),
      placeInput = formAdd.querySelector('#place'),
      linkInput = formAdd.querySelector('#link'),
      buttonAdd = document.querySelector('.profile__add-button'),
      popupFullImage = document.querySelector('.popup_type_full-image'),
      buttonCloseFullImage = popupFullImage.querySelector('.popup__close-button'),
      fullImage = popupFullImage.querySelector('.popup__image'),
      fullImageTitle = popupFullImage.querySelector('.popup__image-title'),
      elementsList = document.querySelector('.elements__list'),
      elementTemplate = document.querySelector('.element-template').content;

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function handlePopupEditOpen() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
  setFormStartSettings(formEdit, settings);
  openPopup(popupEdit);
}

function handlePopupAddOpen() {
  setFormStartSettings(formAdd, settings);
  openPopup(popupAdd);
}

function openPopupFullImage(object) {
  fullImage.src = object.link;
  fullImage.alt = object.name;
  fullImageTitle.textContent = object.name;
  openPopup(popupFullImage);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function handlePopupEditClose() {
  closePopup(popupEdit);
}

function handlePopupAddClose() {
  closePopup(popupAdd);
  formAdd.reset();
}

function handlePopupFullImageClose() {
  closePopup(popupFullImage);
}

function handleElementDelete(evt) {
  evt.target.closest('.element').remove();
}

function handleLikeClick(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function createCard(object) {
  const cardElement = elementTemplate.cloneNode(true),
        elementImage = cardElement.querySelector('.element__image'),
        elementTitle = cardElement.querySelector('.element__title'),
        buttonDelete = cardElement.querySelector('.element__delete-button'),
        buttonLike = cardElement.querySelector('.element__like-button');

  elementImage.src = object.link;
  elementImage.alt = object.name;
  elementTitle.textContent = object.name;

  const handleFullImageOpen = () => openPopupFullImage(object);

  elementImage.addEventListener('click', handleFullImageOpen);
  buttonDelete.addEventListener('click', handleElementDelete);
  buttonLike.addEventListener('click', handleLikeClick);

  return cardElement;
}

function renderCard(list, object) {
  const newCard = createCard(object);
  list.prepend(newCard);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  handlePopupEditClose();
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const cardAdded = {};
  cardAdded.name = placeInput.value;
  cardAdded.link = linkInput.value;

  renderCard(elementsList, cardAdded);
  handlePopupAddClose();
}

initialCards.forEach(item => {
  renderCard(elementsList, item);
});

buttonEdit.addEventListener('click', handlePopupEditOpen);
buttonAdd.addEventListener('click', handlePopupAddOpen);
formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);
buttonCloseEdit.addEventListener('click', handlePopupEditClose);
buttonCloseAdd.addEventListener('click', handlePopupAddClose);
buttonCloseFullImage.addEventListener('click', handlePopupFullImageClose);
