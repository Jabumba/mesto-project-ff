import './pages/index.css';
import { closePopupByEscKey, openModal, closeModal, closePopupByOverlay } from './scripts/modal';
import { createCard, removeButton, likeButton } from './scripts/card';
import { enableValidation, clearValidation } from './scripts/validation';
import { getCards, postNewCard, editProfile, getUserProfile, editAvatar } from './scripts/api';

const selectorValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error'
}

let userId;
getUserProfile()
.then((user) => {
    userId = user._id;
})
.catch(err => console.log(err))

const cardList = document.querySelector('.places__list');

const popupProfile = document.querySelector('.popup_type_edit');
const popupCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_avatar-edit');

const profileButtonClose = document.querySelector('.popup_type_edit .popup__close');
const cardButtonClose = document.querySelector('.popup_type_new-card .popup__close');
const imageButtonClose = document.querySelector('.popup_type_image .popup__close');
const avatarButtonClose = document.querySelector('.popup_type_avatar-edit .popup__close');

const profileButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar__edit');

const formProfile = document.querySelector('.popup_type_edit .popup__form');
const formCard = document.querySelector('.popup_type_new-card .popup__form');
const formAvatar = document.querySelector('.popup_type_avatar-edit .popup__form');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

popupProfile.classList.add('popup_is-animated');
popupCard.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');
popupAvatar.classList.add('popup_is-animated');

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
    
    postNewCard(cardName, cardUrl)
    .then((data) => {
        const card = createCard(data, likeButton, clickImage, userId);
        cardList.prepend(card);
    })
    .catch(err => console.log(err))
    .finally(() => {
        button.textContent = 'Сохранение...';
    })

    closeModal(popupCard)
    evt.target.reset();
    clearValidation(evt.target, selectorValidation);
};

function profileDataSubmit(evt) {
    evt.preventDefault();
    const button = evt.target.querySelector('.popup__button');
    const jobValue = evt.target.querySelector('.popup__input_type_description').value;
    const nameValue = evt.target.querySelector('.popup__input_type_name').value;

    editProfile(nameValue, jobValue)
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        button.textContent = 'Сохранение...';
    })
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
    popupProfile.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEscKey);
    popupProfile.removeEventListener('click', closePopupByOverlay);
};

function avatarDataSubmit(evt) {
    evt.preventDefault();
    const button = evt.target.querySelector('.popup__button');
    const urlValue = evt.target.querySelector('.popup__input_type_card-url').value;

    editAvatar(urlValue)
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        button.textContent = 'Сохранение...';
    })
    profileImage.style.backgroundImage = `url(${urlValue})`;
    popupAvatar.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEscKey);
    popupAvatar.removeEventListener('click', closePopupByOverlay);
};

formAvatar.addEventListener('submit', avatarDataSubmit);

formProfile.addEventListener('submit', profileDataSubmit);

formCard.addEventListener('submit', addCard);

profileButton.addEventListener('click', () => {
    popupProfile.querySelector('.popup__input_type_name').value = profileTitle.textContent;
    popupProfile.querySelector('.popup__input_type_description').value = profileDescription.textContent;
    openModal(popupProfile);

    const button = popupProfile.querySelector('.popup__button');
    button.textContent = 'Сохранить';

    clearValidation(formProfile, selectorValidation);
});

cardButton.addEventListener('click', () => {
    const button = popupCard.querySelector('.popup__button');
    button.textContent = 'Сохранить';
    openModal(popupCard);
});

avatarButton.addEventListener('click', () => {
    const button = popupAvatar.querySelector('.popup__button');
    button.textContent = 'Сохранить';
    openModal(popupAvatar);
    clearValidation(formAvatar, selectorValidation);
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

enableValidation(
    selectorValidation
);

Promise.all([getUserProfile(), getCards()])
.then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;

    for(let i = 0; i < cards.length; i++) {
        cardList.append(createCard(cards[i], likeButton, clickImage, userId));
    };
})
.catch(err => console.log(err))