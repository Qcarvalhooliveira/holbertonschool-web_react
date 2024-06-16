import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

function CourseListRow({ isHeader, textFirstCell, textSecondCell, onChangeRow, id, isChecked }) {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className={css(styles.headerRow)}>
          <th colSpan="2">{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr className={css(styles.headerRow)}>
        <th>{textFirstCell}</th>
        <th>{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr className={css(styles.row)}>
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onChangeRow(id, e.target.checked)}
        />
        {textFirstCell}
      </td>
      <td>{textSecondCell}</td>
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.string,
  onChangeRow: PropTypes.func,
  id: PropTypes.string,
  isChecked: PropTypes.bool,
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
  onChangeRow: () => {},
  id: '',
  isChecked: false,
};

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#f5f5f5',
  },
  row: {
    ':nth-of-type(odd)': {
      backgroundColor: '#f9f9f9',
    },
  },
});

export default CourseListRow;
