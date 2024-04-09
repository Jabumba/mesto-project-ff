const popupProfile = document.querySelectorAll('.popup')[0];
const popupCard = document.querySelectorAll('.popup')[1];
const popupImage = document.querySelectorAll('.popup')[2];

const profileButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');
const imageButton = document.querySelector('.places__list');

const profileButtonClose = document.querySelectorAll('.popup__close')[0];
const cardButtonClose = document.querySelectorAll('.popup__close')[1];
const imageButtonClose = document.querySelectorAll('.popup__close')[2];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');



function closePopupByEscKey(evt) {
    if(evt.key === 'Escape') {
        popupProfile.classList.remove('popup_is-opened');
        popupCard.classList.remove('popup_is-opened');
        popupImage.classList.remove('popup_is-opened');
    };
};

function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    };
};

function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEscKey);
    modal.addEventListener('click', closePopupByOverlay);

    if(modal === popupProfile) {
        popupProfile.querySelector('.popup__input_type_name').value = profileTitle.textContent;
        popupProfile.querySelector('.popup__input_type_description').value = profileDescription.textContent;
    };
};

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEscKey);
    modal.removeEventListener('click', closePopupByOverlay);
};

function profileDataSubmit(evt) {
    evt.preventDefault();
    const jobValue = evt.target.querySelector('.popup__input_type_description').value;
    const nameValue = evt.target.querySelector('.popup__input_type_name').value;

    
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
    
    closeModal(popupProfile);
};

export { closePopupByEscKey, openModal, closeModal, profileDataSubmit, closePopupByOverlay };