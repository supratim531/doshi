import { axiosClient } from '../../axiosClient';

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ThresholdResponse, ThresholdErrorResponse } from '../../../model/threshold';

type InitialState = {
    loading: boolean;
    thresholdList: ThresholdResponse;
    error: ThresholdErrorResponse;
};
const initialState: InitialState = {
  loading: false,
  thresholdList: {} as ThresholdResponse,
  error: { message: "" } as ThresholdErrorResponse,
};

// Generates pending, fulfilled and rejected action types
export const allThreshold = createAsyncThunk<ThresholdResponse, any>(

    "thresholdList/allThreshold",
    async (payload: any, { rejectWithValue }) => {
    
        return await axiosClient
          .get(`threshold`, payload)
          .then((response: any) => response.data)
          .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const allThresholdSlice = createSlice({
  name: "thresholdList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allThreshold.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      allThreshold.fulfilled,
      (state, action: PayloadAction<ThresholdResponse>) => {
        state.loading = false;
        state.thresholdList = action.payload;
        // console.log(action.payload);
        state.error = {} as any;
      }
    );
    builder.addCase(allThreshold.rejected, (state, action) => {
      state.loading = false;
      state.thresholdList = {} as ThresholdResponse;
      state.error.message = action.payload! || "Something went wrong";
    });
  },
});

export default allThresholdSlice.reducer;