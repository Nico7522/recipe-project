import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const loginAction = createAction('user/login');
export const logoutAction = createAction('user/logout');
export const changeUserStatus = createAction('user/change-status')
export const disconnectAction = createAsyncThunk(
    "user/state-gestion" , async(arg, thunkAPI) => {
        thunkAPI.dispatch(logoutAction())
        setTimeout(() => {
            thunkAPI.dispatch(changeUserStatus('unauthorized'))
        }, 3000);
    }
)
