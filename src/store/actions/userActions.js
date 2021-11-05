import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  CLEAR_ERRORS,
} from "../../constants/userConstants";


//Login
export const login =(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:LOGIN_REQUEST})
        
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.post('/api/login',{email,password},config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user,
        })

    } catch (err) {
        dispatch({
            type:LOGIN_FAILED,
            payload:err.response.data.message,
        })
    }
}

//Register User
export const register =(userData)=>async(dispatch)=>{
  
    try {
        dispatch({type:REGISTER_USER_REQUEST})
        
        const config={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const {data}=await axios.post('/api/register',userData,config)
        console.log(data);
        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload:data.user,
        })

    } catch (err) {
        dispatch({
            type:REGISTER_USER_FAILED,
            payload:err.response.data.message,
        })
    }
}


export const clearErrors = async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };