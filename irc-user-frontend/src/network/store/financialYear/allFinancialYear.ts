import { axiosClient } from '../../axiosClient';

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { FinancialYearResponse, FinancialYearErrorResponse } from '../../../model/financialYear';

type InitialState = {
    loading: boolean;
    financialYearList: FinancialYearResponse;
    error: FinancialYearErrorResponse;
};
const initialState: InitialState = {
    loading: false,
    financialYearList: {} as FinancialYearResponse,
    error: { message: "" } as FinancialYearErrorResponse,
};

// Generates pending, fulfilled and rejected action types
export const allFinancialYear = createAsyncThunk<FinancialYearResponse, any>(

    "financialYearList/allFinancialYear",
    async (payload: any, { rejectWithValue }) => {
    
        return await axiosClient
          .get(`financial-year`, payload)
          .then((response: any) => response.data)
          .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const allFinancialYearSlice = createSlice({
    name: "financialYearList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(allFinancialYear.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            allFinancialYear.fulfilled,
            (state, action: PayloadAction<FinancialYearResponse>) => {
                state.loading = false;
                state.financialYearList = action.payload;
                state.error = {} as any;
            }
        );
        builder.addCase(allFinancialYear.rejected, (state, action) => {
            state.loading = false;
            state.financialYearList = {} as FinancialYearResponse;
            state.error.message = action.payload! || "Something went wrong";
        });
    },
});

export default allFinancialYearSlice.reducer;