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
            let newState = {...state};
            Object.keys(action.payload.kerv).map((type, index) =>{
                let typeObject = {}
                action.payload.kerv[type].map((item, index) =>{
                    typeObject[item.name] = item;  
                    return null;              
                })
                newState[type] = typeObject;
                return null;
            })
            return newState;
        case actionTypes.ADD_ORDER_ITEM:
            let newStateInv = {...state};
            newStateInv.bean[action.order.beanOption].amount = state.bean[action.order.beanOption].amount -20;
            if(newStateInv.milk[action.order.milkOption]){
                newStateInv.milk[action.order.milkOption].amount = state.milk[action.order.milkOption].amount - state.drink[action.order.drinkOption].milkReq;
            }
            return newStateInv;   
        default:
            return state;
    }
};

export default reducer;