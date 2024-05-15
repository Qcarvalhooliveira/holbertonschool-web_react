import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [enableSubmit, setEnableSubmit] = useState(false);

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        setIsLoggedIn(true);
    };

    const handleChangeEmail = (event) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        checkEnableSubmit(emailValue, password);
    };

    const handleChangePassword = (event) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue);
        checkEnableSubmit(email, passwordValue);
    };

    const checkEnableSubmit = (emailValue, passwordValue) => {
        if (emailValue !== '' && passwordValue !== '') {
            setEnableSubmit(true);
        } else {
            setEnableSubmit(false);
        }
    };

    return (
        <div className={css(styles.body)}>
            <p>Login to access the full dashboard</p>
            <form className={css(styles.bodyContainer)} onSubmit={handleLoginSubmit}>
                <div className={css(styles.inputGroup)}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={handleChangeEmail} 
                    />
                </div>
                <div className={css(styles.inputGroup)}>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={handleChangePassword} 
                    />
                </div>
                <input type="submit" value="OK" className={css(styles.button)} disabled={!enableSubmit} />
            </form>
        </div>
    );
};

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        marginBottom: '20px',
        gap: '20px',
    },
    bodyContainer: {
        display: 'flex',
        gap: '10px',
        '@media (max-width: 900px)': {
            display: 'flex',
            flexDirection: 'column',
        }
    },
    inputGroup: {
        display: 'flex',
        gap: '10px',
        '@media (max-width: 900px)': {
            display: 'flex',
        }
    },
    button: {
        alignSelf: 'flex-start',
        '@media (max-width: 900px)': {
            alignSelf: 'flex-start',
        }
    }
});

export default Login;
