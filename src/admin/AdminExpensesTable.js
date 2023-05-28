import React, {useState} from 'react';
import '../shared-components/style/Table.css';
import '../shared-components/style/Pagination.css';
import {formatDate} from "../shared-components/Functions";
import AttachmentsPopup from "../user/expenses/AttachmentsPopup";
import CustomSnackbar from "../shared-components/CustomSnackbar";
import Pagination from "../shared-components/Pagination";

const ExpensesTable = ({expenses}) => {
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
                    <th>Client Code</th>
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
                        </td>
                        <td>{expense.note}</td>
                        <td>{formatDate(expense.date)}</td>
                        <td className="attachments-column">
                            <span>{expense.attachments.length}</span>
                        </td>
                        <td>{expense.clientCode}</td>
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
