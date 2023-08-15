import { axiosClient } from '../../axiosClient';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ThresholdBody, WriteThresholdResponse, ThresholdErrorResponse } from '../../../model/threshold';

type InitialState = {
    loading: boolean;
    updateThresholdResponse: WriteThresholdResponse;
    error: ThresholdErrorResponse;
};

const initialState: InitialState = {
    loading: false,
    updateThresholdResponse: {} as WriteThresholdResponse,
    error: { message: "" } as ThresholdErrorResponse,
};


export const updateThreshold = createAsyncThunk<WriteThresholdResponse, ThresholdBody>(
    "updateThreshold/updateThreshold",
    async (payload: ThresholdBody, { rejectWithValue }) => {
        
        return await axiosClient
            .post(`threshold/update`,payload)
            .then((response: any) => response.data)
            .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const updateThresholdSlice = createSlice({
    name: "updateThreshold",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateThreshold.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            updateThreshold.fulfilled,
            (state, action: PayloadAction<WriteThresholdResponse>) => {
                state.loading = false;
                state.updateThresholdResponse = action.payload;
                state.error.message = "";
            }
        );
        builder.addCase(updateThreshold.rejected, (state, action) => {
            state.loading = false;
            state.updateThresholdResponse = {} as WriteThresholdResponse;
            state.error.message = action.payload! || "Something went wrong";
        });
    },
});

export default updateThresholdSlice.reducer;
