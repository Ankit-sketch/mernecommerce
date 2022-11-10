import {
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAIL,
    CLEAR_ERRORS
} from "../constants/userConstants";

const user = [];

export const userReducer = (state = { user }, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                loading: true,
            };
        case USER_SUCCESS:
            return {
                loading: false,
                success: true,
                isAuthenticated: true,
                user: action.payload.user
            };
        case USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}