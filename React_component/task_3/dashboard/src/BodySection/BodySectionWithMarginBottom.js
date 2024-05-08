import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';
import './BodySectionWithMarginBottom.css';

function BodySectionWithMarginBottom(props) {
    return (
        <div className="bodySectionWithMargin">
            <BodySection {...props} />
        </div>
    );
}

BodySectionWithMarginBottom.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default BodySectionWithMarginBottom;
