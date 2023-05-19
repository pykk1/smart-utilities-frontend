import jwt_decode from "jwt-decode";
import React from "react";
import '../shared-components/style/Navbar.css';

const TopBarNavBar = () => {
    const token = sessionStorage.getItem('token');
    const username = jwt_decode(token).username;

    const handleItemClick = (path) => {
        window.location.href = path;
    };

    return (
        <>
            <div className="topbar">
                <div className="topbar-text">Logged in as: {username}</div>
            </div>
            <nav>
                <ul>
                    <li onClick={() => handleItemClick("/")}>Home</li>
                    <li onClick={() => handleItemClick("/bill")}>Add Bill</li>
                    <li onClick={() => handleItemClick("/water")}>Water</li>
                    <li onClick={() => handleItemClick("/electricity")}>Electricity</li>
                    <li onClick={() => handleItemClick("/gas")}>Gas</li>
                    <li onClick={() => handleItemClick("/sanitation")}>Sanitation</li>
                    <li onClick={() => handleItemClick("/rent")}>Rent</li>
                    <li onClick={() => handleItemClick("/internet")}>Internet</li>
                    <li onClick={() => handleItemClick("/phone")}>Phone</li>
                    <li onClick={() => handleItemClick("/other")}>Other</li>

                    <li onClick={() => handleItemClick("/expense")}>Add Expense</li>

                    <li className="logout" onClick={() => handleItemClick("/logout")}>Logout</li>

                </ul>
            </nav>
        </>
    );
};

export default TopBarNavBar;
