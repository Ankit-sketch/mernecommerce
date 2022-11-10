import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "../constants/userConstants";

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    if (data) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user,
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const userRegister = (formdata) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/api/v1/register`, formdata, config);
    if (data) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.user,
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const loadUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    const { data } = await axios.get("/api/v1/me");
    if (data) {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data.user,
      });
    }
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
