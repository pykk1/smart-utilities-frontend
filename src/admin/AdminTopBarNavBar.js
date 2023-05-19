import jwt_decode from "jwt-decode";
import React from "react";
import '../shared-components/style/Navbar.css';

const AdminTopBarNavBar = () => {
    const token = sessionStorage.getItem('token');
    const username = jwt_decode(token).username;

    const handleItemClick = (path) => {
        window.location.href = path;
    };

    return (
        <div>
            <div className="topbar">
                <div className="topbar-text">Logged in as: {username}</div>
            </div>
            <nav>
                <ul>
                    <li onClick={() => handleItemClick("/admin")}>Home</li>
                    <li onClick={() => handleItemClick("/admin/customer")}>Customers</li>
                    <li onClick={() => handleItemClick("/admin/bill")}>Bills</li>
                    <li className="logout" onClick={() => handleItemClick("/login")}>Logout</li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminTopBarNavBar;
