// src/reducers/rootReducer.js
import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import formdataReducer from "./formdataReducer";

export default combineReducers({
    item: itemReducer,
    form: formdataReducer,
});
