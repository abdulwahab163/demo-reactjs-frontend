import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_ERROR,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_ERROR,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    RESET_CATEGORY_ERRORS,
  } from "../actions/categories";
  
  const initialState = {
    loading: false,
    error: false,
  
    categoriesList: [],
  };
  
  const categoryReducer = function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_CATEGORIES_REQUEST: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case GET_CATEGORIES_SUCCESS: {
        return {
          ...state,
          loading: false,
          categoriesList: payload,
        };
      }
  
      case GET_CATEGORIES_ERROR: {
        return {
          ...state,
          loading: false,
          categoriesList: [],
          error: payload,
        };
      }
  
      case ADD_CATEGORY_REQUEST: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
  
      case ADD_CATEGORY_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
  
      case ADD_CATEGORY_ERROR: {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      }
  
      case UPDATE_CATEGORY_REQUEST: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
  
      case UPDATE_CATEGORY_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
  
      case UPDATE_CATEGORY_ERROR: {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      }
  
      case DELETE_CATEGORY_REQUEST: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
  
      case DELETE_CATEGORY_SUCCESS: {
        return {
          ...state,
          loading: false,
          deleteSuccess: true,
          categoriesList: state.categoriesList.filter(
            (category) => category.id !== payload.data.id
          ),
        };
      }
  
      case DELETE_CATEGORY_ERROR: {
        return {
          ...state,
          loading: false,
          error: payload,
        };
      }
  
      case RESET_CATEGORY_ERRORS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
  
      default: {
        return state;
      }
    }
  };
  export default categoryReducer;
  