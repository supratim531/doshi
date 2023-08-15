import { axiosClient } from '../../axiosClient';

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { RegisterBody, AuthResponse, ErrorResponse } from '../../../model/auth';

type InitialState = {
    loading: boolean;
    response: AuthResponse;
    error: ErrorResponse;
};

const initialState: InitialState = {
    loading: false,
    response: {} as AuthResponse,
    error: { message: "" } as ErrorResponse,
};

export const register = createAsyncThunk<AuthResponse, RegisterBody>(
  
    "register/register",
    async (payload: any, { rejectWithValue }) => {
      
        return await axiosClient
          .post(`auth/register`, payload)
          .then((response: any) => response.data)
          .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            register.fulfilled,
            (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                state.response = action.payload;
                state.error = {} as any;
            }
        );
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.response = {} as AuthResponse;
            state.error.message = action.payload!;
        });
    },
});

export default registerSlice.reducer;
