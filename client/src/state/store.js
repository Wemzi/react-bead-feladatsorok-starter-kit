import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { taskListApiSlice, taskListApiSliceReducer } from "./tasksApiSlice";

export const store = configureStore({
  reducer: {
    taskList: taskListApiSliceReducer,
	auth:authReducer,
    [taskListApiSlice.reducerPath]: taskListApiSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskListApiSlice.middleware),
});