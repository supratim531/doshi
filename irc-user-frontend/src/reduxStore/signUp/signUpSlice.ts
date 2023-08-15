import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Url from "../../APIConfig";
import {
  UserSignUpBody,
  UserSignUpErrorResponse,
  UserSignUpResponse,
} from "./Model";
// import { setupInterceptorsTo } from "reduxStore/Authentication/Interceptors";

type InitialState = {
  loading: boolean;
  response: UserSignUpResponse;
  error: UserSignUpErrorResponse;
};
const initialState: InitialState = {
  loading: false,
  response: {} as UserSignUpResponse,
  error: { message: "" } as UserSignUpErrorResponse,
};
const headers = {
  Accept: "application/json",
  "Content-type": "application/json",
};

export const userSignUp = createAsyncThunk<UserSignUpResponse, UserSignUpBody>(
  "signUp/userSignUp",
  async (payload: UserSignUpBody, { rejectWithValue }) => {
    return await axios
      .post(Url.baseUrl + "/api/v1/auth/register", payload, { headers })
      .then((response: any) => response.data)
      .catch((error: any) => rejectWithValue(error.response.data.message));
  }
);

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userSignUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      userSignUp.fulfilled,
      (state, action: PayloadAction<UserSignUpResponse>) => {
        state.loading = false;
        state.response = action.payload;
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("user_type", action.payload.data.user_type);
        state.error = {} as any;
      }
    );
    builder.addCase(userSignUp.rejected, (state, action) => {
      state.loading = false;
      state.response = {} as UserSignUpResponse;
      state.error.message = action.payload!;
    });
  },
});

export default signUpSlice.reducer;
