import { axiosClient } from '../../axiosClient';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { SimpleFinancialYearBody, WriteFinancialYearResponse, FinancialYearErrorResponse } from '../../../model/financialYear';

type InitialState = {
    loading: boolean;
    deleteFinancialYearResponse: WriteFinancialYearResponse;
    error: FinancialYearErrorResponse;
};

const initialState: InitialState = {
    loading: false,
    deleteFinancialYearResponse: {} as WriteFinancialYearResponse,
    error: { message: "" } as FinancialYearErrorResponse,
};


export const deleteFinancialYear = createAsyncThunk<WriteFinancialYearResponse, SimpleFinancialYearBody>(
    "deleteFinancialYear/deleteFinancialYear",
    async (payload: SimpleFinancialYearBody, { rejectWithValue }) => {
        
        return await axiosClient
            .post(`financial-year/delete`,payload)
            .then((response: any) => response.data)
            .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const deleteFinancialYearSlice = createSlice({
    name: "deleteFinancialYear",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteFinancialYear.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            deleteFinancialYear.fulfilled,
            (state, action: PayloadAction<WriteFinancialYearResponse>) => {
                state.loading = false;
                state.deleteFinancialYearResponse = action.payload;
                state.error.message = "";
            }
        );
        builder.addCase(deleteFinancialYear.rejected, (state, action) => {
            state.loading = false;
            state.deleteFinancialYearResponse = {} as WriteFinancialYearResponse;
            state.error.message = action.payload! || "Something went wrong";
        });
    },
});

export default deleteFinancialYearSlice.reducer;
