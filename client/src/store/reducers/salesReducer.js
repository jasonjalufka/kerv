import * as actionTypes from '../actions';

//This reducer is to keep track of the total sales per drink

const initialState = {
	0: {},
	salesCount: 0
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_SALE_SUCCESS:
			console.log('this is action', action.payload);
			let newState = {
				...state,
				[state.salesCount]: action.payload,
				salesCount: state.salesCount + 1
			}
			console.log("salesReducer: ", newState);
			return newState;
		default:
			return state;
	}
};

export default reducer;
