import React, {useState} from 'react';
import './style/Auth.css';
import CustomSnackbar from '../shared-components/CustomSnackbar';

function Register() {
    const token = sessionStorage.getItem('token');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: '',
        message: '',
    });

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [repeatedPasswordError, setRepeatedPasswordError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        setFirstNameError(false);
        setLastNameError(false);
        setUsernameError(false);
        setPasswordError(false);
        setRepeatedPasswordError(false);
        setAddressError(false);
        setEmailError(false);

        const credentials = {username, password};
        const data = {firstName, lastName, credentials, address, email};

        if (firstName.length < 3) {
            setFirstNameError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'First name should be at least 3 characters',
            });
            return;
        }

        if (lastName.length < 3) {
            setLastNameError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Last name should be at least 3 characters',
            });
            return;
        }

        if (username.length < 5) {
            setUsernameError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Username should be at least 5 characters',
            });
            return;
        }

        if (password.length < 8) {
            setPasswordError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Password should be at least 8 characters',
            });
            return;
        }

        if (password !== repeatedPassword) {
            setRepeatedPasswordError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Passwords do not match',
            });
            return;
        }

        if (address.length < 15) {
            setAddressError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Address should be at least 15 characters',
            });
            return;
        }

        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailPattern.test(email)) {
            setEmailError(true);
            setSnackbar({
                open: true,
                severity: 'warning',
                message: 'Invalid email',
            });
            return;
        }

        try {
            const response = await fetch('{API_BASE_URL}/api/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'Success!',
                });
                setFirstName('');
                setLastName('');
                setUsername('');
                setPassword('');
                setRepeatedPassword('');
                setAddress('');
                setEmail('');
            } else if (response.status === 400) {
                throw new Error('Username or Email taken');
            } else {
                throw new Error('Error when registering user');
            }
        } catch (error) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: error.message,
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
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={firstNameError ? 'validation-error' : ''}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={lastNameError ? 'validation-error' : ''}
                        />
                    </label>
                    <label>
                        Username:
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={usernameError ? 'validation-error' : ''}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={passwordError ? 'validation-error' : ''}
                        />
                    </label>
                    <label>
                        Repeat Password:
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={repeatedPassword}
                            onChange={(e) => setRepeatedPassword(e.target.value)}
                            className={repeatedPasswordError ? 'validation-error' : ''}
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={addressError ? 'validation-error' : ''}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={emailError ? 'validation-error' : ''}
                        />
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
