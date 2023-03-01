import actionTypes from './actionTypes';
import { userService } from '../../services';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,

// })

// Gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

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


// Postion
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService('position');
            if(res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else {  
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            dispatch(fetchPositionFail());
            console.log(error);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})


// RoleId
export const fetchRoleIdStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService('role');
            if(res && res.errCode === 0) {
                dispatch(fetchRoleIdSuccess(res.data));
            }
            else {  
                dispatch(fetchRoleIdFail());
            }
        } catch (error) {
            dispatch(fetchRoleIdFail());
            console.log(error);
        }
    }
}

export const fetchRoleIdSuccess = (RoleIdData) => ({
    type: actionTypes.FETCH_ROLEID_SUCCESS,
    data: RoleIdData
})

export const fetchRoleIdFail = () => ({
    type: actionTypes.FETCH_ROLEID_FAIL
})

