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
                <ul className="mainmenu">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <li onClick={() => handleItemClick("/admin/register")}><a>Register</a></li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <li onClick={() => handleItemClick("/admin/customer")}><a>Customers</a></li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <li onClick={() => handleItemClick("/admin/bills")}><a>Bills</a></li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <li onClick={() => handleItemClick("/admin/expenses")}><a>Expenses</a></li>
                </ul>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <li className="logout" onClick={() => handleItemClick("/logout")}><a>Logout</a></li>
            </nav>
        </div>
    );
};

export default AdminTopBarNavBar;
