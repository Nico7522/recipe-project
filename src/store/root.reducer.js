import { combineReducers } from "redux";
import userReducer from "./reducers/user.reducer";
import paramsReducer from "./reducers/params.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    params: paramsReducer

});

export default rootReducer;

    