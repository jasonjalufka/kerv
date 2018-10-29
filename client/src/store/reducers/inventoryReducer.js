import * as actionTypes from '../actions';
import drinks from '../../data/drinks';
import inventory from '../../data/inventory';

// action.order = {
//   beanOption: 'colombian',
//   drinkOption: 'espresso',
//   milkOption: 'whole'
// }

let initial = {};

Object.keys(inventory).map((type, index) => {
  Object.keys(inventory[type]).map((item, index2) => {
    initial[item] = inventory[type][item];
    return null;
  })
  return null;
});

const initialState = initial;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER_ITEM:
      return {
        ...state,
        [action.order.beanOption]: state[action.order.beanOption] - 20,
        [action.order.milkOption]: state[action.order.milkOption] - drinks[action.order.drinkOption].milk
      }
    case actionTypes.GET_DATA_REQUEST:
      console.log("Inside Inventory Reducer" + action.payload.express);
      return state;
    default:
      return state;
  }
};

export default reducer;
