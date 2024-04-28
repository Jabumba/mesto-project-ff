import './pages/index.css';
import { closePopupByEscKey, openModal, closeModal, closePopupByOverlay } from './scripts/modal';
import { createCard, removeButton, likeButton } from './scripts/card';
import { showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation, clearValidation } from './scripts/validation';
import { getUserId, getCards, postNewCard , editProfile, getStartsCards, getUserProfile, getUserInfo, editAvatar, deleteCard } from './scripts/api';

const cardList = document.querySelector('.places__list');

const popupProfile = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_avatar-edit');
const popupDelete = document.querySelector('.popup_type_delete');

const profileButtonClose = document.querySelector('.popup_type_edit .popup__close');
const cardButtonClose = document.querySelector('.popup_type_new-card .popup__close');
const imageButtonClose = document.querySelector('.popup_type_image .popup__close');
const avatarButtonClose = document.querySelector('.popup_type_avatar-edit .popup__close');
const deleteButtonClose = document.querySelector('.popup_type_delete .popup__close');

const profileButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar__edit');
const deleteButton = document.querySelectorAll('.card__delete-button');

const formProfile = document.querySelector('.popup_type_edit .popup__form');
const formCard = document.querySelector('.popup_type_new-card .popup__form');
const formAvatar = document.querySelector('.popup_type_avatar-edit .popup__form');

let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');
let profileImage = document.querySelector('.profile__image');

popupProfile.classList.add('popup_is-animated');
popupCard.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');
popupAvatar.classList.add('popup_is-animated');
popupDelete.classList.add('popup_is-animated');

function clickImage(evt) {
    if(evt.target.classList.contains('card__image')) {
        openModal(popupImage);
        popupImage.querySelector('.popup__image').src = evt.target.src;
        popupImage.querySelector('.popup__caption').textContent = evt.target.alt;
    };
};

function addCard(evt) {
    evt.preventDefault();
    const button = evt.target.querySelector('.popup__button');
    const cardName = document.querySelector('.popup__input_type_card-name').value;
    const cardUrl = document.querySelector('.popup__input_type_url').value;

    button.textContent = 'Сохранение...';

    setTimeout(() => {
        postNewCard(cardName, cardUrl);
        const cardData = {name: cardName, link: cardUrl, likes: [], owner: {}};
        const card = createCard(cardData, removeButton, likeButton, clickImage);

        cardList.prepend(card);
        popupCard.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', closePopupByEscKey);
        popupCard.removeEventListener('click', closePopupByOverlay);
        evt.target.reset();
        clearValidation(evt.target, {
            formSelector: '.popup__form',
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'form__input-error'
        });
    }, 1000);
};

function profileDataSubmit(evt) {
    evt.preventDefault();
    const button = evt.target.querySelector('.popup__button');
    const jobValue = evt.target.querySelector('.popup__input_type_description').value;
    const nameValue = evt.target.querySelector('.popup__input_type_name').value;

    button.textContent = 'Сохранение...';

    setTimeout(() => {
        editProfile(nameValue, jobValue);
        profileTitle.textContent = nameValue;
        profileDescription.textContent = jobValue;
        popupProfile.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', closePopupByEscKey);
        popupProfile.removeEventListener('click', closePopupByOverlay);
    }, 1000);
};

function avatarDataSubmit(evt) {
    evt.preventDefault();
    const button = evt.target.querySelector('.popup__button');
    const urlValue = evt.target.querySelector('.popup__input_type_card-url').value;
    button.textContent = 'Сохранение...';

    setTimeout(() => {
        editAvatar(urlValue);
        profileImage.style.backgroundImage = `url(${urlValue})`;
        popupAvatar.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', closePopupByEscKey);
        popupAvatar.removeEventListener('click', closePopupByOverlay);
    }, 1000);
};

getStartsCards(createCard, openModal, likeButton, clickImage);

formAvatar.addEventListener('submit', avatarDataSubmit);

formProfile.addEventListener('submit', profileDataSubmit);

formCard.addEventListener('submit', addCard);

profileButton.addEventListener('click', () => {
    popupProfile.querySelector('.popup__input_type_name').value = profileTitle.textContent;
    popupProfile.querySelector('.popup__input_type_description').value = profileDescription.textContent;
    openModal(popupProfile);

    clearValidation(formProfile, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'form__input-error'
    });
});

cardButton.addEventListener('click', () => {
    openModal(popupCard);
});

avatarButton.addEventListener('click', () => {
    openModal(popupAvatar);
    clearValidation(formAvatar, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'form__input-error'
    });
});

avatarButtonClose.addEventListener('click', () => {
    closeModal(popupAvatar);
})

profileButtonClose.addEventListener('click', () => {
    closeModal(popupProfile);
});

cardButtonClose.addEventListener('click', () => {
    closeModal(popupCard);
});

imageButtonClose.addEventListener('click', () => {
    closeModal(popupImage);
});

deleteButtonClose.addEventListener('click', () => {
    closeModal(popupDelete);
});

enableValidation(
    {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'form__input-error'
    }
);

getUserProfile(profileTitle, profileDescription, profileImage);