import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserDetailsRes, UserDetailsErrRes, UserDetailsReq } from "./Model";
import url from "../../APIConfig";

type InitialState = {
  loading: boolean;
  userDetails: UserDetailsRes;
  error: UserDetailsErrRes;
};
const initialState: InitialState = {
  loading: false,
  userDetails: {} as UserDetailsRes,
  error: { message: "" } as UserDetailsErrRes,
};

// Generates pending, fulfilled and rejected action types
export const fetchUserDetails = createAsyncThunk<
  UserDetailsRes,
  UserDetailsReq
>(
  "userDetails/fetchUserDetails",
  async (reqParam: UserDetailsReq, { rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${reqParam.token}`,
    };
    return await axios
      .get(url.baseUrl + "/api/v1/user", { headers })
      .then((response: any) => response.data)
      .catch((error: any) => rejectWithValue(error.response.data.message));
  }
);

const fetchUserDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUserDetails.fulfilled,
      (state, action: PayloadAction<UserDetailsRes>) => {
        state.loading = false;
        state.userDetails = action.payload;
        localStorage.setItem("userName", action.payload.data.name);
        state.error = {} as any;
      }
    );
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.userDetails = {} as UserDetailsRes;
      state.error.message = action.payload! || "Something went wrong";
    });
  },
});

export default fetchUserDetailsSlice.reducer;
