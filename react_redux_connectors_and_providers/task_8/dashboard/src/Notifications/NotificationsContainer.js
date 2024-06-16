import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchNotifications, markAsRead, setNotificationFilter } from '../actions/notificationActionCreators';
import Notifications from './Notifications';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';

const NotificationsContainer = ({ displayDrawer, unreadNotifications, fetchNotifications, markAsRead, setNotificationFilter }) => {
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <Notifications
      displayDrawer={displayDrawer}
      unreadNotifications={unreadNotifications}
      handleDisplayDrawer={() => setNotificationFilter('DEFAULT')}
      handleHideDrawer={() => setNotificationFilter('DEFAULT')}
      markAsRead={markAsRead}
      setNotificationFilter={setNotificationFilter}
    />
  );
};

const mapStateToProps = (state) => ({
  unreadNotifications: getUnreadNotificationsByType(state),
  displayDrawer: state.getIn(['ui', 'isNotificationDrawerVisible']),
});

const mapDispatchToProps = {
  fetchNotifications,
  markAsRead,
  setNotificationFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
