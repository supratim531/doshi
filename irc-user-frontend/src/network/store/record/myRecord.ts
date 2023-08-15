import { axiosClient } from '../../axiosClient';

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { RecordResponse } from '../../../model/record';

type InitialState = {
    loading: boolean;
    recordList: RecordResponse;
    error: any;
};
const initialState: InitialState = {
  loading: false,
  recordList: {} as RecordResponse,
  error: { message: "" } as any,
};

// Generates pending, fulfilled and rejected action types
export const myRecord = createAsyncThunk<RecordResponse, any>(

    "recordList/myRecord",
    async (payload: any, { rejectWithValue }) => {
    
        return await axiosClient
          .post(`record/my`, payload)
          .then((response: any) => response.data)
          .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const myRecordSlice = createSlice({
  name: "recordList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(myRecord.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      myRecord.fulfilled,
      (state, action: PayloadAction<RecordResponse>) => {
        state.loading = false;
        state.recordList = action.payload;
        state.error = {} as any;
      }
    );
    builder.addCase(myRecord.rejected, (state, action) => {
      state.loading = false;
      state.recordList = {} as RecordResponse;
      state.error.message = action.payload! || "Something went wrong";
    });
  },
});

export default myRecordSlice.reducer;