import React from 'react';
import './Notifications.css';
import { getLatestNotification } from '../utils/utils.js';
import closeIcon from '../assets/close-icon.jpg';

function Notifications() {
  return (
    <div className="Notifications"
      style={{
        position: 'relative',
        border: '2px dashed red'
        }}>
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li data-priority="urgent" dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
      </ul>
      <button
        style={{
          position: 'absolute',
          top: '0',
          right: '0'
        }}
        onClick={() => {
          console.log('Close button han been clicked');
        }}
        aria-label="Close"
      >
        <img className="close-icon" src={closeIcon} alt="close-icon"/>
      </button>
	</div>
  );
}

export default Notifications;