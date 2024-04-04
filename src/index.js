import './pages/index.css';
import { initialCards } from './scripts/cards';
import { closeWithButton, openModal, closeModal, closeButton, handleFormSubmit } from './scripts/modal';
import { addCard } from './scripts/card';
import likeInactive from './images/like-inactive.svg';
import likeActive from './images/like-active.svg';

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').cloneNode(true);

const popup = document.querySelectorAll('.popup');
const profileButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');
const imageButton = document.querySelector('.places__list');
const popupClose = document.querySelectorAll('.popup__close');

const formElement = document.querySelectorAll('.popup__form');

function removeButton(evt) {
  const evtTarget = evt.target;
  evtTarget.parentElement.remove();
};

function likeButton(evt) {
  const event = evt.target;
  if(event.style.backgroundImage === `url("${likeInactive}")`) {
    event.style.backgroundImage = `url("${likeActive}")`;
  } else {
    event.style.backgroundImage = `url("${likeInactive}")`;
  };
}

function createCard(cardData, removeCallback, likeCallback) {
  const card = cardTemplate.content.querySelector('.places__item').cloneNode(true);
  card.querySelector('.card__image').src = cardData.link;
  card.querySelector('.card__image').alt = cardData.name;
  card.querySelector('.card__title').textContent = cardData.name;

  const heartButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');
  heartButton.style.backgroundImage = `url("${likeInactive}")`

  deleteButton.addEventListener('click', removeCallback);
  heartButton.addEventListener('click', likeCallback);

  cardList.append(card);
};

for(let i = 0; i < initialCards.length; i++) {
  createCard(initialCards[i], removeButton, likeButton);
};



formElement[0].addEventListener('submit', handleFormSubmit);
formElement[1].addEventListener('submit', addCard)

profileButton.addEventListener('click', openModal);
cardButton.addEventListener('click', openModal);
imageButton.addEventListener('click', openModal);

popup[0].addEventListener('click', closeModal);
popup[1].addEventListener('click', closeModal);
popup[2].addEventListener('click', closeModal);

popupClose[0].addEventListener('click', closeButton);
popupClose[1].addEventListener('click', closeButton);
popupClose[2].addEventListener('click', closeButton);