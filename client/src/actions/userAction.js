import axios from "axios";
import {
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAIL,
    CLEAR_ERRORS
} from "../constants/userConstants";

export const userRegister = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_REQUEST,
        });
        const { data } = await axios.get("/api/v1/allproducts");

        if (data) {
            dispatch({
                type: USER_SUCCESS,
                payload: data,
            });
        }
    } catch (error) {
        dispatch({
            type: USER_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
