import { getUserId, getCards, postNewCard , editProfile, getStartsCards, getUserProfile, getUserInfo, 
editAvatar, deleteCard, addLike, removeLike } from './api';
import { closeModal } from './modal';

const popupDelete = document.querySelector('.popup_type_delete');

function removeButton(evt) {
    const popupDelete = document.querySelector('.popup_type_delete');
    const card = evt.parentElement;
    deleteCard(card.id);

    card.remove();
    closeModal(popupDelete);
};

function likeButton(evt) {
    const likesCounter = evt.target.parentElement.querySelector('.likes__counter');
    const userSelectCard = evt.target.parentElement.parentElement.parentElement;
    
    if(!evt.target.classList.contains('card__like-button_is-active')) {
        getCards()
        .then((cardList) => {
            cardList.forEach(cardElement => {
                if(cardElement._id === userSelectCard.id) {
                    addLike(cardElement._id)
                    .then((res) => {
                        evt.target.classList.add('card__like-button_is-active');
                        likesCounter.textContent = Number(likesCounter.textContent) + 1;
                    })
                };
            });
        });
    };





    if(evt.target.classList.contains('card__like-button_is-active')) {
        getCards()
        .then((cardList) => {
            cardList.forEach(cardElement => {
                if(cardElement._id === userSelectCard.id) {
                    removeLike(cardElement._id)
                    .then((res) => {
                        evt.target.classList.remove('card__like-button_is-active');
                        likesCounter.textContent = Number(likesCounter.textContent) - 1;
                    })
                };
            });
        });
    };
};

function createCard(cardData, openCallback, likeCallback, clickCallback) {
    const cardTemplate = document.querySelector('#card-template').cloneNode(true);
    const card = cardTemplate.content.querySelector('.places__item').cloneNode(true);
    if(cardData._id !== undefined) {
        card.id = cardData._id;
    };
    card.querySelector('.card__image').src = cardData.link;
    card.querySelector('.card__image').alt = cardData.name;
    card.querySelector('.card__title').textContent = cardData.name;

    const heartButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');
    const imageButton = document.querySelector('.places__list');
    const likesCounter = card.querySelector('.likes__counter');

    const likesArr =  cardData.likes;
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    likesArr.forEach((userElement) => {
        if(userElement.name === profileTitle.textContent && userElement.about === profileDescription.textContent) {
            heartButton.classList.add('card__like-button_is-active');
        }
    });
    
    if(cardData.owner._id !== undefined) {
        getUserId(cardData.owner._id, deleteButton, openCallback, popupDelete, removeButton);
    }
    heartButton.addEventListener('click', likeCallback);
    imageButton.addEventListener('click', clickCallback);
    if(cardData.likes.length > 0) {
        likesCounter.textContent = cardData.likes.length;
    };
    const cardList = document.querySelector('.places__list');
    cardList.append(card);
    return card
};

export { createCard, removeButton, likeButton };