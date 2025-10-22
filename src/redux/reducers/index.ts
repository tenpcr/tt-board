import { combineReducers } from "@reduxjs/toolkit";
import tastViewReducer from "../slices/taskViewSlice";
import authReducer from "../slices/authSlice";

const rootReducer = combineReducers({
  taskView: tastViewReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
