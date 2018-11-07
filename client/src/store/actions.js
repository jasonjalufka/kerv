import { CALL_API } from 'redux-api-middleware';

export const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';
export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILURE = "GET_DATA_SUCCESS";
export const ADD_SALE_REQUEST = "ADD_SALE_REQUEST";
export const ADD_SALE_SUCCESS = "ADD_SALE_SUCCESS";
export const ADD_SALE_FAILURE = "ADD_SALE_FAILURE";
export const GET_SALES_REQUEST = "GET_SALE_REQUEST";
export const GET_SALES_SUCCESS = "GET_SALE_SUCCESS";
export const GET_SALES_FAILURE = "GET_SALE_SUCCESS";
export const GET_LOGIN_REQUEST = "GET_LOGIN_REQUEST";
export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_LOGIN_FAILURE = "GET_LOGIN_FAILURE";


export const getKervData = () => ({
  [CALL_API]: {
    endpoint: '/api/kerv/',
    method: 'GET',
    types: [GET_DATA_REQUEST,GET_DATA_SUCCESS, GET_DATA_FAILURE]
  }
})

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