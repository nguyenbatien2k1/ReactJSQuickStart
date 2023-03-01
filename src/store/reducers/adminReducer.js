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
            console.log('start:', action);
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
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;

            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:   

            state.positions = action.data;
                return {
                    ...state,
            }
        case actionTypes.FETCH_POSITION_FAIL:        
                    return {
                        ...state,
            }  
         case actionTypes.FETCH_ROLEID_SUCCESS:   
            state.roleIds = action.data;     
                    return {
                        ...state,
            } 
                
        case actionTypes.FETCH_ROLEID_FAIL:
    
                return {
                    ...state,
            } 
        default:
            return state;
    }
}

export default adminReducer;