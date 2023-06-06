import { createReducer } from "@reduxjs/toolkit";
import { paramsAction } from "../actions/params.action";

const initialState = {
    name: null,
    tags : [],
    ingredients: []
}

const paramsReducer = createReducer(initialState, (builder) =>  {
    builder.addCase(paramsAction, (state, action) => {
        console.log(action);
        state.name = action.payload.name
        state.tags = action.payload.tags
        state.ingredients = action.payload.ingredients
    })
    
})

export default paramsReducer