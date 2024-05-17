import React, { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { getFullYear, getFooterCopy } from '../utils/utils';
import AppContext from '../App/AppContext';

function Footer() {
    const { user } = useContext(AppContext);

    return (
        <footer className={css(styles.footer)}>
            <em>
                <p>{`© Copyright ${getFullYear()} - ${getFooterCopy(true)}`}</p>
                {user.isLoggedIn && <p><a href="/contact">Contact us</a></p>}
            </em>
        </footer>
    );
}

const styles = StyleSheet.create({
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        borderTop: '4px solid #e0003c',
        marginTop: '400px',
    }
});

export default Footer;
