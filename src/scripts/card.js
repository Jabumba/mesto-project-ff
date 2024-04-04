import likeInactive from '../images/like-inactive.svg';
import likeActive from '../images/like-active.svg';

const popup = document.querySelectorAll('.popup');
const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').cloneNode(true);

function addCard(evt) {
    evt.preventDefault();

    const cardName = document.querySelector('.popup__input_type_card-name').value;
    const cardUrl = document.querySelector('.popup__input_type_url').value;

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

    const card = cardTemplate.content.querySelector('.places__item').cloneNode(true);
    card.querySelector('.card__image').src = cardUrl;
    card.querySelector('.card__image').alt = cardName;
    card.querySelector('.card__title').textContent = cardName;

    const heartButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');
    heartButton.style.backgroundImage = `url("${likeInactive}")`

    deleteButton.addEventListener('click', removeButton);
    heartButton.addEventListener('click', likeButton);

    cardList.prepend(card);

    evt.target.reset();
    popup[1].classList.remove('popup_is-animated');
};

export { addCard }