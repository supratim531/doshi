import { axiosClient } from '../../axiosClient';

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { BusinessUserBody, BusinessUserResponse, BusinessErrorResponse } from '../../../model/business';

type InitialState = {
    loading: boolean;
    businessUserList: BusinessUserResponse;
    error: BusinessErrorResponse;
};
const initialState: InitialState = {
    loading: false,
    businessUserList: {} as BusinessUserResponse,
    error: { message: "" } as BusinessErrorResponse,
};

// Generates pending, fulfilled and rejected action types
export const allBusinessUser = createAsyncThunk<BusinessUserResponse, BusinessUserBody>(

    "businessUserList/allBusinessUser",
    async (payload: any, { rejectWithValue }) => {
    
        return await axiosClient
          .post(`business/users`, payload)
          .then((response: any) => response.data)
          .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const allBusinessUserSlice = createSlice({
    name: "businessUserList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(allBusinessUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            allBusinessUser.fulfilled,
            (state, action: PayloadAction<BusinessUserResponse>) => {
                state.loading = false;
                state.businessUserList = action.payload;
                state.error = {} as any;
            }
        );
        builder.addCase(allBusinessUser.rejected, (state, action) => {
            state.loading = false;
            state.businessUserList = {} as BusinessUserResponse;
            state.error.message = action.payload! || "Something went wrong";
        });
    },
});

export default allBusinessUserSlice.reducer;