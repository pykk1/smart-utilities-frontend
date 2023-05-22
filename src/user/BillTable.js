import React, {useState} from 'react';
import '../shared-components/style/Table.css';
import '../shared-components/style/Pagination.css';
import Pagination from "../shared-components/Pagination";
import {authFetch, formatDate} from "../shared-components/Functions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSackDollar} from "@fortawesome/free-solid-svg-icons";

const BillTable = ({bills, setBills}) => {
    const token = sessionStorage.getItem('token');
    const [currentPage, setCurrentPage] = useState(1);

    const [billsPerPage] = useState(10);
    const indexOfLastBill = currentPage * billsPerPage;
    const indexOfFirstBill = indexOfLastBill - billsPerPage;

    const currentBills = bills.slice(indexOfFirstBill, indexOfLastBill);
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
        const maxIndex = Math.ceil(bills.length / billsPerPage) - pageRange;
        setStartIndex(Math.max(0, Math.min(newIndex, maxIndex)));
    };

    const handlePaymentStatusChange = async (billId, isPaid) => {
        try {
            const response = await authFetch(`http://localhost:8080/api/bill/pay/${billId}`, {
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
                const updatedBills = bills.map(bill => bill.id === billId ? {...bill, paid: !isPaid} : bill);
                setBills(updatedBills);
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
            <table id="customTable">
                <thead>
                <tr>
                    <th>Bill Type</th>
                    <th>Price</th>
                    <th>Paid</th>
                    <th>Units</th>
                    <th>Cost Per Unit</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Index</th>
                </tr>
                </thead>
                <tbody>
                {currentBills.map((bill, index) => (
                    <tr key={index}>
                        <td>{bill.billType === 'Other' ? `Other(${bill.name})` : bill.billType}</td>
                        <td>{bill.price}</td>
                        <td>
                            <span>{bill.paid ? 'Yes' : 'No  '}  </span>
                            {!bill.paid && (
                                <FontAwesomeIcon icon={faSackDollar}
                                                 onClick={() => handlePaymentStatusChange(bill.id, bill.paid)}
                                                 className="pay-status-icon"/>
                            )}
                        </td>
                        <td>{bill.units}</td>
                        <td>{bill.costPerUnit}</td>
                        <td>{formatDate(bill.fromDate)}</td>
                        <td>{formatDate(bill.toDate)}</td>
                        <td>{formatDate(bill.issueDate)}</td>
                        <td>{formatDate(bill.dueDate)}</td>
                        <td>{bill.index !== null ? bill.index : 'N/A'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                paginate={paginate}
                startIndex={startIndex}
                pageRange={pageRange}
                itemsPerPage={billsPerPage}
                items={bills}
            />
        </>
    );
};

export default BillTable;
