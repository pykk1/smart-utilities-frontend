import React, {useState} from 'react';
import './style/Auth.css';
import CustomSnackbar from "../shared-components/CustomSnackbar";

function Register() {
    const [firstName, setFirstName] = useState('First name');
    const [lastName, setLastName] = useState('Last Name');
    const [username, setUsername] = useState('Username');
    const [password, setPassword] = useState('Password');
    const [repeatedPassword, setRepeatedPassword] = useState('Confirm Password');
    const [address, setAddress] = useState('Address');
    const [email, setEmail] = useState('Email');

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

    const handleRegister = async (event) => {
        event.preventDefault();

        const credentials = {username, password};
        const data = {firstName, lastName, credentials, address, email};

        if (password === repeatedPassword) {
            try {
                const response = await fetch('http://localhost:8080/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('User registered successfully');
                    window.location.href = '/login';
                } else {
                    throw new Error('Error when registering user');
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Passwords do not match'
            });
        }
    };

    return (
        <>
            <div id="auth-container">
                <h1 id="auth-title">Register</h1>
                <form id="AuthForm" onSubmit={handleRegister}>
                    <label>
                        First Name:
                        <input type="text" placeholder={firstName} onChange={e => setFirstName(e.target.value)}/>
                    </label>
                    <label>
                        Last Name:
                        <input type="text" placeholder={lastName} onChange={e => setLastName(e.target.value)}/>
                    </label>
                    <label>
                        Username:
                        <input type="text" placeholder={username} onChange={e => setUsername(e.target.value)}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" placeholder={password} onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <label>
                        Repeat Password:
                        <input type="password" placeholder={repeatedPassword}
                               onChange={e => setRepeatedPassword(e.target.value)}/>
                    </label>
                    <label>
                        Address:
                        <input type="text" placeholder={address} onChange={e => setAddress(e.target.value)}/>
                    </label>
                    <label>
                        Email:
                        <input type="text" placeholder={email} onChange={e => setEmail(e.target.value)}/>
                    </label>

                    <input type="submit" value="Register"/>
                </form>
            </div>
            <CustomSnackbar
                open={snackbar.open}
                severity={snackbar.severity}
                message={snackbar.message}
                onClose={handleSnackbarClose}
            />
        </>
    );
}

export default Register;