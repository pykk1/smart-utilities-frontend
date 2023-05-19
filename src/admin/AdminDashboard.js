import React from 'react';
import '../shared-components/style/Navbar.css';
import jwt_decode from 'jwt-decode';
import AdminTopBarNavBar from "./AdminTopBarNavBar";

const AdminDashboard = () => {
    const token = sessionStorage.getItem('token');
    const username = jwt_decode(token).username;
    return (
        <div className="container">
            <AdminTopBarNavBar/>
            <div className="content">
                Welcome {username} (ADMIN)!
            </div>
        </div>
    );
};

export default AdminDashboard;