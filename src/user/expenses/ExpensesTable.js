import React, {useState} from 'react';
import '../../shared-components/style/Table.css';
import '../../shared-components/style/Pagination.css';
import {authFetch, formatDate} from "../../shared-components/Functions";
import Pagination from "../../shared-components/Pagination";
import AttachmentsPopup from "./AttachmentsPopup";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faSackDollar} from '@fortawesome/free-solid-svg-icons';
import CustomSnackbar from "../../shared-components/CustomSnackbar";

const ExpensesTable = ({expenses, setExpenses}) => {
    const token = sessionStorage.getItem('token');
    const [currentPage, setCurrentPage] = useState(1);

    const [expensesPerPage] = useState(10);
    const indexOfLastExpense = currentPage * expensesPerPage;
    const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;

    const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);
    const [pageRange, setPageRange] = useState(5);
    const [startIndex, setStartIndex] = useState(0);

    const [snackbar, setSnackbar] = useState({
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

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const halfPageRange = Math.floor(pageRange / 2);
        const newIndex = pageNumber - halfPageRange - 1;
        const maxIndex = Math.ceil(expenses.length / expensesPerPage) - pageRange;
        setStartIndex(Math.max(0, Math.min(newIndex, maxIndex)));
    };

    const [selectedAttachments, setSelectedAttachments] = useState(null);

    const handleAttachmentsClick = (expense) => {
        setSelectedAttachments({
            expenseId: expense.id,
            attachments: expense.attachments
        });
    };

    const handlePaymentStatusChange = async (expenseId, isPaid) => {
        try {
            const response = await authFetch(`http://localhost:8080/api/expense/pay/${expenseId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({isPaid: !isPaid})
            }, setSnackbar);
            if (response.ok) {
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'Success !'
                });
                const updatedExpenses = expenses.map(expense => expense.id === expenseId ? {...expense, paid: !isPaid} : expense);
                setExpenses(updatedExpenses);
            }
        } catch (error) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Error communicating with server'
            });
        }
    }

    return (
        <>
            {selectedAttachments &&
                <AttachmentsPopup
                    attachments={selectedAttachments.attachments}
                    expenseId={selectedAttachments.expenseId}
                    onClose={() => setSelectedAttachments(null)}
                />
            }
            <table id="customTable">
                <thead>
                <tr>
                    <th>Expense Type</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Paid</th>
                    <th>Note</th>
                    <th>Date</th>
                    <th style={{textAlign: 'center'}}>Attachments</th>
                </tr>
                </thead>
                <tbody>
                {currentExpenses.map((expense, index) => (
                    <tr key={index}>
                        <td>{expense.expenseType}</td>
                        <td>{expense.title}</td>
                        <td>{expense.price}</td>
                        <td>
                            <span>{expense.paid ? 'Yes' : 'No  '}  </span>
                            {!expense.paid && (
                                <FontAwesomeIcon icon={faSackDollar}
                                                 onClick={() => handlePaymentStatusChange(expense.id, expense.paid)}
                                                 className="pay-status-icon"/>
                            )}
                        </td>
                        <td>{expense.note}</td>
                        <td>{formatDate(expense.date)}</td>
                        <td className="attachments-column">
                            <span>{expense.attachments.length}</span>
                            {expense.attachments.length > 0 && (
                                <FontAwesomeIcon icon={faArrowDown} onClick={() => handleAttachmentsClick(expense)}
                                                 className="clickable-icon"/>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                paginate={paginate}
                startIndex={startIndex}
                pageRange={pageRange}
                itemsPerPage={expensesPerPage}
                items={expenses}
            />
            <CustomSnackbar open={snackbar.open} severity={snackbar.severity} message={snackbar.message}
                            onClose={handleSnackbarClose}/>
        </>
    );
};

export default ExpensesTable;
