import { combineReducers } from "@reduxjs/toolkit";
import tastViewReducer from "../slices/taskViewSlice";

const rootReducer = combineReducers({
  taskView: tastViewReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;