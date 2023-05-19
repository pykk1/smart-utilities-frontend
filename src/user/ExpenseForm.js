import React, {useEffect, useState} from 'react';
import {authFetch} from "../shared-components/Functions";
import CustomSnackbar from "../shared-components/CustomSnackbar";
import './style/ExpenseForm.css';

const ExpenseForm = () => {
    const token = sessionStorage.getItem('token');

    const [expenseType, setExpenseType] = useState('');
    const [title, setTitle] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [paid, setPaid] = useState('No');
    const [price, setPrice] = useState(0);
    const [note, setNote] = useState('');
    const [date, setDate] = useState('');
    const [expenseTypes, setExpenseTypes] = useState([]);

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
        const fetchExpenseTypes = async () => {
            try {
                const response = await authFetch('http://localhost:8080/api/expenses/types', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }, setSnackbar);

                if (response.ok) {
                    const data = await response.json();
                    setExpenseTypes(data);
                }
            } catch (error) {
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: 'Error communicating with server'
                });
            }
        };

        fetchExpenseTypes();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('expense', new Blob([JSON.stringify({
            expenseType: expenseType,
            title: title,
            paid: paid === 'Yes',
            price: price,
            note: note,
            date: new Date(date)
        })], {
            type: 'application/json'
        }));

        attachments.forEach((attachment, index) => {
            formData.append('attachments', attachment, attachment.name);
        });

        try {
            const response = await authFetch('http://localhost:8080/api/expense', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }, setSnackbar);

            if (response.ok) {
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'Success!'
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Error communicating with server'
            });
        }
    };

    const handleFileChange = (event) => {
        setAttachments([...event.target.files]);
    };

    const removeFile = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    return (
        <>
            <div id="expenseForm-container">
                <h1 id="expenseForm-title">Create new Expense</h1>
                <form id="expenseForm" onSubmit={handleSubmit}>
                    <label>Expense Type</label>
                    <select value={expenseType} onChange={event => setExpenseType(event.target.value)}>
                        <option disabled value="">
                            -- select type --
                        </option>
                        {expenseTypes.map(type => (
                            <option value={type} key={type}>{type}</option>
                        ))}
                    </select>

                    <label>Title</label>
                    <input type="text" value={title} onChange={event => setTitle(event.target.value)}/>

                    <label>Attachments</label>
                    <input type="file" id="file" multiple onChange={handleFileChange} style={{display: "none"}}/>
                    <label htmlFor="file" className="custom-file-upload">
                        Choose Files
                    </label>
                    <div className="files-display">
                        {attachments.map((file, index) => (
                            <div key={index} className="file-item">
                                <span>{file.name}</span>
                                <div className="remove-file" onClick={() => removeFile(index)}>X</div>
                            </div>
                        ))}
                    </div>

                    <label>Paid</label>
                    <select value={paid} onChange={event => setPaid(event.target.value)}>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                    </select>

                    <label>Price</label>
                    <input type="number" value={price} onChange={event => setPrice(Number(event.target.value))}/>

                    <label>Note</label>
                    <input type="text" value={note} onChange={event => setNote(event.target.value)}/>

                    <label>Date</label>
                    <input type="date" value={date} onChange={event => setDate(event.target.value)}/>

                    <input type="submit" value="Submit"/>
                </form>
            </div>
            <CustomSnackbar open={snackbar.open} severity={snackbar.severity} message={snackbar.message}
                            onClose={handleSnackbarClose}/>
        </>
    );
};

export default ExpenseForm;
