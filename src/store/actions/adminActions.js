import actionTypes from './actionTypes';
import { userService } from '../../services';
import { toast } from 'react-toastify';

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
    type: actionTypes.FETCH_GENDER_FAILED
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
    type: actionTypes.FETCH_POSITION_FAILED
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
    type: actionTypes.FETCH_ROLEID_FAILED
})

// create user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.createNewUser(data);
            if(res && res.errCode === 0) {
                toast.success('Create a new user success!')
                dispatch(createUserSucess());
                dispatch(getAllUsersStart());
            }
            else {  
                dispatch(createUserFail());
            }
        } catch (error) {
            dispatch(createUserFail());
            console.log(error);
        }
    }
}

export const createUserSucess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


// get all users
export const getAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUsers('ALL');
            if(res && res.errCode === 0) {
                dispatch(getAllUsersSuccess(res.users.reverse()));
            }
            else {
                dispatch(getAllUsersFail());
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getAllUsersSuccess = (data) => ({
    type: actionTypes.GET_USER_SUCCESS,
    data: data
})

export const  getAllUsersFail = () => ({
    type: actionTypes.GET_USER_FAILED
})

// delete user
export const deleteUserStart = (id) => {
    return async(dispatch, getState) => {
        try {
            let res = await userService.deleteUser(id);
            if(res && res.errCode === 0) {
                toast.success('Delete user success!');
                dispatch(deleteUserSuccess());
                dispatch(getAllUsersStart());
            }
            else {
                toast.success('Delete user failed!')
                dispatch(deleteUserFail());
            }
        } catch (error) {
            console.log(error)
            dispatch(deleteUserFail());
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

// edit user
export const editUserStart = (user) => {
    return async(dispatch, getState) => {
        try {
            let res = await userService.editUser(user);
            if(res && res.errCode === 0) {
                toast.success('Edit user success!');
                dispatch(editUserSuccess());
                dispatch(getAllUsersStart());
            }
            else {
                toast.success('Edit user failed!')
                dispatch(editUserFail());
            }
        } catch (error) {
            console.log(error)
            dispatch(editUserFail());
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

// load outstanding doctor
export const loadOutStandingDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getOutStandingDoctorService('9');
            if(res && res.errCode === 0) {
                dispatch(loadOutStandingDoctorSuccess(res.data));
            }
            else {
                toast.error('Load outstanding doctor failed!');
                dispatch(loadOutStandingDoctorFail());
            }
        } catch (error) {
            console.log(error);
            toast.error('Load outstanding doctor failed!');
        }
    }
}
 export const loadOutStandingDoctorSuccess = (data) => ({
    type: actionTypes.LOAD_OUTSTANDING_DOCTOR_SUCCESS,
    data: data
 })

 export const loadOutStandingDoctorFail = () => ({
    type: actionTypes.LOAD_OUTSTANDING_DOCTOR_FAILED
 })