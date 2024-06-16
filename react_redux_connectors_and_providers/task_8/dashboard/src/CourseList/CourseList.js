import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import CourseListRow from './CourseListRow';
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';
import { getCoursesList } from '../selectors/courseSelector';

function CourseList({ listCourses, fetchCourses, selectCourse, unSelectCourse }) {
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const onChangeRow = (id, checked) => {
    if (checked) {
      selectCourse(id);
    } else {
      unSelectCourse(id);
    }
  };

  return (
    <table className={css(styles.table)}>
      <thead>
        <CourseListRow isHeader textFirstCell="Available courses" />
        <CourseListRow isHeader textFirstCell="Course name" textSecondCell="Credit" />
      </thead>
      <tbody>
        {listCourses.length > 0 ? (
          listCourses.map(course => (
            <CourseListRow
              key={course.id}
              textFirstCell={course.name}
              textSecondCell={course.credit.toString()}
              onChangeRow={onChangeRow}
              id={course.id}
              isChecked={course.isSelected}
            />
          ))
        ) : (
          <CourseListRow textFirstCell="No course available yet" colSpan="2" />
        )}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    credit: PropTypes.number.isRequired,
    isSelected: PropTypes.bool,
  })),
  fetchCourses: PropTypes.func.isRequired,
  selectCourse: PropTypes.func.isRequired,
  unSelectCourse: PropTypes.func.isRequired,
};

CourseList.defaultProps = {
  listCourses: []
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

const mapStateToProps = (state) => ({
  listCourses: getCoursesList(state),
});

const mapDispatchToProps = {
  fetchCourses,
  selectCourse,
  unSelectCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
