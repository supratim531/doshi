import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import LoginPage from './page/auth/LoginPage';
import RegulatorPage from './page/master/RegulatorPage';
import ActPage from './page/master/ActPage';
import AppFrame from './layout/AppFrame';
import SectionPage from './page/master/SectionPage';
import FormPage from './page/master/FormPage';
import UserPage from './page/data/UserPage';
import BusinessPage from './page/data/BusinessPage';
import FrequencyPage from './page/master/FrequencyPage';
import FinancialYearPage from './page/master/FinancialYearPage';
import TaxPayerPage from './page/master/TaxPayerPage';
import ThresholdPage from './page/master/ThresholdPage';
import RecordPage from './page/master/RecordPage';
import DataFieldPage from './page/master/DataFieldPage';
import PrivateRoute from './component/IRCPrivateRoute';
import BusinessDataField from './component/IRCDataField/BusinessDataField';
import UserDataField from './component/IRCDataField/UserDataField';
import Profile from './page/myProfile/Profile';

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<AppFrame />} >
                    <Route index element={<PrivateRoute component={HomePage} />} />
                    <Route path='/my-profile' element={<PrivateRoute component={Profile} />} />
                    <Route path='/regulators' element={<PrivateRoute component={RegulatorPage} />} />
                    <Route path='/acts' element={<PrivateRoute component={ActPage} />} />
                    <Route path='/sections' element={<PrivateRoute component={SectionPage} />} />
                    <Route path='/forms' element={<PrivateRoute component={FormPage} />} />
                    <Route path='/frequency' element={<PrivateRoute component={FrequencyPage} />} />
                    <Route path='/financial-years' element={<PrivateRoute component={FinancialYearPage} />} />
                    <Route path='/tax-payers' element={<PrivateRoute component={TaxPayerPage} />} />
                    <Route path='/thresholds' element={<PrivateRoute component={ThresholdPage} />} />
                    <Route path='/records' element={<PrivateRoute component={RecordPage} />} />

                    <Route path='/data-fields' element={<PrivateRoute component={DataFieldPage} />}>
                    </Route>
                    
                    <Route path='/business-data' element={<PrivateRoute component={BusinessDataField}/>}/>
                    <Route path='/user-data' element={<PrivateRoute component={UserDataField}/>}/>

                    <Route path='/users' element={<PrivateRoute component={UserPage} />} />
                    <Route path='/buisnesses' element={<PrivateRoute component={BusinessPage} />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );

}

export default Router;