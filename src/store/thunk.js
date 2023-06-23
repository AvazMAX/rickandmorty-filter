import { createAsyncThunk } from "@reduxjs/toolkit";
const URL = "https://rickandmortyapi.com/api/character";

export const getUsers = createAsyncThunk(
  "users/users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
