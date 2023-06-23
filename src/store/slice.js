import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./thunk";

const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUsers: (state, action) => {
      state.users = state.users.filter((el) => el.id !== action.payload);
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
  },
});
