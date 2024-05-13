import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Login() {
    return (
        <div className={css(styles.body)}>
            <p>Login to access the full dashboard</p>
            <div className={css(styles.bodyContainer)}>
                <div className={css(styles.inputGroup)}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div className={css(styles.inputGroup)}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button className={css(styles.button)}>OK</button>
            </div>
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
