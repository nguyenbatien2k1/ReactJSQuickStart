import actionTypes from '../actions/actionTypes';

const initialState = {
   genders: [],
   positions: [],
   roles: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: 
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = {...state};
            copyState.genders = action.data;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAIL:
            return {
                ...state,
            }    
        default:
            return state;
    }
}

export default adminReducer;