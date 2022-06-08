import baseURL from "../../utils/config";
import { API } from "./../../utils/apiWrapper";

import { NotificationManager } from "react-notifications";

export const getAllCategories = () => async (dispatch) => {
  dispatch({ type: GET_CATEGORIES_REQUEST });

  const query = {
    resultsPerPage: 1000,
    page: 1,
    sort: "asc",
  };

  try {
    const responce = await API.getData("/categories", {
      params: {
        ...query,
      },
    });

    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: responce.categories });
  } catch (error) {
    NotificationManager.error("Error! cannot get categories");
    dispatch({ type: GET_CATEGORIES_ERROR, payload: error.message });
  }
};

export const addCategory = (data, navigation) => async (dispatch) => {
  dispatch({ type: ADD_CATEGORY_REQUEST });

  try {
    await API.postData("/addCategory", { body: data });
    dispatch({ type: ADD_CATEGORY_SUCCESS });
    navigation("/categories");
    NotificationManager.success("Category added");
  } catch (error) {
    NotificationManager.error("Error! cannot add category");
    dispatch({
      type: ADD_CATEGORY_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const updateCategory = (id, data, navigation) => async (dispatch) => {
  dispatch({ type: UPDATE_CATEGORY_REQUEST });
  delete data.id;
  try {
    await API.put(`${baseURL}/api/category/${id}`, data);

    dispatch({ type: UPDATE_CATEGORY_SUCCESS });
    NotificationManager.success("Category updated");
    navigation("/categories");
  } catch (error) {
    NotificationManager.error("Error! cannot update category");
    dispatch({
      type: UPDATE_CATEGORY_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  dispatch({ type: DELETE_CATEGORY_REQUEST });

  try {
    const { data } = await API.delete(`${baseURL}/api/category/${id}`);

    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
    NotificationManager.success("Category Deleted");
  } catch (error) {
    NotificationManager.error("Error! cannot delete category");
    dispatch({ type: DELETE_CATEGORY_ERROR, payload: error.message });
  }
};

export const resetCategoryErrors = () => async (dispatch) => {
  dispatch({ type: RESET_CATEGORY_ERRORS });
};

export const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_ERROR = "GET_CATEGORIES_ERROR";

export const ADD_CATEGORY_REQUEST = "ADD_CATEGORY_REQUEST";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const ADD_CATEGORY_ERROR = "ADD_CATEGORY_ERROR";

export const UPDATE_CATEGORY_REQUEST = "UPDATE_CATEGORY_REQUEST";
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";
export const UPDATE_CATEGORY_ERROR = "UPDATE_CATEGORY_ERROR";

export const DELETE_CATEGORY_REQUEST = "DELETE_CATEGORY_REQUEST";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_ERROR = "DELETE_CATEGORY_ERROR";

export const RESET_CATEGORY_ERRORS = "RESET_CATEGORY_ERRORS";
