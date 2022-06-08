const formEdit = document.querySelector('[name = "edit-form"]');
const formAdd = document.querySelector('[name = "add-form"]');
const nameInput = formEdit.querySelector('#profileName');
const professionInput = formEdit.querySelector('#profileInfo');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const cardListSelector = '.elements__list';
const popupImageSelector = '.popup_type_full-image';
const popupAddSelector = '.popup_type_add';
const popupEditSelector = '.popup_type_edit';
const profileNameSelector = '.profile__name';
const profileInfoSelector = '.profile__profession';

const settings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

export {
  formEdit,
  formAdd,
  nameInput,
  professionInput,
  buttonEdit,
  buttonAdd,
  cardListSelector,
  popupImageSelector,
  popupAddSelector,
  popupEditSelector,
  profileNameSelector,
  profileInfoSelector,
  settings
};