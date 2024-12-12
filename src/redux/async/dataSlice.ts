import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface DataState {
  experience: string;
  country: string;
  sold: string;
  variant: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: DataState = {
  experience: "",
  country: "",
  sold: "",
  variant: "",
  status: "idle",
};

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get(
    "https://furniture-api-lumoshive-academy.vercel.app/api/data"
  );
  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.experience = action.payload.experience;
        state.country = action.payload.country;
        state.sold = action.payload.sold;
        state.variant = action.payload.variant;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default dataSlice.reducer;
