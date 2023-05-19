import React, { useState } from 'react';
import '../shared-components/style/Table.css';
import UserPopup from './UserPopup';
import Pagination from "../shared-components/Pagination";

const CustomerTable = ({ users }) => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleRowClick = (user) => {
        setSelectedUser(user);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const [pageRange, setPageRange] = useState(5);
    const [startIndex, setStartIndex] = useState(0);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const halfPageRange = Math.floor(pageRange / 2);
        const newIndex = pageNumber - halfPageRange - 1;
        const maxIndex = Math.ceil(users.length / usersPerPage) - pageRange;
        setStartIndex(Math.max(0, Math.min(newIndex, maxIndex)));
    };

    return (
        <>
            <table id="customTable">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Client Code</th>
                    <th>Billing Code</th>
                    <th>Address</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map((user, index) => (
                    <tr key={index} onClick={() => handleRowClick(user)}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.credentials.username}</td>
                        <td>{user.clientCode}</td>
                        <td>{user.billingCode}</td>
                        <td>{user.address}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedUser && <UserPopup user={selectedUser} onClose={() => setSelectedUser(null)} />}
            <Pagination
                currentPage={currentPage}
                paginate={paginate}
                startIndex={startIndex}
                pageRange={pageRange}
                itemsPerPage={usersPerPage}
                items={users}
            />
        </>
    );
};

export default CustomerTable;
