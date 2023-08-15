import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  TaxPayerDropDownListRes,
  TaxPayerDropDownListErrRes,
  TaxPayerDropDownListReq,
} from "./Model";
import url from "../../APIConfig";

type InitialState = {
  loading: boolean;
  taxPayerDropDownList: TaxPayerDropDownListRes[];
  error: TaxPayerDropDownListErrRes;
};
const initialState: InitialState = {
  loading: false,
  taxPayerDropDownList: [] as TaxPayerDropDownListRes[],
  error: { message: "" } as TaxPayerDropDownListErrRes,
};

// Generates pending, fulfilled and rejected action types
export const fetchTaxPayerDropDownList = createAsyncThunk<
  TaxPayerDropDownListRes[],
  TaxPayerDropDownListReq
>(
  "taxPayerDropDownList/fetchTaxPayerDropDownList",
  async (reqParam: TaxPayerDropDownListReq, { rejectWithValue }) => {
    let headers = {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${reqParam.token}`,
    };
    return await axios
      .get(url.baseUrl + "/api/v1/taxpayer/simple", { headers })
      .then((response: any) => response.data)
      .catch((error: any) => rejectWithValue(error.response.data.message));
  }
);

const taxPayerDropDownListSlice = createSlice({
  name: "taxPayerDropDownList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTaxPayerDropDownList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTaxPayerDropDownList.fulfilled,
      (state, action: PayloadAction<TaxPayerDropDownListRes[]>) => {
        state.loading = false;
        state.taxPayerDropDownList = action.payload;
        state.error = {} as any;
      }
    );
    builder.addCase(fetchTaxPayerDropDownList.rejected, (state, action) => {
      state.loading = false;
      state.taxPayerDropDownList = [] as TaxPayerDropDownListRes[];
      state.error.message = action.payload! || "Something went wrong";
    });
  },
});

export default taxPayerDropDownListSlice.reducer;
