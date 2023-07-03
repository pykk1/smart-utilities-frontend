import React, {useEffect, useState} from "react";
import '../shared-components/style/RandomStuff.css'
import {API_BASE_URL, authFetch} from "../shared-components/Functions";
import CustomSnackbar from "../shared-components/CustomSnackbar";
import AdminExpensesTable from "./AdminExpensesTable";

const AdminExpensesList = () => {
    const token = sessionStorage.getItem('token');
    const [expenses, setExpenses] = useState([]);
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
                const response = await authFetch(`${API_BASE_URL}/api/admin/expenses?paid=${paid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setExpenses(data);
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
    }, [paid, token]);

    const handleCheckboxChange = () => {
        setPaid(!paid);
    };

    return (
        <>
            <div id="table-container">
                <h1 id="table-container-title">Expenses List</h1>
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
                <AdminExpensesTable expenses={expenses}/>
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

export default AdminExpensesList;