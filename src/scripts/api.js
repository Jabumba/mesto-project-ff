const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-11',
    headers: {
        authorization: '074e59d9-33a5-41d5-93b8-144bbab5c7cc',
        'Content-Type': 'application/json'
    }
};

export const getUserId = (ownerId, deleteButton, openCallback, popup, removeCallback) => {
    fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((data) => {
        if(ownerId === data._id) {
            deleteButton.addEventListener('click', () => {
                const deleteYesButton = document.querySelector('.popup_type_delete .popup__button');
                deleteYesButton.addEventListener('click', () => {
                    removeCallback(deleteButton);
                });
                openCallback(popup)
            });
        } else {
            deleteButton.remove()
        }
    })
    .catch((err) => {
        console.log(err);
    }); ;
};

export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .catch((err) => {
        console.log(err);
    }); 
};
  
export const postNewCard = (cardName, cardUrl) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardUrl
        })
    })
    .catch((err) => {
        console.log(err);
    });
};

export const editProfile = (name, job, form) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: job
        })
    })
    .catch((err) => {
        console.log(err);
    });
};

export const getStartsCards = (createCard, openCallback, likeCallback, clickCallback) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((data) => {
        for(let i = 0; i < data.length; i++) {
            createCard(data[i], openCallback, likeCallback, clickCallback);
        };
    })
    .catch((err) => {
        console.log(err);
    });
};

export const getUserProfile = (userName, userAbout, userAvatar) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((data) => {
        userName.textContent = data.name;
        userAbout.textContent = data.about;
        userAvatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
        console.log(err);
    });
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((data) => {
        let userInfo =
        {
            userAbout: data.about,
            userAvatar: data.avatar,
            userCohort: data.cohort,
            userName: data.name,
            userId: data._id
        }
        return userInfo
    })
    .catch((err) => {
        console.log(err);
    });
};

export const editAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
        })
    })
    .catch((err) => {
        console.log(err);
    });
};

export const deleteCard = (id) => {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-11/cards/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: '074e59d9-33a5-41d5-93b8-144bbab5c7cc'
        }
    })
    .catch((err) => {
        console.log(err);
    });
};

export const addLike = (cardId) => {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-11/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: '074e59d9-33a5-41d5-93b8-144bbab5c7cc',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            about: getUserInfo().userAbout,
            avatar: getUserInfo().userAvatar,
            cohort: getUserInfo().userCohort,
            name: getUserInfo().userName,
            _id: getUserInfo().userId
        })
    })
};

export const removeLike = (cardId) => {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-11/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '074e59d9-33a5-41d5-93b8-144bbab5c7cc'
        }
    })
};