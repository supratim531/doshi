import { axiosClient } from '../../axiosClient';

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { SimpleTaxPayer, TaxPayerErrorResponse } from '../../../model/taxPayer';
import { Console } from 'console';

type InitialState = {
    loading: boolean;
    taxPayerList: SimpleTaxPayer[];
    error: TaxPayerErrorResponse;
};
const initialState: InitialState = {
    loading: false,
    taxPayerList: [] as SimpleTaxPayer[],
    error: { message: "" } as TaxPayerErrorResponse,
};

// Generates pending, fulfilled and rejected action types
export const simpleTaxPayer = createAsyncThunk<SimpleTaxPayer[], any>(

    "simpleTaxPayer/simpleTaxPayer",
    async (payload: any, { rejectWithValue }) => {
        return await axiosClient
          .post(`taxpayer/simple`, payload.params)
          .then((response: any) => response.data)
          .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const simpleTaxPayerSlice = createSlice({
    name: "simpleTaxPayer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(simpleTaxPayer.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            simpleTaxPayer.fulfilled,
            (state, action: PayloadAction<SimpleTaxPayer[]>) => {
                state.loading = false;
                state.taxPayerList = action.payload;
                state.error = {} as any;
            }
        );
        builder.addCase(simpleTaxPayer.rejected, (state, action) => {
            state.loading = false;
            state.taxPayerList = [] as SimpleTaxPayer[];
            state.error.message = action.payload! || "Something went wrong";
        });
    },
});

export default simpleTaxPayerSlice.reducer;