import faker from 'faker';
import * as actionTypes from './actionTypes';
import {api} from '../../credentials'

const getPostsUrl = api + 'post';
export const getPostByIdUrl = api + 'posts';
export const getCategoriesUrl = api + 'category';
const getUsersUrl = api + 'admin/users';
const User = api + 'admin/user/'
const getCountriesUrl = api + 'countries';
const Review = api + 'admin/review/';
const Orders = api + 'admin/orders';
const questions = api + 'customer/question'



export function getPosts() {
  return function (dispatch) {
    fetch(getPostsUrl)
      .then((res) => res.json())
      .then((res) => {
        res.forEach((e) => {e.image = faker.image.image(350, 350, true);});
        dispatch({ type: actionTypes.GET_POSTS, payload: res });
      })
      .catch((err) => console.error(err));
  };
}

export function getPostsByName(name) {
  return function (dispatch) {
    fetch(getPostsUrl + "?name=" + name)
      .then((res) => res.json())
      .then((res) => {
        res.forEach((e) => {
          e.image = faker.image.image(350, 350, true);
        });
        dispatch({ type: actionTypes.GET_POSTS_BY_NAME, payload: res });
      })
      .catch((err) => console.error(err));
  };
}
export function getPostById(id) {
  return function (dispatch) {
    fetch(`${getPostByIdUrl}/${id}`)
      .then((res) => res.json())
      .then((res) => {
        while (res.Images.length < 5) {
          res.Images = [
            ...res.Images,
            { link: faker.image.image(350, 350, true) },
          ];
        }
        return res;
      })
      .then((json) => {
        dispatch({
          type: actionTypes.GET_POST_BY_ID,
          payload: json,
        });
      })
      .catch((e) => console.error(e));
  };
}

export function getCategories() {
  return function (dispatch) {
    return fetch(getCategoriesUrl)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: actionTypes.GET_CATEGORIES, payload: json });
      })
      .catch((e) => console.error(e));
  };
}

export function getCountries() {
  return function (dispatch) {
    return fetch(getCountriesUrl)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: actionTypes.GET_COUNTRIES, payload: json });
      })
      .catch((e) => console.error(e));
  };
}

export function create_post(payload, token) {
  return async (dispatch) => {
    return await fetch(`${getPostsUrl}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: actionTypes.CREATE_POST, payload: json });
      })
      .catch((e) => console.error(e));
  };
}

export function chooseCategories(category, info, index) {
  console.log("category", category)
  console.log("category", info)
  console.log("category", index)

  return {
    type: actionTypes.CHOOSE_CATEGORIES,
    payload: category,
    info,
    index,
  };
}

export function filterPostsByCategory(info) {
  return {
    type: actionTypes.FILTER_POSTS_BY_CATEGORY,
    info,
  };
}

export function resetCategories() {
  return {
    type: actionTypes.RESET_CATEGORIES,
  };
}

export function setCart(post) {
  return {
    type: actionTypes.SET_CART,
    payload: post,
  };
}


export function getCategoryPost(categoryId) {
  return { type: actionTypes.GET_CATEGORY_POST, payload: categoryId };
}

export function getOrders(token) {
  return function (dispatch) {
    return fetch(Orders, {
      method: "GET",
      headers: { "Content-Type": "application/json", token: token },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: actionTypes.GET_ORDERS, payload: json });
      })
      .catch((e) => console.error(e));
  };
}

export function filterOrder(payload) {
  return {
    type: actionTypes.SORT_ORDERS,
    payload,
  };
}

export function postReview(payload, token) {
  return async () => {
    return await fetch(Review, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    }).catch((e) => console.error(e));
  };
}

export function getReview(id, token) {
  return function (dispatch) {
    return fetch(Review + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: actionTypes.GET_REVIEW, payload: json });
      })
      .catch((e) => console.error(e));
  };
}

export function filterReview(payload) {
  return {
    type: actionTypes.FILTER_REVIEW,
    payload,
  };
}

export function getUsers(token) {
  return function (dispatch) {
    return fetch(getUsersUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: actionTypes.GET_USERS, payload: json });
      })
      .catch((e) => console.error(e));
  };
}

export function getUserById(id, token) {
  return (dispatch) => {
    return fetch(User + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: actionTypes.GET_USER_BY_ID, payload: json });
      })
      .catch((e) => console.error(e));
  };
}

export function putUser(id, input, type, token) {
  return async () => {
    return fetch(User + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ input: input, type: type }),
    })
      .then((response) => response.json())
      .catch((e) => console.error(e));
  };
}

export function resetPassword(input,token){
  return async() => {
    return fetch(`${api}admin/user/reset-password-force`,{
      method:'PUT',
      headers: {
        "Content-Type": "application/json",
        token: token,
      },

      body: JSON.stringify(input),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((e) => console.error(e));
  };
}

export function createQuestion(input, token) {
  return async () => {
    return fetch(questions, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'token' : token
      },
      body: JSON.stringify(input)
    })
    .then((response) => response.json())
      .catch((e) => console.error(e));
  }
}

export function replyQuestion(input, token){
  return async() => {
    return fetch(questions,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token' : token
      },
      body:JSON.stringify(input)
    }).then((response) => response.json())
    .catch((e) => console.error(e))
  }
}

export function setName(input){
  return{ 
    type:'SETNAME',
    payload:input
  
  }
}