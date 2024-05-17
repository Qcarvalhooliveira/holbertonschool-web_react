import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

function NotificationItem({ type = 'default', html, value, markAsRead, id }) {
  const style = type === 'urgent' ? styles.urgent : styles.default;

  return (
    <li
      className={css(style)}
      data-priority={type}
      onClick={() => markAsRead(id)}
      data-testid={type === 'urgent' ? 'urgentItem' : 'defaultItem'}
      dangerouslySetInnerHTML={html ? html : null}
    >
      {html ? null : value}
    </li>
  );
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  value: PropTypes.string,
  markAsRead: PropTypes.func.isRequired,
  id: PropTypes.number,
};

NotificationItem.defaultProps = {
  type: 'default',
};

const styles = StyleSheet.create({
  default: {
    color: 'blue',
    '@media (max-width: 768px)': {
      width: '100%',
      fontSize: '20px',
      padding: '10px 8px',
      borderBottom: '1px solid black',
    },
  },
  urgent: {
    color: 'red',
    '@media (max-width: 768px)': {
      width: '100%',
      fontSize: '20px',
      padding: '10px 8px',
      borderBottom: '1px solid black',
    },
  },
});

export default React.memo(NotificationItem);
