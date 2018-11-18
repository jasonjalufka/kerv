import * as actionTypes from '../actions';

const reducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.LOAD:
            let newState = {...state, data: action.data}
            return newState;
        case actionTypes.GET_USERS_SUCCESS:
            let userState = {...state, users: action.payload.users}
            return userState;
        default:
            return state;
    }
}

export default reducer;