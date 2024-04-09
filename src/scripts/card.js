import * as functions from './modal'
const popupProfile = document.querySelectorAll('.popup')[0];
const popupCard = document.querySelectorAll('.popup')[1];
const popupImage = document.querySelectorAll('.popup')[2];

const formCard = document.querySelectorAll('.popup__form')[1];

const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').cloneNode(true);



function removeButton(evt) {
    const evtTarget = evt.target;
    evtTarget.parentElement.remove();
};

function likeButton(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
    console.log(evt.target.classList);
};

function clickImage(evt) {
    if(evt.target.classList.contains('card__image')) {
        functions.openModal(popupImage);
        popupImage.querySelector('.popup__image').src = evt.target.src;
        popupImage.querySelector('.popup__caption').textContent = evt.target.alt;
    };
}

function createCard(cardData, removeCallback, likeCallback, clickCallback) {
    const card = cardTemplate.content.querySelector('.places__item').cloneNode(true);
    card.querySelector('.card__image').src = cardData.link;
    card.querySelector('.card__image').alt = cardData.name;
    card.querySelector('.card__title').textContent = cardData.name;

    const heartButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');
    const imageButton = document.querySelector('.places__list');

    deleteButton.addEventListener('click', removeCallback);
    heartButton.addEventListener('click', likeCallback);
    imageButton.addEventListener('click', clickCallback);

    cardList.append(card);
    return card
};




function addCard(evt) {
    evt.preventDefault();
    const cardName = document.querySelector('.popup__input_type_card-name').value;
    const cardUrl = document.querySelector('.popup__input_type_url').value;

    const cardData = {name: cardName, link: cardUrl};
    const card = createCard(cardData, removeButton, likeButton);

    cardList.prepend(card);
    if(evt.target === formCard) {
        evt.target.reset();
        popupCard.classList.remove('popup_is-animated');
        popupCard.classList.remove('popup_is-opened');
    };
};

export { createCard, removeButton, likeButton, addCard, clickImage };