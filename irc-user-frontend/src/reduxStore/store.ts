import { configureStore } from "@reduxjs/toolkit";

import logOutSlice from "./logOut/logOutSlice";

import loginSlice from "../network/store/auth/login";
import registerSlice from "../network/store/auth/register";

import userDetailsSlice from '../network/store/user/userDetails';

import simpleTaxPayerSlice from '../network/store/taxPayer/simpleTaxPayer';

import allBusinessSlice from '../network/store/business/allBusiness';
import addBusinessSlice from '../network/store/business/addBusiness';

import allBusinessUserSlice from '../network/store/business/allBusinessUser';
import addBusinessUserSlice from '../network/store/business/addBusinessUser';

import allThresholdSlice from '../network/store/threshold/allThreshold';

import allRecordSlice from '../network/store/record/allRecord';
import myRecordSlice from '../network/store/record/myRecord';

import allFinancialYearSlice from '../network/store/financialYear/allFinancialYear';

const store = configureStore({
    reducer: {
        login: loginSlice,
        register: registerSlice,

        userDetails: userDetailsSlice,
    logOut: logOutSlice,
    
        simpleTaxPayer: simpleTaxPayerSlice,

        allBusiness: allBusinessSlice,
        addBusiness: addBusinessSlice,
        allBusinessUser: allBusinessUserSlice,
        addBusinessUser: addBusinessUserSlice,

        allThreshold: allThresholdSlice,
        
        allRecord: allRecordSlice,
        myRecord: myRecordSlice,

        allFinancialYear: allFinancialYearSlice,
    },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, alerts: AlertsState}
export type AppDispatch = typeof store.dispatch;
