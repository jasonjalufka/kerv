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
        case actionTypes.REMOVE_ORDER_ITEM:
            let reducedState = { ...state }
            reducedState.orderTotal -= reducedState[action.orderKey].total
            let shiftedState = {}
            delete reducedState[action.orderKey]
            Object.keys(reducedState).map(key => key).filter(element => !isNaN(parseInt(element))).map((oldKey, index) => {
                shiftedState[index] = reducedState[oldKey]
                return null
            })
            shiftedState['orderCount'] = reducedState.orderCount - 1;
            shiftedState['orderTotal'] = reducedState.orderTotal
            return shiftedState;
        default:
            return state;
    }
}
export default reducer;