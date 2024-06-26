const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-11',
    headers: {
        authorization: '074e59d9-33a5-41d5-93b8-144bbab5c7cc',
        'Content-Type': 'application/json'
    }
};

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then((res) => {
        return handleResponse(res);
    })
};
  
export const postNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then((res) => {
        return handleResponse(res);
    })
};

export const editProfile = (name, job) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: job
        })
    })
    .then((res) => {
        return handleResponse(res);
    })
};

export const getUserProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then((res) => {
        return handleResponse(res);
    })
};

export const editAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
        })
    })
    .then((res) => {
        return handleResponse(res);
    })
};

export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        return handleResponse(res);
    })
};

export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then((res) => {
        return handleResponse(res);
    })
}

export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((likes) => {
        return handleResponse(likes);
    })
};