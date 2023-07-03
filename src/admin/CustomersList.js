import React, {useEffect, useState} from 'react';
import CustomerTable from "./CustomerTable";
import {API_BASE_URL, authFetch} from "../shared-components/Functions";
import CustomSnackbar from "../shared-components/CustomSnackbar";


const CustomersList = () => {
    const [users, setUsers] = useState([]);
    const token = sessionStorage.getItem('token');

    const [snackbar, setSnackbar] = React.useState({
        open: false,
        severity: '',
        message: ''
    });

    const handleSnackbarClose = () => {
        setSnackbar({
            ...snackbar,
            open: false
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await authFetch(`${API_BASE_URL}/api/admin/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }, setSnackbar);
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                }
            } catch (error) {
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: 'Error communicating with server '
                });
                console.log(error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <>
            <div id="table-container">
                <h1 id="table-container-title">Customer List</h1>
                <CustomerTable users={users}/>
            </div>
            <CustomSnackbar
                open={snackbar.open}
                severity={snackbar.severity}
                message={snackbar.message}
                onClose={handleSnackbarClose}
            />
        </>
    );
};

export default CustomersList;