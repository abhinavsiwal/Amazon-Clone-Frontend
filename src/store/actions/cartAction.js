import axios from "axios";
import { ADD_TO_CART, REMOVE_ITEM_CART } from "../../constants/cartConstants";

export const addItemToCart=(id,quantity)=> async(dispatch,getState)=>{
    const {data} = await axios.get(`/api/product/${id}`);
    dispatch({
        type:ADD_TO_CART,
        payload:{
            product:data._id,
            name:data.name,
            price:data.price,
            image:data.images[0].url,
            stock:data.stock,
            quantity,
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
// Remove Items from Cart
export const removeItemFromCart=(id)=> async(dispatch,getState)=>{
    const {data} = await axios.get(`/api/product/${id}`);

    dispatch({
        type:REMOVE_ITEM_CART,
        payload:id,
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
