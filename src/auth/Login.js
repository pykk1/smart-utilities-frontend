import React, {useState} from 'react';
import './style/Auth.css';
import jwt_decode from 'jwt-decode';
import CustomSnackbar from "../shared-components/CustomSnackbar";
import {API_BASE_URL} from "../shared-components/Functions";

function Login() {
    const [username, setUsername] = useState('user1');
    const [password, setPassword] = useState('123');

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

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const data = {username, password};
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'Success !'
                });
                const responseData = await response.json();
                sessionStorage.setItem('token', responseData.accessToken);

                const decoded = jwt_decode(responseData.accessToken);
                const userRole = decoded.authorities;

                if (userRole === 'ADMIN') {
                    window.location.href = '/admin/register';
                } else {
                    window.location.href = '/';
                }
            } else if (response.status === 401) {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            setSnackbar({
                open: true,
                severity: 'error',
                message: error.message
            });
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: 'Error communicating with server'
                });
            }
            console.error(error);
        }
    };

    const handleRegister = () => {
        setSnackbar({
            open: true,
            severity: 'error',
            message: 'Register disabled'
        });
    };

    return (
        <>
            <div id="auth-container">
                <h1 id="auth-title">Login</h1>
                <form id={"AuthForm"} onSubmit={handleLogin}>
                    <label>
                        Username :
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                    <label>
                        Password :&nbsp;
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <input type="submit" value="Submit"/>
                    <input className={"register-button"} type="button" value="Register" onClick={() => {
                        handleRegister();
                    }}/>
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

export default Login;
