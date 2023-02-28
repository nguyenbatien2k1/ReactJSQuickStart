import actionTypes from './actionTypes';
import { userService } from '../../services';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,

// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService('GENDER');
            if(res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {  
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
            console.log(error);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

