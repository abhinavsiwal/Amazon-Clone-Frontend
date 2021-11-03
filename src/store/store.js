import { combineReducers, createStore,applyMiddleware } from "redux";
import { productReducers } from "./reducers/productReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';  
const initialState = {}

const reducer=combineReducers({
    products:productReducers,
})
const middleware = [thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;