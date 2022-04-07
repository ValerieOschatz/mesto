'use strict';

const popups = document.querySelectorAll('.popup'),
      popupEdit = document.querySelector('.popup_type_edit'),
      popupAdd = document.querySelector('.popup_type_add'),
      editButton = document.querySelector('.profile__edit-button'),
      addButton = document.querySelector('.profile__add-button'),
      popupCloseButtons = document.querySelectorAll('.popup__close-button'),
      editForm = popupEdit.querySelector('.popup__form_edit'),
      nameInput = editForm.querySelector('#name'),
      professionInput = editForm.querySelector('#profession'),
      profileName = document.querySelector('.profile__name'),
      profileProfession = document.querySelector('.profile__profession'),
      addForm = popupAdd.querySelector('.popup__form_add'),
      placeInput = addForm.querySelector('#place'),
      linkInput = addForm.querySelector('#link'),
      elementsList = document.querySelector('.elements__list'),
      elementTemplate = document.querySelector('.element-template').content,
      popupFullImage = document.querySelector('.popup_type_full-image'),
      fullImage = popupFullImage.querySelector('.popup__image'),
      fullImageTitle = popupFullImage.querySelector('.popup__image-title');

function createCard(object) {
  const cardElement = elementTemplate.cloneNode(true),
        elementImage = cardElement.querySelector('.element__image'),
        elementTitle = cardElement.querySelector('.element__title'),
        deleteButton = cardElement.querySelector('.element__delete-button'),
        likeButton = cardElement.querySelector('.element__like-button');

  elementImage.src = object.link;
  elementImage.alt = object.name;
  elementTitle.textContent = object.name;

  elementImage.addEventListener('click', function() {
    openPopup(popupFullImage);
    fullImage.src = object.link;
    fullImage.alt = object.name;
    fullImageTitle.textContent = object.name;
  });

  deleteButton.addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });

  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  return cardElement;
}

function renderCard(card) {
  const newCard = createCard(card);
  elementsList.prepend(newCard);
}

initialCards.forEach(item => {
  renderCard(item);
});

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup() {
  popups.forEach(popup => {
    popup.classList.remove('popup_opened');
  });
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup();
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const addedCard = {};
  addedCard.name = placeInput.value;
  addedCard.link = linkInput.value;

  renderCard(addedCard);
  placeInput.value = '';
  linkInput.value = '';

  closePopup();
}

function openPopupEdit() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

function openPopupAdd() {
  openPopup(popupAdd);
}

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
editForm.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);

popupCloseButtons.forEach(closeButton => {
  closeButton.addEventListener('click', closePopup);
});

