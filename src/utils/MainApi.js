import {IMG_BASE_URL} from "./constants";
// import { BASE_URL } from "./constants"

const BASE_URL = "http://localhost:3000";

function handleResponse(res) {
  // console.log('auth api', res);
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error! : ${res.status}`);
  }
}

export function register(name, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",

    body: JSON.stringify({ name, email, password }),
  }).then(handleResponse);
}

export function logIn(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",

    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export function logOut() {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then(handleResponse);
}

export function getCurrentUser() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then(handleResponse);
}

export function checkToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(handleResponse);
}

export function setUserInfo(item) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",

    body: JSON.stringify({
      name: item.name,
      email: item.email,
    }),
  }).then(handleResponse);
}

//saved movies
export function getSavedMovies() {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then(handleResponse);
}

export function saveMovie(item) {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",

    body: JSON.stringify({
      country: item.country,
      director: item.director,
      duration: item.duration,
      year: item.year,
      description: item.description,
      image: `${IMG_BASE_URL}${item.image.url}`,
      trailerLink: item.trailerLink,
      thumbnail: `${IMG_BASE_URL}${item.image.formats.thumbnail.url}`,
      movieId: item.id,
      nameRU: item.nameRU,
      nameEN: item.nameEN,
    }),
  }).then(handleResponse);
}

// удалить сохраненный фильм
export function deleteSavedMovie(movieId) {
  // console.log(cardId, `${this._baseUrl}/cards/${cardId}`)
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then(handleResponse);
}

// export function changeLikeCardStatus(id, status) {
//   if (status) {
//     return fetch(`${BASE_URL}/cards/${id}/likes`, {
//       method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     credentials : "include"

//     }).then(handleResponse);
//   } else {
//     return fetch(`${BASE_URL}/cards/${id}/likes`, {
//       method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     credentials : "include"

//     }).then(handleResponse);
//   }
// }
