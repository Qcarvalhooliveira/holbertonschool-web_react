import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';

function Notifications({ displayDrawer, listNotifications}) {
  const drawerStyle = displayDrawer ? styles.drawerOpen : styles.drawerClosed;

  return (
    <div className={css(styles.notifications, drawerStyle)}>
      {!displayDrawer && (
     <div className={css(styles.menuItem)} data-testid="menuItem">
     Your notifications
 </div>
      )}
      {displayDrawer && (
        <>
          <div className={css(styles.drawerHeader)}>
            <p className={css(styles.headerText)}>Here is your notification list</p>
            <button className={css(styles.closeButton)} onClick={() => console.log('Close button has been clicked')}>X</button>
          </div>
          <ul className={css(styles.list)}>
            {listNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                type={notification.type}
                value={notification.value}
                html={notification.html}
                markAsRead={() => console.log(`Notification ${notification.id} has been marked as read`)}
                id={notification.id}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string,
      }),
    })
  ).isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  displayDrawer: false,
};

const styles = StyleSheet.create({
  notifications: {
    position: 'relative',
  },
  drawerClosed: {
    display: 'block',
  },
  drawerOpen: {
    display: 'block',
    '@media (max-width: 768px)': {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      zIndex: 1000,
      fontSize: '20px',
      padding: 0,
    },
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid black',
  },
  headerText: {
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
});

export default Notifications;
