import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Url from "../../APIConfig";
import {
  AdminLoginBody,
  AdminLoginErrorResponse,
  AdminLoginResponse,
} from "./Model";
// import { setupInterceptorsTo } from "reduxStore/Authentication/Interceptors";

type InitialState = {
  loading: boolean;
  response: AdminLoginResponse;
  error: AdminLoginErrorResponse;
};
const initialState: InitialState = {
  loading: false,
  response: {} as AdminLoginResponse,
  error: { message: "" } as AdminLoginErrorResponse,
};
const headers = {
  Accept: "application/json",
  "Content-type": "application/json",
};

export const adminLogin = createAsyncThunk<AdminLoginResponse, AdminLoginBody>(
  "login/adminLogin",
  async (payload: AdminLoginBody, { rejectWithValue }) => {
    return await axios
      .post(Url.baseUrl + "/api/v1/auth/login", payload, { headers })
      .then((response: any) => response.data)
      .catch((error: any) =>
        rejectWithValue(error.response.data.message)
      );
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      adminLogin.fulfilled,
      (state, action: PayloadAction<AdminLoginResponse>) => {
        state.loading = false;
        state.response = action.payload;
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("user_type", action.payload.data.user_type);
        // localStorage.setItem("lastname", action.payload.user.last_name);
        state.error = {} as any;
      }
    );
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.loading = false;
      state.response = {} as AdminLoginResponse;
      state.error.message = action.payload!;
    });
  },
});

export default loginSlice.reducer;
