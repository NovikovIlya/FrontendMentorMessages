import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk('get/getData', async () => {
  const { data } = await axios.get('https://4e1abe50417fc731.mokky.dev/all');
  return data;
});

const initialState = {
  messages: [],
  isLoad: true,
  isError:false,
};

export const sliceData = createSlice({
  name: "sliceData",
  initialState,
  reducers: {
    
  },
  extraReducers:(builder)=>{
    builder.addCase(getData.pending, (state) => {
      state.isLoad = true;
      state.isError = false;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.messages = action.payload
      state.isLoad = false;
      state.isError = false;
    });
    builder.addCase(getData.rejected, (state) => {
      state.isLoad = false;
      state.isError = true;
    });
  }
});

export const {  } = sliceData.actions;
export default sliceData.reducer;