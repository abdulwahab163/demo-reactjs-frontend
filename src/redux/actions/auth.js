import { API } from "./../../utils/apiWrapper";

import { NotificationManager } from "react-notifications";

export const signUp = (signUpData, navigation) => async (disptach) => {
  disptach({ type: SIGNUP_REQUEST });

  try {
    await API.postData("/signup", { body: signUpData });
    disptach({ type: SIGNUP_SUCCESS });
    navigation("/sign-in");

  } catch (error) {
    disptach({ type: SIGNUP_FAIL, payload: error.message });
  }
};

export const login = (loginData, navigation) => async (disptach) => {
  disptach({ type: LOGIN_REQUEST });

  try {
    const responce = await API.postData("/login", { body: loginData });

    disptach({ type: LOGIN_SUCCESS, payload: responce.name });

    localStorage.setItem("token", responce.token);
    NotificationManager.success("logged in");

    navigation("/cars");
  } catch (error) {
    disptach({ type: LOGIN_FAIL, payload: error.message });
  }
};

export const logout = (navigation) => async (dispatch) => {
  navigation("/sign-in");
  localStorage.removeItem('token')
  dispatch({ type: LOGIN_OUT_SUCCESS });
};

export const resetLoginData = () => async (dispatch) => {
  dispatch({ type: RESET_LOGIN_DATA });
};

export const resetSignUpData = () => async (dispatch) => {
  dispatch({ type: RESET_SIGNUP_DATA });
};

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGIN_OUT_SUCCESS = "LOGIN_OUT_SUCCESS";

export const RESET_SIGNUP_DATA = "RESET_SIGNUP_DATA";
export const RESET_LOGIN_DATA = "RESET_LOGIN_DATA";
