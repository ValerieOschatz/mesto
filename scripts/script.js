let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close-button');
let form = popup.querySelector('.popup__form');
let nameInput = form.querySelector('.popup__input_type_name');
let professionInput = form.querySelector('.popup__input_type_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

function openPopup() {
  popupOpenButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    professionInput.value = profileProfession.textContent;
  });

  popupCloseButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
  });
}

openPopup();

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  popup.classList.remove('popup_opened');
});

