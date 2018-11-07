// Initializes store from database
import * as actionTypes from '../actions';

const initialState = {
    showApp: false,
    milk: {},
    bean: {},
    drink: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LOGIN_SUCCESS:
            console.log('recieved data', action.payload.kerv);
            let newState = { ...state };
            Object.keys(action.payload.kerv).map((type, index) => {
                let typeObject = {}
                action.payload.kerv[type].map((item, index) => {
                    typeObject[item.name] = item;
                    return null;
                })
                newState[type] = typeObject;
                return null;
            })
            newState.barista = action.payload.user;
            return newState;
        case actionTypes.ADD_ORDER_ITEM:
            let newStateInv = { ...state };
            newStateInv.bean[action.order.beanOption].amount = state.bean[action.order.beanOption].amount - 20;
            if (newStateInv.milk[action.order.milkOption]) {
                newStateInv.milk[action.order.milkOption].amount = state.milk[action.order.milkOption].amount - state.drink[action.order.drinkOption].milkReq;
            }
            return newStateInv;
        case actionTypes.GET_LOGIN_REQUEST:
            console.log('trying to login');
            return state;
        case actionTypes.GET_LOGIN_FAILURE:
            console.log('error, wrong user name or password')
            return {ERROR: 'WRONG USERNAME OR PASSWORD'}
        default:
            return state;
    }
};

export default reducer;