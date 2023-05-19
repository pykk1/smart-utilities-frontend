import React, {useEffect, useState} from "react";
import AdminBillTable from "./AdminBillTable";
import '../shared-components/style/RandomStuff.css'
import {authFetch} from "../shared-components/Functions";
import CustomSnackbar from "../shared-components/CustomSnackbar";

const AdminBillsList = () => {
    const token = sessionStorage.getItem('token');
    const [bills, setBills] = useState([]);
    const [paid, setPaid] = useState(false);

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
                const response = await authFetch(`http://localhost:8080/api/admin/bills?paid=${paid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setBills(data);
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
    }, [paid]);

    const handleCheckboxChange = () => {
        setPaid(!paid);
    };

    return (
        <>
            <div id="table-container">
                <h1 id="table-container-title">Bills List</h1>
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="paid-checkbox"
                        className="checkbox"
                        checked={paid}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="paid-checkbox" className="checkbox-label">
                        Show Paid
                    </label>
                </div>
                <AdminBillTable bills={bills}/>
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

export default AdminBillsList;