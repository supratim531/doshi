import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Url from "../../APIConfig";
import { LogOutResponseBody, LogOutResponse } from "./Model";
// import { setupInterceptorsTo } from "reduxStore/Authentication/Interceptors";

type InitialState = {
  loading: boolean;
  response: LogOutResponse;
  error: string;
};
const initialState: InitialState = {
  loading: false,
  response: {} as LogOutResponse,
  error: "",
};

export const logOut = createAsyncThunk<LogOutResponse, LogOutResponseBody>(
  "logOut/logOut",
  async (payload: LogOutResponseBody) => {
    const headers = {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Token ${payload.token}`,
    };
    return await axios
      .post(Url.baseUrl + "/logout", payload, { headers })
      .then((response: any) => {
        localStorage.clear();
        return response.data;
      });
  }
);

const logOutSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logOut.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      logOut.fulfilled,
      (state, action: PayloadAction<LogOutResponse>) => {
        state.loading = false;
        state.response = action.payload;
        state.error = "";
      }
    );
    builder.addCase(logOut.rejected, (state, action) => {
      state.loading = false;
      state.response = {} as LogOutResponse;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default logOutSlice.reducer;
