import actionTypes from '../actions/actionTypes';

const initialState = {
   isLoadingGender: false,
   genders: [],
   positions: [],
   roleIds: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: 
            state.isLoadingGender = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoadingGender = false;
            let copyState = {...state};
            copyState.genders = action.data;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;

            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:   

            state.positions = action.data;
                return {
                    ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:        
                    return {
                        ...state,
            }  
         case actionTypes.FETCH_ROLEID_SUCCESS:   
            state.roleIds = action.data;     
                    return {
                        ...state,
            } 
                
        case actionTypes.FETCH_ROLEID_FAILED:
    
                return {
                    ...state,
            } 
        default:
            return state;
    }
}

export default adminReducer;