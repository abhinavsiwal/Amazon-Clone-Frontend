import { combineReducers, createStore } from "redux";
import { productReducers } from "./reducers/productReducers";
const initialState = {}

const reducer=combineReducers({
    products:productReducers,
})

const store = createStore(reducer);

export default store;