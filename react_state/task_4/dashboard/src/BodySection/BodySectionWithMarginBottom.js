import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import BodySection from './BodySection';

function BodySectionWithMarginBottom(props) {
    return (
        <div className={css(styles.bodySectionWithMargin)}>
            <BodySection {...props} />
        </div>
    );
}

BodySectionWithMarginBottom.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
};

const styles = StyleSheet.create({
    bodySectionWithMargin: {
        marginBottom: '40px',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
    }
});

export default BodySectionWithMarginBottom;
