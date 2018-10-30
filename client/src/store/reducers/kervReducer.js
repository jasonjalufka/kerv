// Initializes store from database
import * as actionTypes from '../actions';

const initialState = {
    milk: {},
    bean: {},
    drink: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DATA_SUCCESS:
            return {
                ...state,
                [action.payload.kerv]: state[action.order.beanOption] - 20,
                [action.order.milkOption]: state[action.order.milkOption] - drinks[action.order.drinkOption].milk
            }
        default:
            return state;
    }
};

export default reducer;