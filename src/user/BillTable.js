import React, { useState } from 'react';
import '../shared-components/style/Table.css';
import '../shared-components/style/Pagination.css';
import Pagination from "../shared-components/Pagination";
import {formatDate} from "../shared-components/Functions";

const BillTable = ({ bills }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [billsPerPage] = useState(10);

    const indexOfLastBill = currentPage * billsPerPage;
    const indexOfFirstBill = indexOfLastBill - billsPerPage;
    const currentBills = bills.slice(indexOfFirstBill, indexOfLastBill);

    const [pageRange, setPageRange] = useState(5);
    const [startIndex, setStartIndex] = useState(0);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const halfPageRange = Math.floor(pageRange / 2);
        const newIndex = pageNumber - halfPageRange - 1;
        const maxIndex = Math.ceil(bills.length / billsPerPage) - pageRange;
        setStartIndex(Math.max(0, Math.min(newIndex, maxIndex)));
    };

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
                        <td>{bill.paid ? 'Yes' : 'No'}</td>
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
