import { axiosClient } from '../../axiosClient';

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { AddBusinessUserBody, AddBusinessUserBodyResponse, BusinessErrorResponse } from '../../../model/business';

type InitialState = {
    loading: boolean;
    response: AddBusinessUserBodyResponse;
    error: BusinessErrorResponse;
};
const initialState: InitialState = {
    loading: false,
    response: {} as AddBusinessUserBodyResponse,
    error: { } as BusinessErrorResponse,
};

// Generates pending, fulfilled and rejected action types
export const addBusinessUser = createAsyncThunk<AddBusinessUserBodyResponse, AddBusinessUserBody>(

    "addBusinessUser/addBusinessUser",
    async (payload: AddBusinessUserBody, { rejectWithValue }) => {
    
        return await axiosClient
          .post(`business/add`, payload)
          .then((response: any) => response.data)
          .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const addBusinessUserSlice = createSlice({
    name: "addBusinessUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addBusinessUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            addBusinessUser.fulfilled,
            (state, action: PayloadAction<AddBusinessUserBodyResponse>) => {
                state.loading = false;
                state.response = action.payload;
                state.error = {} as any;
            }
        );
        builder.addCase(addBusinessUser.rejected, (state, action) => {
            state.loading = false;
            state.response = {} as AddBusinessUserBodyResponse;
            state.error.message = action.payload! || "Something went wrong";
        });
    },
});

export default addBusinessUserSlice.reducer;