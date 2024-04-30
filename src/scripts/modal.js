function closePopupByEscKey(evt) {
    if(evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    };
};

function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    };
};

function openModal(modal) {
    const button = modal.querySelector('.popup__button');
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEscKey);
    modal.addEventListener('click', closePopupByOverlay);
};

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEscKey);
    modal.removeEventListener('click', closePopupByOverlay);
};

export { closePopupByEscKey, openModal, closeModal, closePopupByOverlay };