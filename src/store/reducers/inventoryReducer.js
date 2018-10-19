import * as actionTypes from '../actions';
import drinks from '../../data/drinks';

const initialState = {
  milk: 200
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SALE:
    let total = 0;
    Object.keys(action.order).map(key =>{
        total += (drinks[key] * action.order[key]);
        return null;
    });
    return {
        ...state,
        milk: state.milk - total
    };
    default:
      return state;
  }
};

export default reducer;
