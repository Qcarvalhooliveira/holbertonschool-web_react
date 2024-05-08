import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';
import closeIcon from '../assets/close-icon.jpg';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, listNotifications } = this.props;

    return (
      <>
        <div className='notificationsContainer'>
          <div className="menuItem">
              Your notifications
          </div>
          {displayDrawer && (              
              <div className="Notifications" style={{ position: 'relative' }}>
                  <button
                      style={{ position: 'absolute', right: '10px', top: '10px' }}
                      aria-label="Close"
                      onClick={() => console.log('Close button has been clicked')}
                  >
                      <img src={closeIcon} alt="Close" />
                  </button>
                  <p>
                      {listNotifications.length > 0 ? 'Here is the list of notifications' : 'No new notification for now'}
                  </p>
                  <ul>
                      {listNotifications.length > 0 ? (
                          listNotifications.map(notification => (
                              <NotificationItem 
                                  key={notification.id}
                                  type={notification.type}
                                  value={notification.value}
                                  html={notification.html}
                                  markAsRead={this.markAsRead}
                                  id={notification.id}
                              />
                          ))
                      ) : (
                          <NotificationItem value="No new notification for now" />
                      )}
                  </ul>
              </div>                
          )}
        </div>
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape)
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: []
};

export default Notifications;
