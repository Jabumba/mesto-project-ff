import { getCards, postNewCard , editProfile, getUserProfile, 
editAvatar, deleteCard, addLike, removeLike } from './api';
    
function removeButton(evt) {
    const card = evt.target.closest('.card');
    deleteCard(card.id)
    .then(() => {card.remove()})
    .catch((err) => { 
        console.log(err); 
    })
};
    
function likeButton(evt) {
    const likesCounter = evt.target.closest('.like__content').querySelector('.likes__counter');
    const userSelectCard = evt.target.closest('.card');
    const likeMethod = evt.target.classList.contains('card__like-button_is-active') ? removeLike : addLike;

    likeMethod(userSelectCard.id) 
    .then((res) => {
        likesCounter.textContent = res.likes.length;
        evt.target.classList.toggle('card__like-button_is-active'); 
    })
    .catch(err => console.log(err));
};
    
function createCard(cardData, likeCallback, clickCallback, userId) {
    const cardTemplate = document.querySelector('#card-template').cloneNode(true);
    const card = cardTemplate.content.querySelector('.places__item').cloneNode(true);
    card.id = cardData._id;
    card.querySelector('.card__image').src = cardData.link;
    card.querySelector('.card__image').alt = cardData.name;
    card.querySelector('.card__title').textContent = cardData.name;
    
    const heartButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');
    const imageButton = document.querySelector('.places__list');
    const likesCounter = card.querySelector('.likes__counter');
    
    const likesArr = cardData.likes;
    
    if(likesArr.some(element => element._id === userId)){ 
        heartButton.classList.add("card__like-button_is-active"); 
    }
    
    if(cardData.owner._id === userId) {
        deleteButton.addEventListener('click', removeButton);
    } else {
        deleteButton.remove()
    }

    heartButton.addEventListener('click', likeCallback);
    imageButton.addEventListener('click', clickCallback);
    if(cardData.likes.length > 0) {
        likesCounter.textContent = cardData.likes.length;
    };
    return card
};
    
export { createCard, removeButton, likeButton };