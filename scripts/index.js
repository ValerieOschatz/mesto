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
      addForm = popupAdd.querySelector('.popup__form_add');
      // popupFullImage = document.querySelector('.popup_type_full-image'),
      // likeButtons = document.querySelectorAll('.element__like-button'),
      // images = document.querySelectorAll('.element__image'),
      // fullImage = popupFullImage.querySelector('.popup__image'),
      // fullImageTitle = popupFullImage.querySelector('.popup__image-title'),
      // deleteButtons = document.querySelectorAll('.element__delete');

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

editButton.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});

addButton.addEventListener('click', function() {
  openPopup(popupAdd);
});

popupCloseButtons.forEach(closeButton => {
  closeButton.addEventListener('click', closePopup);
})



function submitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup();
}

function submitAddForm(evt) {
  evt.preventDefault();
  closePopup();
}

editForm.addEventListener('submit', submitEditForm);
addForm.addEventListener('submit', submitAddForm);



// likeButtons.forEach(likeButton => {
//   likeButton.addEventListener('click', function() {
//     likeButton.classList.toggle('element__like-button_active');
//   })
// })

// images.forEach(image => {
//   image.addEventListener('click', function() {
//     popupFullImage.classList.add('popup_opened');

//     const link = image.getAttribute('src'),
//           alt = image.getAttribute('alt'),
//           card = image.parentElement,
//           imageTitle = card.querySelector('.element__title');

//     fullImage.src = link;
//     fullImage.alt = alt;
//     fullImageTitle.textContent = imageTitle.textContent;
//   })
// })

// deleteButtons.forEach(deleteButton => {
//   deleteButton.addEventListener('click', function() {
//     deleteButton.closest('.element').remove();
//   })
// })
