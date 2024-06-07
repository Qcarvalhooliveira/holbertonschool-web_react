import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

function CourseListRow({ isHeader, textFirstCell, textSecondCell = null }) {
  const [isChecked, setIsChecked] = useState(false);

  const style = isHeader ? styles.headerRow : isChecked ? styles.rowChecked : styles.row;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className={css(style)}>
          <th colSpan="2">{textFirstCell}</th>
        </tr>
      );
    } else {
      return (
        <tr className={css(style)}>
          <th className={css(styles.th)}>{textFirstCell}</th>
          <th className={css(styles.th)}>{textSecondCell}</th>
        </tr>
      );
    }
  } else {
    return (
      <tr className={css(style)}>
        <td><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /></td>
        <td>{textFirstCell}</td>
        <td>{textSecondCell}</td>
      </tr>
    );
  }
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545'
  },
  row: {
    backgroundColor: '#f5f5f5'
  },
  rowChecked: {
    backgroundColor: '#e6e4e4'
  },
  th: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left'
  },
  td: {
    padding: '12px',
    textAlign: 'left'
  },
  trHover: {
    ':hover': {
      backgroundColor: '#f5f5f5'
    }
  }
});

export default CourseListRow;
