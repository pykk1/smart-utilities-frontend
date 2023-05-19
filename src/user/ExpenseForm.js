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
    const [price, setPrice] = useState();
    const [note, setNote] = useState('');
    const [date, setDate] = useState('');
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    const [titleError, setTitleError] = useState(false);
    const [noteError, setNoteError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [expenseTypeError, setExpenseTypeError] = useState(false);

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

        setTitleError(false);
        setNoteError(false);
        setPriceError(false);
        setDateError(false);
        setExpenseTypeError(false);

        if (expenseType === '') {
            setExpenseTypeError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Expense type is mandatory'
            });
            return;
        }
        if (!title) {
            setTitleError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Title is mandatory'
            });
            return;
        }
        if (title.length > 20) {
            setTitleError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Title should be less than 20 characters'
            });
            return;
        }
        if (!price) {
            setPriceError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Price is mandatory'
            });
            return;
        }
        if (price <= 0) {
            setPriceError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Price should be a positive number'
            });
            return;
        }
        if (!date) {
            setDateError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Date is mandatory'
            });
            return;
        }
        if (note.length > 100) {
            setNoteError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Note should be less than 100 characters'
            });
            return;
        }

        const currentDate = new Date();
        const selectedDate = new Date(date);

        if (selectedDate > currentDate) {
            setDateError(true)
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Date cannot be in the future'
            });
            return;
        }


        setLoading(true);

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
                setExpenseType('');
                setTitle('');
                setAttachments([]);
                setPaid('No');
                setPrice(0);
                setNote('');
                setDate('');
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'Success!'
                });
            }

            setLoading(false);
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
                    <select value={expenseType} onChange={event => setExpenseType(event.target.value)}
                            className={expenseTypeError ? "validation-error" : ""}>
                        <option disabled value="">
                            -- select type --
                        </option>
                        {expenseTypes.map(type => (
                            <option value={type} key={type}>{type}</option>
                        ))}
                    </select>

                    <label>Title</label>
                    <input type="text" value={title} onChange={event => setTitle(event.target.value)}
                           className={titleError ? "validation-error" : ""}/>

                    <label>Price</label>
                    <input type="number" value={price} onChange={event => setPrice(Number(event.target.value))}
                           className={priceError ? "validation-error" : ""}/>

                    <label>Paid</label>
                    <select value={paid} onChange={event => setPaid(event.target.value)}>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                    </select>

                    <label>Date</label>
                    <input type="date" value={date} onChange={event => setDate(event.target.value)}
                           className={dateError ? "validation-error" : ""}/>

                    <label>Note</label>
                    <input type="text" value={note} onChange={event => setNote(event.target.value)}
                           className={noteError ? "validation-error" : ""}/>

                    <label>Attachments</label>
                    <input type="file" id="file" multiple onChange={handleFileChange} style={{display: "none"}}/>
                    <div className="files-display">
                        {attachments.map((file, index) => (
                            <div key={index} className="file-item">
                                <span>{file.name}</span>
                                <div className="remove-file" onClick={() => removeFile(index)}>X</div>
                            </div>
                        ))}
                    </div>
                    <label htmlFor="file" className="custom-file-upload">
                        Choose Files
                    </label>


                    <input type="submit" value={loading ? 'Submitting...' : 'Submit'} disabled={loading}/>
                </form>
            </div>
            <CustomSnackbar open={snackbar.open} severity={snackbar.severity} message={snackbar.message}
                            onClose={handleSnackbarClose}/>
        </>
    );
};

export default ExpenseForm;
