import { CALL_API } from 'redux-api-middleware';

export const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';
export const REMOVE_ORDER_ITEM = 'REMOVE_ORDER_ITEM';
export const LOAD = 'LOAD';

export const ADD_SALE_REQUEST = "ADD_SALE_REQUEST";
export const ADD_SALE_SUCCESS = "ADD_SALE_SUCCESS";
export const ADD_SALE_FAILURE = "ADD_SALE_FAILURE";

export const UPDATE_MENU_REQUEST = "UPDATE_MENU_REQUEST";
export const UPDATE_MENU_SUCCESS = "UPDATE_MENU_SUCCESS";
export const UPDATE_MENU_FAILURE = "UPDATE_MENU_FAILURE";

export const GET_SALES_REQUEST = "GET_SALE_REQUEST";
export const GET_SALES_SUCCESS = "GET_SALE_SUCCESS";
export const GET_SALES_FAILURE = "GET_SALE_SUCCESS";

export const GET_LOGIN_REQUEST = "GET_LOGIN_REQUEST";
export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_LOGIN_FAILURE = "GET_LOGIN_FAILURE";

export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";

export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const addSale = (payload) =>({
  [CALL_API]: {
    endpoint: '/api/sales',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    types: [ADD_SALE_REQUEST,ADD_SALE_SUCCESS,ADD_SALE_FAILURE],
    body: JSON.stringify(payload)
  }
})

export const getLogin = (payload) => ({
  [CALL_API]: {
    endpoint: '/api/login/',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    types: [GET_LOGIN_REQUEST,GET_LOGIN_SUCCESS,GET_LOGIN_FAILURE],
    body: JSON.stringify(payload)
  }
})  

export const updateMenu = (payload) => ({
  [CALL_API]: {
    endpoint: '/api/menu',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    types: [UPDATE_MENU_REQUEST,UPDATE_MENU_SUCCESS,UPDATE_MENU_FAILURE],
    body: JSON.stringify(payload)
  }
})

export const getUsers = () => ({
  [CALL_API]: {
    endpoint: '/api/user',
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    types: [GET_USERS_REQUEST,GET_USERS_SUCCESS,GET_USERS_FAILURE]
  }
})  

export const addUser = (payload) => ({
  [CALL_API]: {
    endpoint: '/api/user',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    types: [ADD_USER_REQUEST,GET_USERS_SUCCESS,ADD_USER_FAILURE],
    body: JSON.stringify(payload)
  }
})  

export const deleteUser = (payload) => ({
  [CALL_API]: {
    endpoint: '/api/user',
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    types: [DELETE_USER_REQUEST,GET_USERS_SUCCESS,DELETE_USER_FAILURE],
    body: JSON.stringify(payload)
  }
})  