import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAILED,
  CLEAR_ERRORS,
} from "../../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const {data} = await axios.post('/api/order/new',order,config);
    dispatch({
        type:CREATE_ORDER_SUCCESS,
        payload:data,
    })

  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILED,
      payload: error.response.data.message,
    });
  }
};
//Get currently logged in user orders
export const myOrders = ()=>async (dispatch)=>{
    try {
        dispatch({type:MY_ORDERS_REQUEST});
        const {data} = await axios.get('/api/orders/me');
        dispatch({
            type:MY_ORDERS_SUCCESS,
            payload:data.orders,
        })
    } catch (error) {
        dispatch({
            type:MY_ORDERS_FAILED,
            payload:error.response.data.message,
        })
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
  