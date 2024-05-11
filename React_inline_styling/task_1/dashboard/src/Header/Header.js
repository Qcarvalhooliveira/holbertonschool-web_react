import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/Holberton_Logo.jpg';

function Header() {
  return (
    <header className={css(styles.header)}>
      <div className={css(styles.logoContainer)}>
        <img src={logo} className={css(styles.logo)} alt="logo" />
        <h1 className={css(styles.headerTitle)}>School dashboard</h1>
      </div>
    </header>
  )
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    borderBottom: '4px solid #e0003c',
    justifyContent: 'space-between',
    height: '230px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '200px',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    color: '#e0003c',
  }
});

export default Header;
