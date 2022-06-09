import {
  GET_CARS_REQUEST,
  GET_CARS_SUCCESS,
  GET_CARS_ERROR,
  ADD_CAR_REQUEST,
  ADD_CAR_SUCCESS,
  ADD_CAR_ERROR,
  UPDATE_CAR_REQUEST,
  UPDATE_CAR_SUCCESS,
  UPDATE_CAR_ERROR,
  DELETE_CAR_REQUEST,
  DELETE_CAR_SUCCESS,
  DELETE_CAR_ERROR,
  RESET_CAR_ERRORS,
} from "../actions/cars";

const initialState = {
  loading: false,
  error: false,

  carsList: [],
};

const carReducer = function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CARS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case GET_CARS_SUCCESS: {
      return {
        ...state,
        loading: false,
        carsList: payload,
      };
    }

    case GET_CARS_ERROR: {
      return {
        ...state,
        loading: false,
        carsList: [],
        error: payload,
      };
    }

    case ADD_CAR_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case ADD_CAR_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case ADD_CAR_ERROR: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }

    case UPDATE_CAR_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case UPDATE_CAR_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case UPDATE_CAR_ERROR: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }

    case DELETE_CAR_REQUEST: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case DELETE_CAR_SUCCESS: {
      return {
        ...state,
        loading: false,
        carsList: state.carsList.filter(
          (car) => car._id !== payload
        ),
      };
    }

    case DELETE_CAR_ERROR: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }

    case RESET_CAR_ERRORS: {
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
export default carReducer;
