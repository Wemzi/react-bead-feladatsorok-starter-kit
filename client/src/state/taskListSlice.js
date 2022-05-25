import { createSlice } from "@reduxjs/toolkit";


const initialState =
{
	tasks:[]
}

const taskListSlice = createSlice({
	name: "taskList",
	initialState,
	reducers: {
	  startLoadingTasks: (state, { payload: tasks}) =>
	  {
		  state.tasks=tasks;
	  },
	},
  });


  export const graphilogicsReducer = taskListSlice.reducer;

  // action creators
  export const { startLoadingTasks } = taskListSlice.actions;