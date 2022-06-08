import { combineReducers } from "redux";

import authReducer from "./auth";
import categoriesReducer from "./categories";
import carsReducer from "./cars";

const appReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  cars: carsReducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
