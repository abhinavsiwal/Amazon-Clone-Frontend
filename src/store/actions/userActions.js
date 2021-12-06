import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  // UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  // UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAILED,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED,
  CLEAR_ERRORS,
} from "../../constants/userConstants";

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/login",
      { email, password },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAILED,
      payload: err.response.data.message,
    });
  }
};

//Register User
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/api/register", userData, config);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_USER_FAILED,
      payload: err.response.data.message,
    });
  }
};

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/profile");
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAILED,
      payload: err.response.data.message,
    });
  }
};

//Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/logout");
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: LOGOUT_FAILED,
      payload: err.response.data.message,
    });
  }
};



//Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put("/api/profile/update", userData, config);
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_FAILED,
      payload: err.response.data.message,
    });
  }
};

//Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put("/api/password/change", passwords, config);
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
    console.log(data);
  } catch (err) {
    dispatch({
      type: UPDATE_PASSWORD_FAILED,
      payload: err.response.data.message,
    });
  }
};
//Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/password/forgot", email, config);
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
    console.log(data);
  } catch (err) {
    dispatch({
      type: FORGOT_PASSWORD_FAILED,
      payload: err.response.data.message,
    });
  }
};
//Reset Password
export const resetPassword = (token,passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/password/reset/${token}`, passwords, config);
    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success,
    });
    
  } catch (err) {
    dispatch({
      type: NEW_PASSWORD_FAILED,
      payload: err.response.data.message,
    });
  }
};
// All Users =>Admin

//Load User
export const allUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await axios.get("/api/admin/users");
    console.log(data);
    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (err) {
    dispatch({
      type: ALL_USERS_FAILED,
      payload: err.response.data.message,
    });
  }
};
//Update User=>Admin
export const updateUser = (id,userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/admin/user/${id}`,userData, config);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
    console.log(data);
  } catch (err) {
    dispatch({
      type: UPDATE_USER_FAILED,
      payload: err.response.data.message,
    });
  }
};
//Get User Details =>Admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/admin/user/${id}`);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
    console.log(data);
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAILED,
      payload: err.response.data.message,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
