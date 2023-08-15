import { axiosClient } from '../../axiosClient';

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { BusinessBody, WriteBusinessResponse, BusinessErrorResponse } from '../../../model/business';

type InitialState = {
    loading: boolean;
    response: WriteBusinessResponse;
    error: BusinessErrorResponse;
};
const initialState: InitialState = {
    loading: false,
    response: {} as WriteBusinessResponse,
    error: { message: "" } as BusinessErrorResponse,
};

// Generates pending, fulfilled and rejected action types
export const addBusiness = createAsyncThunk<WriteBusinessResponse, BusinessBody>(

    "addBusiness/addBusiness",
    async (payload: any, { rejectWithValue }) => {
    
        return await axiosClient
          .post(`business/create`, payload)
          .then((response: any) => response.data)
          .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const addBusinessSlice = createSlice({
    name: "addBusiness",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addBusiness.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            addBusiness.fulfilled,
            (state, action: PayloadAction<WriteBusinessResponse>) => {
                state.loading = false;
                state.response = action.payload;
                state.error = {} as any;
            }
        );
        builder.addCase(addBusiness.rejected, (state, action) => {
            state.loading = false;
            state.response = {} as WriteBusinessResponse;
            state.error.message = action.payload! || "Something went wrong";
        });
    },
});

export default addBusinessSlice.reducer;