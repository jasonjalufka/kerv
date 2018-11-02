import { CALL_API } from 'redux-api-middleware';

export const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';
export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILURE = "GET_DATA_SUCCESS";
export const ADD_SALE_REQUEST = "ADD_SALE_REQUEST";
export const ADD_SALE_SUCCESS = "ADD_SALE_SUCCESS";
export const ADD_SALE_FAILURE = "ADD_SALE_FAILURE";


export const getData = () => ({
  [CALL_API]: {
    endpoint: '/api/getKerv/',
    method: 'GET',
    types: [GET_DATA_REQUEST,GET_DATA_SUCCESS, GET_DATA_FAILURE]
  }
})

export const addSale = (payload) =>({
  [CALL_API]: {
    endpoint: '/api/addSale',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    types: [ADD_SALE_REQUEST,ADD_SALE_SUCCESS,ADD_SALE_FAILURE],
    body: JSON.stringify(payload)
  }
})
  