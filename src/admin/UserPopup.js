import React from 'react';
import './style/UserPopup.css';

const UserPopup = ({user, onClose}) => {
    return (
        <div className="user-popup">
            <div className="user-popup-content">
                <h2>Customer Details</h2>
                <div className="user-details">
                    <div>
                        <label>First Name:</label>
                        <span>{user.firstName}</span>
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <span>{user.lastName}</span>
                    </div>
                    <div>
                        <label>Username:</label>
                        <span>{user.credentials.username}</span>
                    </div>
                    <div>
                        <label>Client Code:</label>
                        <span>{user.clientCode}</span>
                    </div>
                    <div>
                        <label>Billing Code:</label>
                        <span>{user.billingCode}</span>
                    </div>
                    <div>
                        <label>Address:</label>
                        <span>{user.address}</span>
                    </div>
                    <div>
                        <label>Email:</label>
                        <span>{user.email}</span>
                    </div>
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default UserPopup;