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

export const changeScoreReply = createAsyncThunk(
  "patch/changeScoreReply",
  async (obj:any) => {
    const { data } = await axios.patch(
      `https://4e1abe50417fc731.mokky.dev/all/${obj.id}`,
      { replies: obj.replies }
    );
    return data;
  }
);

export const changeRead = createAsyncThunk("patch/changeScoreReply",async (id:any) => {
    const { data } = await axios.patch( `https://4e1abe50417fc731.mokky.dev/all/${id}`,
      { read: true }
    );
    return data;
  }
);

export const changeReadAll = createAsyncThunk("patch/changeScoreReply",async (array:any) => {
  const { data } = await axios.patch( `https://4e1abe50417fc731.mokky.dev/all`,
    array
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
          username: obj.user.username,
        },
        createdAt: obj.createdAt,
        score: 0,
        replies: [],
        read: false,
      }
    );
    return data;
  }
);

export const sendReply = createAsyncThunk(
  "patch/sendReply",
  async (obj: any) => {
    const { data } = await axios.patch(
      `https://4e1abe50417fc731.mokky.dev/all/${obj.mainId}`,
      { replies: obj.repa }
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
    changeScoreChildLocal: (state, action) => {
      const index = state.messages.findIndex(
        (message) => message.id === action.payload.id,
      );
      if (index !== -1) {
        state.messages[index].replies = action.payload.replies;
      }
    },
    addMessageLocal: (state, action) => {
      state.messages.push(action.payload)
    },
    addMessageLocalReply: (state, action) => {
      const index = state.messages.findIndex(
        (message) => message.id === action.payload.mainId,
      );
      if (index !== -1) {
        state.messages[index].replies = action.payload.repa;
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
    builder.addCase(changeScore.rejected, () => {
      alert("Something went wrong!");
      location.reload();
    });
    builder.addCase(sendMessage.rejected, () => {
      alert("Something went wrong!");
      location.reload();
    });
    builder.addCase(sendReply.rejected, () => {
      alert("Something went wrong!");
      location.reload();
    });
    builder.addCase(changeScoreReply.rejected, () => {
      alert("Something went wrong!");
      location.reload();
    });
    builder.addCase(changeRead.fulfilled, () => {
     
      location.reload();
    });
    
  },
});

export const { changeScoreLocal ,addMessageLocal,changeScoreChildLocal,addMessageLocalReply} = sliceData.actions;
export default sliceData.reducer;
