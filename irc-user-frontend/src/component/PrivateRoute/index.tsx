import * as React from "react";
import { Navigate } from "react-router-dom";

interface Props {
    component: React.ComponentType;
    path?: string;
}

const PrivateRoute: React.FC<Props> = ({component: RouteComponent }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <RouteComponent />;
};


export default PrivateRoute;