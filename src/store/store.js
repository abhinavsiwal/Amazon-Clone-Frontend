import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducers,
  productDetailReducer,
  newReviewReducer,
  newProductReducer,
  productReducer
} from "./reducers/productReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { newOrderReducer,myOrdersReducer,orderDetailsReducer, allOrdersReducer, orderReducer } from "./reducers/orderReducers";
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder:newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDetailsReducer, 
  newReview:newReviewReducer,
  newProduct:newProductReducer,
  product:productReducer,
  allOrders:allOrdersReducer,
  order:orderReducer,
  allUsers:allUsersReducer,
  userDetails:userDetailsReducer,
});
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
