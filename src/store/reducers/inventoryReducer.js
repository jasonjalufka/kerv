import * as actionTypes from '../actions';
import drinks from '../../data/drinks';

const initialState = {
    milk: 200
};

const reducer = (state = initialState, action) => {
    return {
        ...state,
        milk: state.milk - drinks[action.type]
    }
}

export default reducer;