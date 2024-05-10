import React from 'react';
import PropTypes from 'prop-types';

function NotificationItem({ type = 'default', html, value, markAsRead, id }) {
  const liProps = {
    "data-priority": type,
    onClick: () => markAsRead(id)
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

export default React.memo(NotificationItem);
