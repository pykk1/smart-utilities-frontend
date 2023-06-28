import '../shared-components/style/Bill.css';
import React, {useEffect, useState} from 'react';
import {authFetch} from "../shared-components/Functions";
import CustomSnackbar from "../shared-components/CustomSnackbar";

const AdminBillForm = () => {
    const token = sessionStorage.getItem('token');
    const [billType, setBillType] = useState('');
    const [unitsOfMeasurement, setUnitsOfMeasurement] = useState('');
    const [costPerUnit, setCostPerUnit] = useState(0);
    const [units, setUnits] = useState(0);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const currentDate = new Date();
    const [issueDate, setIssueDate] = useState(currentDate.toISOString().slice(0, 10));
    const [dueDate, setDueDate] = useState(new Date(currentDate.setDate(currentDate.getDate() + 15)).toISOString().slice(0, 10));
    const [index, setIndex] = useState(0);
    const [clientCode, setClientCode] = useState(0);
    const [clientCodes, setClientCodes] = useState([]);

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
                const response = await authFetch('{API_BASE_URL}/api/admin/client-codes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }, setSnackbar);
                const data = await response.json();
                setClientCodes(data);
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
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const bill = {
            billType: billType,
            units: units,
            costPerUnit: costPerUnit,
            fromDate: new Date(fromDate),
            toDate: new Date(toDate),
            issueDate: new Date(issueDate),
            dueDate: new Date(dueDate),
            index: index,
            clientCode: clientCode,
        };

        try {
            const response = await authFetch('{API_BASE_URL}/api/admin/bill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bill)
            }, setSnackbar);
            if (response.ok) {
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'Success !'
                });
                await response.json();
            }
        } catch (error) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Error communicating with server '
            });
            console.log(error);
        }
    }

    const handleBillTypeChange = (event) => {
        setBillType(event.target.value);
        switch (event.target.value) {
            case 'WATER':
                setUnitsOfMeasurement('l');
                setCostPerUnit(0.02462);
                break;
            case 'ELECTRICITY':
                setUnitsOfMeasurement('KWh');
                setCostPerUnit(1.18)
                break;
            case 'GAS':
                setUnitsOfMeasurement("\u33A5");
                setCostPerUnit(3.3015)
                break;
            default:
                setUnitsOfMeasurement('');
        }
    };

    return (<>
        <div id="billForm-container">
            <h1 id="billForm-title">Create new Bill</h1>
            <form id="billForm" onSubmit={handleSubmit}>
                <label htmlFor="billType">Bill Type</label>
                <select id="billType" name="billType" onChange={handleBillTypeChange}>
                    <option disabled selected value>-- select type --</option>
                    <option value="WATER">Water</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="GAS">Gas</option>
                </select>

                <label htmlFor='clientCode'>Client Code</label>
                <select id='clientCode' name='clientCode'
                        onChange={(event) => setClientCode(parseInt(event.target.value))}>
                    <option disabled selected value>-- select code --</option>
                    {clientCodes.map((code) => (
                        <option key={code} value={code}>
                            {code}
                        </option>
                    ))}
                </select>

                <label htmlFor="index">Index</label>
                <input type="number" id="index" name="index" value={index}
                       onChange={(event) => setIndex(parseInt(event.target.value))}/>

                <label htmlFor="unitsOfMeasurement">Unit of Measurement</label>
                <input type="text" id="unitsOfMeasurement" name="unitsOfMeasurement" value={unitsOfMeasurement}
                       disabled={true}/>

                <label htmlFor="units">Units</label>
                <input type="number" id="units" name="units" value={units}
                       onChange={(event) => setUnits(event.target.value)}/>

                <label htmlFor="costPerUnit">Cost Per Unit</label>
                <input type="number" id="costPerUnit" name="costPerUnit" value={costPerUnit} disabled={true}/>

                <label htmlFor="fromDate">From Date</label>
                <input type="date" id="fromDate" name="fromDate" value={fromDate}
                       onChange={(event) => {
                           setFromDate(event.target.value);
                           const fromDateObj = new Date(event.target.value);
                           const toDateObj = new Date(fromDateObj.setMonth(fromDateObj.getMonth() + 1));
                           const toDateString = toDateObj.toISOString().slice(0, 10);
                           setToDate(toDateString);
                       }}/>

                <label htmlFor="toDate">To Date</label>
                <input type="date" id="toDate" name="toDate" value={toDate}
                       onChange={(event) => setToDate(event.target.value)}/>

                <label htmlFor="issueDate">Issue Date</label>
                <input type="date" id="issueDate" name="issueDate" disabled={true} value={issueDate}/>

                <label htmlFor="dueDate">Due Date</label>
                <input type="date" id="dueDate" name="dueDate" value={dueDate} disabled={true}/>

                <input type="submit" value="Submit"/>
            </form>
        </div>
        <CustomSnackbar
            open={snackbar.open}
            severity={snackbar.severity}
            message={snackbar.message}
            onClose={handleSnackbarClose}
        />
    </>)
};

export default AdminBillForm;