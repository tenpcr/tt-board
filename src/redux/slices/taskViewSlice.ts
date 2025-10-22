import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskViewState {
  show: boolean;
  taskId: string;
}

const initialState: TaskViewState = {
  show: false,
  taskId: "",
};

const tastViewSlice = createSlice({
  name: "taskView",
  initialState,
  reducers: {
    openTaskView: (
      state: TaskViewState,
      action: PayloadAction<Omit<TaskViewState, "show">>
    ) => {
      state.show = true;
      state.taskId = action.payload.taskId;
    },

    closeTaskView: (state: TaskViewState) => {
      state.show = false;
      state.taskId = "";
    },
  },
});

export const { openTaskView, closeTaskView } = tastViewSlice.actions;

export default tastViewSlice.reducer;
