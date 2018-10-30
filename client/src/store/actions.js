import { CALL_API } from 'redux-api-middleware';

export const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';
export const ADD_SALE = 'ADD_SALE';
export const TEST = "TEST";
export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILURE = "GET_DATA_SUCCESS";

export const getData = () => ({
    [CALL_API]: {
      endpoint: '/api/getKerv',
      method: 'GET',
      types: [GET_DATA_REQUEST,GET_DATA_SUCCESS, GET_DATA_FAILURE]
    }
})
  