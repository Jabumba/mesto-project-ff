import './pages/index.css';
import { initialCards } from './scripts/cards';
import { closePopupByEscKey, openModal, closeModal, profileDataSubmit, closePopupByOverlay } from './scripts/modal';
import { createCard, removeButton, likeButton, addCard, clickImage } from './scripts/card';
// import likeInactive from './images/like-inactive.svg';
// import likeActive from './images/like-active.svg';

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').cloneNode(true);

const popupProfile = document.querySelectorAll('.popup')[0];
const popupCard = document.querySelectorAll('.popup')[1];
const popupImage = document.querySelectorAll('.popup')[2];

const profileButtonClose = document.querySelectorAll('.popup__close')[0];
const cardButtonClose = document.querySelectorAll('.popup__close')[1];
const imageButtonClose = document.querySelectorAll('.popup__close')[2];

const profileButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');
const imageButton = document.querySelector('.places__list');

const formProfile = document.querySelectorAll('.popup__form')[0];
const formCard = document.querySelectorAll('.popup__form')[1];
const formImage = document.querySelectorAll('.popup__form')[2];

popupProfile.classList.add('popup_is-animated');
popupCard.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');

// function removeButton(evt) {
//   const evtTarget = evt.target;
//   evtTarget.parentElement.remove();
// };

// function likeButton(evt) {
//   evt.target.classList.toggle('card__like-button_is-active');
//   console.log(evt.target.classList);
// };

// function createCard(cardData, removeCallback, likeCallback) {
//   const card = cardTemplate.content.querySelector('.places__item').cloneNode(true);
//   card.querySelector('.card__image').src = cardData.link;
//   card.querySelector('.card__image').alt = cardData.name;
//   card.querySelector('.card__title').textContent = cardData.name;

//   const heartButton = card.querySelector('.card__like-button');
//   const deleteButton = card.querySelector('.card__delete-button');
//   heartButton.style.backgroundImage = `url("${likeInactive}")`

//   deleteButton.addEventListener('click', removeCallback);
//   heartButton.addEventListener('click', likeCallback);

//   cardList.append(card);
// };

for(let i = 0; i < initialCards.length; i++) {
    createCard(initialCards[i], removeButton, likeButton, clickImage);
};



formProfile.addEventListener('submit', profileDataSubmit);

formCard.addEventListener('submit', addCard);

profileButton.addEventListener('click', () => {
    openModal(popupProfile);
});

cardButton.addEventListener('click', () => {
    openModal(popupCard);
});

profileButtonClose.addEventListener('click', () => {
    closeModal(popupProfile);
});

cardButtonClose.addEventListener('click', () => {
    closeModal(popupCard);
});

imageButtonClose.addEventListener('click', (evt) => {
    closeModal(popupImage);
    popupImage.querySelector('.popup__image').src = ' ';
    popupImage.querySelector('.popup__caption').textContent = ' ';
});