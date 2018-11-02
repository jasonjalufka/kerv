import * as actionTypes from '../actions';

const initialState = {
    orderCount: 0,
    orderTotal: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ORDER_ITEM:
            let newState = {
                ...state,
                [state.orderCount]: action.order,
                orderCount: state.orderCount + 1,
                orderTotal: state.orderTotal + action.order.total
            }
            return newState;
        case actionTypes.ADD_SALE_SUCCESS:
            return { orderCount: 0, orderTotal: 0 };
        default:
            return state;
    }
}
export default reducer;