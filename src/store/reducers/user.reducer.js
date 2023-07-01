import { createReducer } from "@reduxjs/toolkit";
import { disconnectedAction, loginAction, logoutAction } from "../actions/user.action";
const initialState = {
    user : [],
    token: null,
    disconnect: true
}
const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(loginAction, (state, action) => {
        state.user = action.payload,
        state.token = action.payload.token
        state.disconnect = 'logged'
    })
    .addCase(logoutAction, (state) => {
        state.user = [];
        state.token = null;
        state.disconnect = 'disconnected'
    })
    .addCase(disconnectedAction, (state) => {
        state.user = [];
        state.token = null;
        state.disconnect = ''
    })
});

export default userReducer;