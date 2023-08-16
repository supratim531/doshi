import { Route, Routes } from "react-router-dom";

import PrivateRoute from './component/PrivateRoute';

import Home from './page/landing/Home';

import LoginPage from "./page/auth/LoginPage";
import RegisterPage from "./page/auth/RegisterPage";

import Dashboard from "./page/DashboardPage";

import BusinessPage from './page/business/BusinessPage';
import BusinessDetailsPage from './page/business/BusinessDetailsPage';

import AllCompliances from "./page/AllCompliances";

import MyCompliances from "./page/MyCompliances/Index";
import ComplianceCalendarPage from "./page/ComplianceCalendarPage";

import AppFrame from "./layout/AppFrame";
import Profile from "./page/myProfile/Profile";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/" element={<AppFrame />}>
                <Route index path="dashboard" element={<PrivateRoute component={Dashboard} />} />
                <Route path="/my-profile" element={<PrivateRoute component={Profile} />} />

                <Route path="business" element={<PrivateRoute component={BusinessPage} />} />
                <Route path="business-details" element={<PrivateRoute component={BusinessDetailsPage} />} />

                <Route path="compliance" element={<PrivateRoute component={AllCompliances} />} />
                <Route path="my-compliance" element={<PrivateRoute component={MyCompliances} />} />
                <Route path="calendar-compliance" element={<PrivateRoute component={ComplianceCalendarPage} />} />
            </Route>
        </Routes>
    );
}

export default Router;
