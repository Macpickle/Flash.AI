import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import AxiosRequest from "@/utils/Axios";

export const fetchData = createAsyncThunk(
  "documents/fetchData",
  async () => {
    const response = await AxiosRequest({
      url: "/api/docs",
      method: "get",
      data: {},
    });
    console.log("S " + response.data);
    return response.data;
  }
);
    
const initialState = [
];

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    addDocument: (state, action) => {
      state.push(action.payload);
    },
  },
    extraReducers: (builder) => {  
        builder
        .addCase(fetchData.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(fetchData.rejected, (state) => {
            return state;
        })
        .addCase(fetchData.pending, (state) => {
            return state;
        });
    },
});

export const { addDocument } = documentSlice.actions;

export default documentSlice;