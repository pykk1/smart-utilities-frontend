import React, {useEffect, useState} from "react";
import BillTable from "./BillTable";
import {authFetch} from "../shared-components/Functions";
import CustomSnackbar from "../shared-components/CustomSnackbar";
import BillsPieChart from "../shared-components/BillsPieChart";
import BillsBarChart from "../shared-components/BillsBarChart";

const BillsDashboard = () => {
    const [bills, setBills] = useState([]);
    const token = sessionStorage.getItem('token');
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
                const response = await authFetch(`http://localhost:8080/api/bills/all?paid=${paid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }, setSnackbar);

                if (response.ok) {
                    const data = await response.json();
                    setBills(data);
                }
            } catch (error) {
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: 'Error communicating with server'
                });
                console.error(error);
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
                <h1 id="table-container-title">Unpaid bills</h1>
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
                <BillTable bills={bills}/>
            </div>
            <BillsPieChart bills={bills}/>
            <BillsBarChart bills={bills}/>
            <CustomSnackbar
                open={snackbar.open}
                severity={snackbar.severity}
                message={snackbar.message}
                onClose={handleSnackbarClose}
            />
        </>
    );
};

export default BillsDashboard;