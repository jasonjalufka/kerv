import * as actionTypes from '../actions';

//This reducer is to keep track of the total sales per drink

const initialState = {
    espresso: 0,
    macchiato: 0,
    cortado: 0,
    cappuccino: 0,
    latte: 0
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case actionTypes.ADD_SALE:
		return {
			...state,
			espresso: state.espresso + action.order.espresso,
			macchiato: state.macchiato + action.order.macchiato,
			cortado: state.cortado + action.order.cortado,
			cappuccino: state.cappuccino + action.order.cappuccino,
			latte: state.latte + action.order.latte
		};
	default:
		return state;
	}
};

export default reducer;
