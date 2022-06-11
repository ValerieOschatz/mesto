const formEdit = document.querySelector('[name = "edit-form"]');
const formAdd = document.querySelector('[name = "add-form"]');
const formAvatar = document.querySelector('[name = "avatar-form"]');
const nameInput = formEdit.querySelector('#profileName');
const professionInput = formEdit.querySelector('#profileInfo');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonAvatar = document.querySelector('.profile__avatar');
const cardListSelector = '.elements__list';
const popupImageSelector = '.popup_type_full-image';
const popupAddSelector = '.popup_type_add';
const popupEditSelector = '.popup_type_edit';
const popupDeleteSelector = '.popup_type_delete-card';
const popupAvatarSelector = '.popup_type_change-avatar';
const profileNameSelector = '.profile__name';
const profileInfoSelector = '.profile__profession';
const avatarSelector = '.profile__avatar';

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
  formAvatar,
  nameInput,
  professionInput,
  buttonEdit,
  buttonAdd,
  buttonAvatar,
  cardListSelector,
  popupImageSelector,
  popupAddSelector,
  popupEditSelector,
  popupDeleteSelector,
  popupAvatarSelector,
  profileNameSelector,
  profileInfoSelector,
  avatarSelector,
  settings
};