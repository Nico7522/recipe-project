import { createAction } from "@reduxjs/toolkit";

export const loginAction = createAction('user/login');
export const logoutAction = createAction('user/logout');
export const disconnectedAction = createAction('user/disconnected');
