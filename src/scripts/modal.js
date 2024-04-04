const popup = document.querySelectorAll('.popup');
const profileButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');
const popupClose = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');



function closeWithButton(evt) {
    if(evt.key === 'Escape') {
        popup[0].classList.remove('popup_is-animated');
        popup[1].classList.remove('popup_is-animated');
        popup[2].classList.remove('popup_is-animated');
    };
};

function openModal(evt) {
    switch(evt.target) {
        case profileButton:
            popup[0].classList.add('popup_is-animated');
            popup[0].style.opacity = '1'
            popup[0].style.visibility = 'visible'
            popup[0].querySelector('.popup__input_type_name').value = profileTitle.textContent;
            popup[0].querySelector('.popup__input_type_description').value = profileDescription.textContent;

            document.addEventListener('keydown', closeWithButton);
            break;
        case cardButton:
            popup[1].classList.add('popup_is-animated');
            popup[1].style.opacity = '1'
            popup[1].style.visibility = 'visible'

            document.addEventListener('keydown', closeWithButton);
            break;
        default:

            if(evt.target.classList.contains('card__image')) {
                popup[2].classList.add('popup_is-animated');
                popup[2].style.opacity = '1'
                popup[2].style.visibility = 'visible'
                popup[2].querySelector('.popup__image').src = evt.target.src;
                popup[2].querySelector('.popup__caption').textContent = evt.target.alt;

                document.addEventListener('keydown', closeWithButton);
            };
            break;
    }
}

function closeModal(evt) {
    switch(evt.target) {
        case popup[0]:
            popup[0].style.opacity = '0'
            popup[0].style.visibility = 'hidden'
            popup[0].classList.remove('popup_is-animated');
            document.removeEventListener('keydown', closeWithButton);
            break;
        case popup[1]:
            popup[1].style.opacity = '0'
            popup[1].style.visibility = 'hidden'
            popup[1].classList.remove('popup_is-animated');
            document.removeEventListener('keydown', closeWithButton);
            break;
        case popup[2]:
            popup[2].style.opacity = '0'
            popup[2].style.visibility = 'hidden'
            popup[2].classList.remove('popup_is-animated');
            document.removeEventListener('keydown', closeWithButton);
            break;
    }
}

function closeButton(evt) {
    switch(evt.target) {
        case popupClose[0]:
            popup[0].classList.remove('popup_is-animated');
            document.removeEventListener('keydown', closeWithButton);
            break;
        case popupClose[1]:
            popup[1].classList.remove('popup_is-animated');
            document.removeEventListener('keydown', closeWithButton);
            break;
        case popupClose[2]:
            popup[2].classList.remove('popup_is-animated');
            document.removeEventListener('keydown', closeWithButton);
            break;
    }
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    const jobValue = evt.target.querySelector('.popup__input_type_description').value;
    const nameValue = evt.target.querySelector('.popup__input_type_name').value;

    
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
}

export { closeWithButton, openModal, closeModal, closeButton, handleFormSubmit };