import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

function Login() {
    const [state, setState] = useState({ isLoggedIn: false, email: '', password: '', enableSubmit: false });

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        setState((prevState) => ({ ...prevState, isLoggedIn: true }));
    };
 
    const handleChangeEmail = (event) => {
        const email = event.target.value;
        const { password } = state;
        const enableSubmit = email !== '' && password !== '';
        setState((prevState) => ({ ...prevState, email, enableSubmit }));
    };

    const handleChangePassword = (event) => {
        const password = event.target.value;
        const { email } = state;
        const enableSubmit = email !== '' && password !== '';
        setState((prevState) => ({ ...prevState, password, enableSubmit }));
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
                        value={state.email} 
                        onChange={handleChangeEmail} 
                    />
                </div>
                <div className={css(styles.inputGroup)}>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={state.password} 
                        onChange={handleChangePassword} 
                    />
                </div>
                <input 
                    type="submit" 
                    className={css(styles.button)} 
                    value="OK" 
                    disabled={!state.enableSubmit}
                />
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
