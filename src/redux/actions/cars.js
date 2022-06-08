import baseURL from "../../utils/config";
import { API } from "./../../utils/apiWrapper";

import { NotificationManager } from "react-notifications";

export const getAllCars = (searchQuery) => async (dispatch) => {
  dispatch({ type: GET_CARS_REQUEST });
  let page = 0;
  if (searchQuery && searchQuery.page) {
    page = searchQuery.page - 1;
    delete searchQuery.page;
  }
  try {
    const { data } = await API.get(`${baseURL}/api/category/search`, {
      params: {
        ...searchQuery,
        limit: 10,
        offset: page && page > 0 ? page * 10 : 0,
      },
    });
    dispatch({ type: GET_CARS_SUCCESS, payload: data });
  } catch (error) {
    NotificationManager.error("Error! cannot get cars");
    dispatch({ type: GET_CARS_ERROR, payload: error.message });
  }
};

export const addCar = (data, navigation) => async (dispatch) => {
  dispatch({ type: ADD_CAR_REQUEST });

  try {
    await API.postData("/addCar", { body: data });
    dispatch({ type: ADD_CAR_SUCCESS });

    navigation("/cars");
    NotificationManager.success("Car added");
  } catch (error) {
    NotificationManager.error("Error! cannot add car");
    dispatch({
      type: ADD_CAR_ERROR,
      payload: error.message,
    });
  }
};

export const updateCar = (id, data, navigation) => async (dispatch) => {
  dispatch({ type: UPDATE_CAR_REQUEST });
  delete data.id;
  try {
    await API.put(`${baseURL}/api/CAR/${id}`, data);

    dispatch({ type: UPDATE_CAR_SUCCESS });
    NotificationManager.success("CAR updated");
    navigation("/cars");
  } catch (error) {
    NotificationManager.error("Error! cannot update car");
    dispatch({
      type: UPDATE_CAR_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const deleteCar = (id) => async (dispatch) => {
  dispatch({ type: DELETE_CAR_REQUEST });

  try {
    const { data } = await API.delete(`${baseURL}/api/CAR/${id}`);

    dispatch({ type: DELETE_CAR_SUCCESS, payload: data });
    NotificationManager.success("CAR Deleted");
  } catch (error) {
    NotificationManager.error("Error! cannot delete car");
    dispatch({ type: DELETE_CAR_ERROR, payload: error.message });
  }
};

export const resetCarErrors = () => async (dispatch) => {
  dispatch({ type: RESET_CAR_ERRORS });
};

export const GET_CARS_REQUEST = "GET_CARS_REQUEST";
export const GET_CARS_SUCCESS = "GET_CARS_SUCCESS";
export const GET_CARS_ERROR = "GET_CARS_ERROR";

export const ADD_CAR_REQUEST = "ADD_CAR_REQUEST";
export const ADD_CAR_SUCCESS = "ADD_CAR_SUCCESS";
export const ADD_CAR_ERROR = "ADD_CAR_ERROR";

export const UPDATE_CAR_REQUEST = "UPDATE_CAR_REQUEST";
export const UPDATE_CAR_SUCCESS = "UPDATE_CAR_SUCCESS";
export const UPDATE_CAR_ERROR = "UPDATE_CAR_ERROR";

export const DELETE_CAR_REQUEST = "DELETE_CAR_REQUEST";
export const DELETE_CAR_SUCCESS = "DELETE_CAR_SUCCESS";
export const DELETE_CAR_ERROR = "DELETE_CAR_ERROR";

export const RESET_CAR_ERRORS = "RESET_CAR_ERRORS";
