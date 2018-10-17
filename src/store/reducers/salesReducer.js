import * as actionTypes from '../actions';

const initialState = {
    espresso: 0,
    macchiato: 0,
    cortado: 0,
    cappuccino: 0,
    latte: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ESPRESSO:
            return {
                ...state,
                espresso: state.espresso + 1
            };
        case actionTypes.MACCHIATO:
            return {
                ...state,
                macchiato: state.macchiato + 1
            };
        case actionTypes.CORTADO:
            return {
                ...state,
                cortado: state.cortado + 1
            };
        case actionTypes.CAPPUCCINO:
            return {
                ...state,
                cappuccino: state.cappuccino + 1
            };
        case actionTypes.LATTE:
            return {
                ...state,
                latte: state.latte + 1
            };
        default:
            return state;
    }
};

export default reducer;