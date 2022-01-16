import actionTypes from './actionTypes';
import roleService from "../../services/roleService";
import userService from "../../services/userService";

export const FetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let response = await roleService.getAllRole("ALL");
            if (response !== null && response !== undefined) {
                dispatch(FetchRoleSuccess(response.data));
            } else {
                dispatch(FetchRoleFailure());
            }
        }
        catch (err) {
            dispatch(FetchRoleFailure());
            console.log('errrr', err);
        }
    }
}

export const FetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const FetchRoleFailure = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

// action create new user

export const SaveUserSuccess = (data) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: data
})

export const SaveUserFailure = (data) => ({
    type: actionTypes.CREATE_USER_FAIL,
    data: data
})

export const CreateNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.CREATE_USER_SUCCESS })
            let response = await userService.createUserService(data);
            console.log('check data',response)
            if (response !== null && response !== undefined) {
                dispatch(SaveUserSuccess(response.data));
            } else {
                dispatch(SaveUserFailure());
            }
        }
        catch (err) {
            dispatch(SaveUserFailure());
            console.log('errrr', err);
        }
    }
}

// action get list user
export const FetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let response = await userService.getAllUsers("ALL");
            console.log('res list user', response);
            if (response !== null && response !== undefined) {
                dispatch(FetchAllUserSuccess(response.data));
            }
            else {
                dispatch(FetchAllUserFail());
            }
        }
        catch (err) {
            dispatch(FetchAllUserFail());
        }
    }
}

export const FetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: data
})

export const FetchAllUserFail = (data) => ({
    type: actionTypes.FETCH_ALL_USER_FAIL
})

// action delete

export const DeleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DELETE_USER_START });
            let response = await userService.deleteUser(userId);
            if (response !== null && response !== undefined) {
                dispatch(DeleteUserSuccess());
                dispatch(FetchAllUserStart());
            }
            else {
                dispatch(DeleteUserFail());
            }
        }
        catch (err) {
            dispatch(DeleteUserFail());
        }
    }
}

export const DeleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const DeleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})
