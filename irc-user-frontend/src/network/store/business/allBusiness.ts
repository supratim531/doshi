import { axiosClient } from '../../axiosClient';

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { BusinessResponse, BusinessErrorResponse } from '../../../model/business';

type InitialState = {
    loading: boolean;
    businessList: BusinessResponse;
    error: BusinessErrorResponse;
};
const initialState: InitialState = {
    loading: false,
    businessList: {} as BusinessResponse,
    error: { message: "" } as BusinessErrorResponse,
};

// Generates pending, fulfilled and rejected action types
export const allBusiness = createAsyncThunk<BusinessResponse, any>(

    "businessList/allBusiness",
    async (payload: any, { rejectWithValue }) => {
    
        return await axiosClient
          .get(`business/my`, payload)
          .then((response: any) => response.data)
          .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const allBusinessSlice = createSlice({
    name: "businessList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(allBusiness.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            allBusiness.fulfilled,
            (state, action: PayloadAction<BusinessResponse>) => {
                state.loading = false;
                state.businessList = action.payload;
                state.error = {} as any;
            }
        );
        builder.addCase(allBusiness.rejected, (state, action) => {
            state.loading = false;
            state.businessList = {} as BusinessResponse;
            state.error.message = action.payload! || "Something went wrong";
        });
    },
});

export default allBusinessSlice.reducer;