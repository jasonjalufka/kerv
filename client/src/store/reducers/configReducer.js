import * as actionTypes from '../actions';

const reducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.LOAD:
            let newState = {...state, data: action.data}
            return newState;
        default:
            return state;
    }
}

export default reducer;