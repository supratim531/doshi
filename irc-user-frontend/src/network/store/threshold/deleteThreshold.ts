import { axiosClient } from '../../axiosClient';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { SimpleThresholdBody, WriteThresholdResponse, ThresholdErrorResponse } from '../../../model/threshold';

type InitialState = {
    loading: boolean;
    deleteThresholdResponse: WriteThresholdResponse;
    error: ThresholdErrorResponse;
};

const initialState: InitialState = {
    loading: false,
    deleteThresholdResponse: {} as WriteThresholdResponse,
    error: { message: "" } as ThresholdErrorResponse,
};


export const deleteThreshold = createAsyncThunk<WriteThresholdResponse, SimpleThresholdBody>(
    "deleteThreshold/deleteThreshold",
    async (payload: SimpleThresholdBody, { rejectWithValue }) => {
        
        return await axiosClient
            .post(`threshold/delete`,payload)
            .then((response: any) => response.data)
            .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const deleteThresholdSlice = createSlice({
    name: "deleteThreshold",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteThreshold.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            deleteThreshold.fulfilled,
            (state, action: PayloadAction<WriteThresholdResponse>) => {
                state.loading = false;
                state.deleteThresholdResponse = action.payload;
                state.error.message = "";
            }
        );
        builder.addCase(deleteThreshold.rejected, (state, action) => {
            state.loading = false;
            state.deleteThresholdResponse = {} as WriteThresholdResponse;
            state.error.message = action.payload! || "Something went wrong";
        });
    },
});

export default deleteThresholdSlice.reducer;
