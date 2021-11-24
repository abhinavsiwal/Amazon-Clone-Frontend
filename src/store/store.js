import { combineReducers, createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';  
import { productReducers,productDetailReducer } from "./reducers/productReducers";
import { authReducer,userReducer,forgotPasswordReducer } from "./reducers/userReducers";
const initialState = {}

const reducer=combineReducers({
    products:productReducers,
    productDetails:productDetailReducer,
    auth:authReducer,
    user:userReducer,
    forgotPassword:forgotPasswordReducer
})
const middleware = [thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;