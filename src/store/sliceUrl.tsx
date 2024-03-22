import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initialStateType } from "../types/types";

export const getData = createAsyncThunk("get/getData", async () => {
  const { data } = await axios.get("https://4e1abe50417fc731.mokky.dev/all");
  return data;
});

export const changeScore = createAsyncThunk(
  "patch/changeScore",
  async (obj: { id: number; score: number }) => {
    const { data } = await axios.patch(
      `https://4e1abe50417fc731.mokky.dev/all/${obj.id}`,
      { score: obj.score }
    );
    return data;
  }
);

export const sendMessage = createAsyncThunk(
  "post/sendMessage",
  async (obj: any) => {
    const { data } = await axios.post(
      `https://4e1abe50417fc731.mokky.dev/all`,
      {
        content: obj.content,
        user: {
          username: obj.username,
        },
        createdAt: obj.createdAt,
        score: 0,
        replies: [],
      }
    );
    return data;
  }
);

const initialState: initialStateType = {
  messages: [],
  isLoad: true,
  isError: false,
};

export const sliceData = createSlice({
  name: "sliceData",
  initialState,
  reducers: {
    changeScoreLocal: (state, action) => {
      const index = state.messages.findIndex(
        (message) => message.id === action.payload.id,
      );

      if (index !== -1) {
        state.messages[index].score = action.payload.score;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isLoad = true;
      state.isError = false;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.isLoad = false;
      state.isError = false;
    });
    builder.addCase(getData.rejected, (state) => {
      state.isLoad = false;
      state.isError = true;
    });
    builder.addCase(changeScore.pending, (state) => {});
    builder.addCase(changeScore.fulfilled, (state, action) => {});
    builder.addCase(changeScore.rejected, (state, action) => {
      alert("Something went wrong!");
      location.reload();
    });
    builder.addCase(sendMessage.pending, (state) => {});
    builder.addCase(sendMessage.fulfilled, (state, action) => {});
    builder.addCase(sendMessage.rejected, (state, action) => {});
  },
});

export const { changeScoreLocal } = sliceData.actions;
export default sliceData.reducer;
