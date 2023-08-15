import { axiosClient } from '../../axiosClient';

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { UserDetailsResponse, ErrorResponse } from '../../../model/user';

type InitialState = {
    loading: boolean;
    response: UserDetailsResponse;
    error: ErrorResponse;
};

const initialState: InitialState = {
    loading: false,
    response: {} as UserDetailsResponse,
    error: { message: "" } as ErrorResponse,
};


export const userDetails = createAsyncThunk<UserDetailsResponse, any>(
  
    "userDetails/userDetails",
    async (payload: any, { rejectWithValue }) => {
      
        return await axiosClient
          .get(`user`, payload)
          .then((response: any) => response.data)
          .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            userDetails.fulfilled,
            (state, action: PayloadAction<UserDetailsResponse>) => {
                state.loading = false;
                state.response = action.payload;
                state.error = {} as any;
            }
        );
        builder.addCase(userDetails.rejected, (state, action) => {
            state.loading = false;
            state.response = {} as UserDetailsResponse;
            state.error.message = action.payload!;
        });
    },
});

export default userDetailsSlice.reducer;
