import { axiosClient } from '../../axiosClient';

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { LoginBody, AuthResponse, ErrorResponse } from '../../../model/auth';

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


export const login = createAsyncThunk<AuthResponse, LoginBody>(
  
    "login/login",
    async (payload: any, { rejectWithValue }) => {
      
        return await axiosClient
          .post(`auth/login`, payload)
          .then((response: any) => response.data)
          .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                state.response = action.payload;
                state.error = {} as any;
            }
        );
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.response = {} as AuthResponse;
            state.error.message = action.payload!;
        });
    },
});

export default loginSlice.reducer;
