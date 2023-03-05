import actionTypes from '../actions/actionTypes';

const initialState = {
   isLoadingGender: false,
   genders: [],
   positions: [],
   roleIds: [],
   users: [],
   outstandingdoctors: [],
   doctors: [],
   schedules: [],
   allRequiredDoctor: []
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
        case actionTypes.GET_USER_SUCCESS:
            state.users = action.data;
            return {
                ...state
            }
        case actionTypes.GET_USER_FAILED:
            return {
                ...state
            }
        case actionTypes.LOAD_OUTSTANDING_DOCTOR_SUCCESS:
            state.outstandingdoctors = action.data;
            return {
                ...state
            }
        case actionTypes.LOAD_OUTSTANDING_DOCTOR_FAILED:
            state.outstandingdoctors = [];
            return {
                ...state
            }
        case actionTypes.GET_ALL_DOCTORS_SUCCESS:
            state.doctors = action.data;
            return {
                ...state
            }
        case actionTypes.GET_ALL_DOCTORS_FAILED:
            state.doctors = [];
            return {
                ...state
            }
        case actionTypes.GET_ALL_SCHEDULE_SUCCESS:
            state.schedules = action.data;
            return {
                ...state
            }
        case actionTypes.GET_ALL_SCHEDULE_FAILED:
            state.schedules = []
            return {
                ...state
            }
        case actionTypes.GET_ALL_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctor = action.data;
            return {
                ...state
            }
        case actionTypes.GET_ALL_REQUIRED_DOCTOR_INFO_FAILED:
            state.allRequiredDoctor = []
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;