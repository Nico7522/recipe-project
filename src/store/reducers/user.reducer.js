import { createReducer } from "@reduxjs/toolkit";
import {  changeUserStatus, loginAction, logoutAction } from "../actions/user.action";
const initialState = {
    user : [],
    token: null,
    userState: 'unauthorized'
}
const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(loginAction, (state, action) => {
        state.user = action.payload,
        state.token = action.payload.token
        state.userState = 'connected'
    })
    .addCase(logoutAction, (state) => {
        state.user = [];
        state.token = null;
        state.userState = 'disconnected'
    })
    .addCase(changeUserStatus, (state, action) => {
        state.userState = action.payload;
      })

});

export default userReducer;