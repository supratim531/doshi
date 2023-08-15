import { axiosClient } from '../../axiosClient';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ThresholdBody, WriteThresholdResponse, ThresholdErrorResponse } from '../../../model/threshold';


type InitialState = {
    loading: boolean;
    addThresholdResponse: WriteThresholdResponse;
    error: ThresholdErrorResponse;
};

const initialState: InitialState = {
    loading: false,
    addThresholdResponse: {} as WriteThresholdResponse,
    error: { message: "" } as ThresholdErrorResponse,
};


export const addThreshold = createAsyncThunk<WriteThresholdResponse, ThresholdBody>(

    "addThreshold/addThreshold",
    async (payload: ThresholdBody, { rejectWithValue }) => {
    
        return await axiosClient
            .post(`threshold`, payload)
            .then((response: any) => response.data)
            .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const addThresholdSlice = createSlice({
    name: "addThreshold",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addThreshold.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            addThreshold.fulfilled,
            (state, action: PayloadAction<WriteThresholdResponse>) => {
                state.loading = false;
                state.addThresholdResponse = action.payload;
                state.error.message = {} as ThresholdErrorResponse;
            }
        );
        builder.addCase(addThreshold.rejected, (state, action) => {
            state.loading = false;
            state.addThresholdResponse = {} as WriteThresholdResponse;
            state.error.message = action.payload || "Something went wrong";
        });
    },
});

export default addThresholdSlice.reducer;