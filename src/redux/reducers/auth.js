import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_OUT_SUCCESS,
  RESET_SIGNUP_DATA,
  RESET_LOGIN_DATA,
} from "../actions/auth";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_REQUEST: {
      return {
        ...state,
        loading: true,
        user: null,
        error: null,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }
    case SIGNUP_FAIL: {
      return {
        ...state,
        loading: false,
        user: null,
        error: payload,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
        user: null,
        error: null,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: payload,
        error: null,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        user: null,
        error: payload,
      };
    }
    case LOGIN_OUT_SUCCESS: {
      return {
        loading: false,
        user: null,
        error: null,
      };
    }
    case RESET_SIGNUP_DATA:
      return { user: null, loading: false, error: null };
    case RESET_LOGIN_DATA:
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
};
export default authReducer;
