import { axiosClient } from '../../axiosClient';

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { SectionResponse, SectionErrorResponse } from '../../../model/dashBoard';

type InitialState = {
    loading: boolean;
    sectionList: SectionResponse;
    error: SectionErrorResponse;
};
const initialState: InitialState = {
    loading: false,
    sectionList: {} as SectionResponse,
    error: { message: "" } as SectionErrorResponse,
};

// Generates pending, fulfilled and rejected action types
export const allSection = createAsyncThunk<SectionResponse, any>(

    "sectionList/allSection",
    async (payload: any, { rejectWithValue }) => {
    
        return await axiosClient
          .get(`section`, payload)
          .then((response: any) => response.data)
          .catch((error: any) => rejectWithValue(error.response.data.message));
    }
);

const allSectionSlice = createSlice({
    name: "sectionList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(allSection.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            allSection.fulfilled,
            (state, action: PayloadAction<SectionResponse>) => {
                state.loading = false;
                state.sectionList = action.payload;
                state.error = {} as any;
            }
        );
        builder.addCase(allSection.rejected, (state, action) => {
            state.loading = false;
            state.sectionList = {} as SectionResponse;
            state.error.message = action.payload! || "Something went wrong";
        });
    },
});

export default allSectionSlice.reducer;