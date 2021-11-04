import axios from "axios";

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERRORS,
  } from "../../constants/productConstants";

  export const getProducts=async(dispatch)=>{
      try {
          dispatch({type:ALL_PRODUCTS_REQUEST});

          const {data} = await axios.get('/api/products')
          dispatch({
              type:ALL_PRODUCTS_SUCCESS,
              payload:data
          })
      } catch (err) {
          dispatch({
              type:ALL_PRODUCTS_FAIL,
              payload:err.response.data.message,
          })
      }
  }

  export const getProductDetails=async(dispatch,id)=>{
      try {
          dispatch({type:PRODUCT_DETAIL_REQUEST});

          const {data} = await axios.get(`/api/products/${id}`)
          dispatch({
              type:PRODUCT_DETAIL_SUCCESS,
              payload:data.product
          })
      } catch (err) {
          dispatch({
              type:PRODUCT_DETAIL_FAIL,
              payload:err.response.data.message,
          })
      }
  }

  //Clear Errors
  export const clearErrors=async(dispatch)=>{
      dispatch({
          type:CLEAR_ERRORS,
      })
  }