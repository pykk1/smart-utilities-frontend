import '../shared-components/style/Bill.css';
import React, {useState} from 'react';
import {authFetch} from '../shared-components/Functions';
import CustomSnackbar from '../shared-components/CustomSnackbar';

const BillForm = () => {
    const token = sessionStorage.getItem('token');

    const [validationError, setValidationError] = useState('');

    const [billType, setBillType] = useState('');
    const [unitsOfMeasurement, setUnitsOfMeasurement] = useState('');
    const [costPerUnit, setCostPerUnit] = useState(0);
    const [units, setUnits] = useState(0);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const currentDate = new Date();
    const [issueDate, setIssueDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [index, setIndex] = useState(0);
    const [name, setName] = useState('');
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

    const resetFields = () => {
        setBillType('');
        setUnitsOfMeasurement('');
        setUnits(0);
        setFromDate('');
        setToDate('');
        setIssueDate('');
        setDueDate('');
        setName('');
        setPaid(false);
        switch (billType) {
            case 'WATER':
            case 'ELECTRICITY':
            case 'GAS':
                setCostPerUnit(0);
                setIndex(0);
                break;
            case 'SANITATION':
            case 'RENT':
            case 'INTERNET':
            case 'PHONE':
                setCostPerUnit('');
                setUnits(1);
                setIndex('');
                break;
            case 'OTHER':
                setCostPerUnit('');
                setUnits(1);
                setIndex('');
                break;
            default:
                setCostPerUnit(0);
                setIndex(0);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (billType === '') {
            setValidationError('Bill type is mandatory');
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Bill type is mandatory.'
            });
            return;
        }
        if ((billType === 'WATER' || billType === 'ELECTRICITY' || billType === 'GAS') && index <= 0) {
            setValidationError('Index must be greater than zero.');
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Index must be greater than zero.'
            });
            return;
        }
        if ((billType === 'WATER' || billType === 'ELECTRICITY' || billType === 'GAS') && !index) {
            setValidationError('Index is mandatory.');
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Index is mandatory.'
            });
            return;
        }
        if (billType === 'OTHER' && (name === '' || !name)) {
            setValidationError('Name is mandatory.');
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Name is mandatory.'
            });
            return;
        }
        if (billType === 'OTHER' && (name === '' || name.length > 20)) {
            setValidationError('Name should not exceed 20 characters.');
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Name should not exceed 20 characters.'
            });
            return;
        }
        if ((billType === 'WATER' || billType === 'ELECTRICITY' || billType === 'GAS') && units <= 0) {
            setValidationError('Units must be greater than zero.');
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Units must be greater than zero.'
            });
            return;
        }
        if (!costPerUnit) {
            setValidationError('Cost per unit is mandatory.');
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Cost per unit is mandatory.'
            });
            return;
        }
        if (costPerUnit <= 0) {
            setValidationError('Cost per unit must be greater than zero.');
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Cost per unit must be greater than zero.'
            });
            return;
        }
        if (fromDate === '' || toDate === '' || issueDate === '' || dueDate === '') {
            setValidationError('All dates are mandatory.');
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'All dates are mandatory.'
            });
            return;
        }
        if (new Date(issueDate) > currentDate) {
            setValidationError('Issue date cannot be in the future.');
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Issue date cannot be in the future.'
            });
            return;
        }

        setValidationError('');

        const bill = {
            billType: billType,
            units: units,
            costPerUnit: costPerUnit,
            fromDate: new Date(fromDate),
            toDate: new Date(toDate),
            issueDate: new Date(issueDate),
            dueDate: new Date(dueDate),
            index: index,
            name: name,
            paid: paid
        };

        try {
            const response = await authFetch('http://localhost:8080/api/bill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
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
                resetFields();
            }
        } catch (error) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Error communicating with server'
            });
        }
    };

    const handleBillTypeChange = (event) => {
        setValidationError('')
        setBillType(event.target.value);
        switch (event.target.value) {
            case 'WATER':
                setUnitsOfMeasurement('l');
                setCostPerUnit(0.02462);
                break;
            case 'ELECTRICITY':
                setUnitsOfMeasurement('KWh');
                setCostPerUnit(1.18);
                break;
            case 'GAS':
                setUnitsOfMeasurement('\u33A5');
                setCostPerUnit(3.3015);
                break;
            case 'SANITATION':
            case 'RENT':
            case 'INTERNET':
            case 'PHONE':
                setUnitsOfMeasurement('Not applicable');
                setCostPerUnit('');
                setUnits(1);
                setIndex('');
                setName('');
                break;
            case 'OTHER':
                setUnitsOfMeasurement('Not applicable');
                setCostPerUnit('');
                setUnits(1);
                setIndex('');
                break;
            default:
                setUnitsOfMeasurement('');
        }
    };

    return (
        <>
            <div id="billForm-container">
                <h1 id="billForm-title">Create new Bill</h1>
                <form id={'billForm'} onSubmit={handleSubmit}>
                    <label htmlFor="billType">Bill Type</label>

                    <select id="billType" name="billType" onChange={handleBillTypeChange}
                            className={validationError.includes('Bill type') ? "validation-error" : ""}>
                        <option disabled selected value="">
                            -- select type --
                        </option>
                        <option value="WATER">Water</option>
                        <option value="ELECTRICITY">Electricity</option>
                        <option value="GAS">Gas</option>
                        <option value="SANITATION">Sanitation</option>
                        <option value="RENT">Rent</option>
                        <option value="INTERNET">Internet</option>
                        <option value="PHONE">Phone</option>
                        <option value="OTHER">Other</option>
                    </select>

                    {billType === 'OTHER' ? (
                        <>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className={validationError.includes('Name') ? "validation-error" : ""}
                            />
                        </>
                    ) : (
                        <>
                            <label htmlFor="index">Index</label>
                            <input
                                type="number"
                                id="index"
                                name="index"
                                value={index}
                                onChange={(event) => setIndex(parseInt(event.target.value))}
                                disabled={billType === 'SANITATION' || billType === 'RENT' || billType === 'INTERNET' || billType === 'PHONE' || billType === 'OTHER'}
                                className={validationError.includes('Index') ? "validation-error" : ""}
                            />
                        </>
                    )}

                    <label htmlFor="unitsOfMeasurement">Unit of Measurement</label>
                    <input type="text" id="unitsOfMeasurement" name="unitsOfMeasurement" value={unitsOfMeasurement}
                           disabled={true}/>

                    <label htmlFor="units">Units</label>
                    <input
                        type="number"
                        id="units"
                        name="units"
                        value={units}
                        onChange={(event) => setUnits(event.target.value)}
                        disabled={
                            billType === 'SANITATION' ||
                            billType === 'RENT' ||
                            billType === 'INTERNET' ||
                            billType === 'PHONE' ||
                            billType === 'OTHER'
                        }
                        className={validationError.includes('Units') ? "validation-error" : ""}
                    />

                    <label htmlFor="costPerUnit">Cost Per
                        Unit{billType === 'SANITATION' || billType === 'RENT' || billType === 'INTERNET' || billType === 'PHONE' || billType === 'OTHER' ? ' (price)' : ''}</label>
                    <input
                        type="number"
                        id="costPerUnit"
                        name="costPerUnit"
                        value={costPerUnit}
                        onChange={(event) => setCostPerUnit(event.target.value)}
                        className={validationError.includes('Cost per unit') ? "validation-error" : ""}
                    />

                    <label htmlFor="fromDate">From Date</label>
                    <input
                        type="date"
                        id="fromDate"
                        name="fromDate"
                        value={fromDate}
                        onChange={(event) => {
                            setFromDate(event.target.value);
                            const fromDateObj = new Date(event.target.value);
                            const toDateObj = new Date(fromDateObj.setMonth(fromDateObj.getMonth() + 1));
                            const toDateString = toDateObj.toISOString().slice(0, 10);
                            setToDate(toDateString);
                        }}
                        className={validationError.includes('All dates') ? "validation-error" : ""}
                    />

                    <label htmlFor="toDate">To Date</label>
                    <input type="date" id="toDate" name="toDate" value={toDate}
                           onChange={(event) => setToDate(event.target.value)}
                           className={validationError.includes('All dates') ? "validation-error" : ""}/>

                    <label htmlFor="issueDate">Issue Date</label>
                    <input
                        type="date"
                        id="issueDate"
                        name="issueDate"
                        value={issueDate}
                        onChange={(event) => setIssueDate(event.target.value)}
                        className={validationError.includes('All dates') || validationError.includes('Issue date') ? "validation-error" : ""}
                    />

                    <label htmlFor="dueDate">Due Date</label>
                    <input type="date" id="dueDate" name="dueDate" value={dueDate}
                           onChange={(event) => setDueDate(event.target.value)}
                           className={validationError.includes('All dates') ? "validation-error" : ""}
                    />

                    <label htmlFor="paid">Paid</label>
                    <select id="paid" name="paid" onChange={(event) => setPaid(event.target.value === 'true')}>
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>

                    <input type="submit" value="Submit"/>
                </form>
            </div>
            <CustomSnackbar open={snackbar.open} severity={snackbar.severity} message={snackbar.message}
                            onClose={handleSnackbarClose}/>
        </>
    );
};

export default BillForm;
