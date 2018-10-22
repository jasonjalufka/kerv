import * as actionTypes from '../actions';
import drinks from '../../data/drinks';
import inventory from '../../data/inventory';

const initialState = {
    orderCount: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ORDER_ITEM:
            console.log('[orderReducer.js]');
            let newState = {
                ...state,
                [state.orderCount]: action.order,
                orderCount: state.orderCount + 1
            }
            console.log(newState);
            return newState;
        default:
            return state;
    }
}

export default reducer;