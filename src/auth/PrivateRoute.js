import React from 'react';
import {Navigate} from 'react-router-dom';
import jwt_decode from "jwt-decode";

const isAuthenticated = () => {
    const token = sessionStorage.getItem('token');
    return token !== null;
};

const isAdmin = () => {
    const token = sessionStorage.getItem('token');
    const role = jwt_decode(token).authorities;

    return role === 'ADMIN';
};

const PrivateRoute = ({isAdminRoute, children}) => {
    const isUserAuthenticated = isAuthenticated();

    if (!isUserAuthenticated) {
        return <Navigate to={"/login"}/>;
    }

    if (isAdminRoute && !isAdmin()) {
        return <Navigate to="/"/>;
    }

    if (!isAdminRoute && isAdmin()) {
        return <Navigate to="/admin/register"/>;
    }

    return children;
};

export default PrivateRoute;
