import React, {useEffect, useState} from "react";
import CustomSnackbar from "../../shared-components/CustomSnackbar";
import {authFetch} from "../../shared-components/Functions";
import ExpensesTable from "./ExpensesTable";
import ExpensesPieChart from "../../shared-components/ExpensesPieChart";
import ExpensesBarChart from "../../shared-components/ExpensesBarChart";

const ExpensesOverview = ({historical}) => {
    const [expenses, setExpenses] = useState([]);
    const token = sessionStorage.getItem('token');
    const [paid, setPaid] = useState(historical);

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
                const response = await authFetch(`{API_BASE_URL}/api/expenses/all?paid=${paid}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }, setSnackbar);

                if (response.ok) {
                    const data = await response.json();
                    setExpenses(data);
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
                <h1 id="table-container-title">{paid ? 'Expenses History' : 'Unpaid Expenses'}</h1>
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
                <ExpensesTable expenses={expenses} setExpenses={setExpenses}/>
            </div>
            <div className="chart-container">
                <div className="chart-item">
                    <ExpensesPieChart expenses={expenses}/>
                </div>
                <div className="chart-item">
                    <ExpensesBarChart expenses={expenses}/>
                </div>
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

export default ExpensesOverview;
