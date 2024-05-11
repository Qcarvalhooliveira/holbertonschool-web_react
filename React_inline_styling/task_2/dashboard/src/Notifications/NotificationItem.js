import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

function NotificationItem({ type = 'default', html, value, markAsRead, id }) {
  const style = type === 'urgent' ? styles.urgent : styles.default;
  const liProps = {
    className: css(style),
    "data-priority": type,
    onClick: () => markAsRead(id),
    "data-testid": type === 'urgent' ? "urgentItem" : "defaultItem"
  };

  if (html) {
    liProps.dangerouslySetInnerHTML = html;
  } else {
    liProps.children = value;
  }

  return <li {...liProps} />;
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  value: PropTypes.string,
  markAsRead: PropTypes.func.isRequired,
  id: PropTypes.number
};

NotificationItem.defaultProps = {
  type: 'default'
};

const styles = StyleSheet.create({
  default: {
    color: 'blue',
  },
  urgent: {
    color: 'red',
  },
});


export default React.memo(NotificationItem);
