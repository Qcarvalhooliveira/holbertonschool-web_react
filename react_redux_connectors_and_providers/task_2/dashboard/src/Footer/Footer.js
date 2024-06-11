import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { getFullYear, getFooterCopy } from '../utils/utils';
import { connect } from 'react-redux';

function Footer({ isLoggedIn }) {
  return (
    <footer className={css(styles.footer)}>
      <em>
        <p>{`© Copyright ${getFullYear()} - ${getFooterCopy(true)}`}</p>
        {isLoggedIn && <p><a href="/contact">Contact us</a></p>}
      </em>
    </footer>
  );
}

Footer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    borderTop: '4px solid #e0003c',
    marginTop: '400px',
  },
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.get('isUserLoggedIn'),
});

export default connect(mapStateToProps)(Footer);
