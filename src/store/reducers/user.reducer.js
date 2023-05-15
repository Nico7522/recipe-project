import { createReducer } from "@reduxjs/toolkit";
import { loginAction, logoutAction } from "../actions/user.action";
const initialState = {
    user : [],
    token: null
}
const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(loginAction, (state, action) => {
        state.user = action.payload,
        state.token = action.payload.token
    })
    .addCase(logoutAction, (state) => {
        state.user = [];
        state.token = null
    })
});

export default userReducer;