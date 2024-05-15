import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

function CourseListRow({ isHeader, textFirstCell, textSecondCell = null }) {
  const style = isHeader ? styles.headerRow : styles.row;

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
  table: {
    width: '90%',
    borderCollapse: 'collapse',
    marginLeft: '5%',
    marginTop: '5%',
    border: '1px solid #ddd',
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
