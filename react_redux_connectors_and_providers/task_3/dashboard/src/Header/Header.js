import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import logo from '../assets/Holberton_Logo.jpg';
import { logout } from '../actions/uiActionCreators';

function Header({ user, logout }) {
 
  return (
    <header className={css(styles.header)}>
      <div className={css(styles.logoContainer)}>
        <img src={logo} className={css(styles.logo)} alt="logo" />
        <h1 className={css(styles.headerTitle)}>School dashboard</h1>
      </div>
      {user.isLoggedIn && (
        <div id="logoutSection" className={css(styles.logoutSection)}>
          <span>Welcome {user.email} (<a href="#" onClick={logout}>logout</a>)</span>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    email: PropTypes.string,
  }).isRequired,
  logout: PropTypes.func.isRequired,
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
  },
  logoutSection: {
    display: 'flex',
    alignItems: 'center',
    color: '#e0003c',
  },
});

const mapStateToProps = (state) => ({
  user: state.get('user') || { isLoggedIn: false, email: '' },
});

const mapDispatchToProps = {
  logout,
};

export { Header };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
