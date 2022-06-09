import { API } from "./../../utils/apiWrapper";

import { NotificationManager } from "react-notifications";

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: GET_CARS_REQUEST });

  const query = {
    resultsPerPage: 1000,
    page: 1,
    sort: "asc",
  };

  try {
    const responce = await API.getData(`/cars`, {
      params: {
        ...query,
      },
    });
    dispatch({ type: GET_CARS_SUCCESS, payload: responce.cars });
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
    await API.putData(`/updateCar/${id}`, { body: data });

    dispatch({ type: UPDATE_CAR_SUCCESS });
    NotificationManager.success("Car updated");
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
    await API.deleteData(`/deleteCar/${id}`);

    dispatch({ type: DELETE_CAR_SUCCESS, payload: id });
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
