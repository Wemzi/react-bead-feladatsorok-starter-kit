import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030";

export const taskListApiSlice = createApi({
  reducerPath: "taskListApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (skip,limit) => ({
        url: `tasks?$skip=${skip}&$limit=${limit}`,
      }),
      transformResponse: (response) => response.data,
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "authentication",
        method: "POST",
        body
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
    }),
    getTaskLists: builder.query({
      query: () => ({
        url: "tasklists",
      }),
      transformResponse: (response) => response.data,
    }),
    getTaskListWithID: builder.query({
      query: (id) => ({
        url: `tasklists/${id}`,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});
// reducer
export const taskListApiSliceReducer = taskListApiSlice.reducer;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTasksQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetTaskListsQuery,
  useGetTaskListWithIDQuery,
} = taskListApiSlice;
