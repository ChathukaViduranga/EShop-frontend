// NotificationButton.jsx
import React, { useState } from "react";
import "./NotificationButton.css"; // Import custom CSS for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function NotificationButton({ notifications }) {
  const [showNotifications, setShowNotifications] = useState(false);

  // Calculate the number of unread notifications
  const unreadCount = notifications.length;

  const handleButtonClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      {/* Notification Button */}
      <div className="notification-button" onClick={handleButtonClick}>
        <FontAwesomeIcon icon={faEnvelope} size="lg" />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="notification-panel">
          <div className="notification-header">
            <h5>Notifications</h5>
            <button
              className="close-button"
              onClick={() => setShowNotifications(false)}
            >
              &times;
            </button>
          </div>
          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div className="notification-item" key={index}>
                  Your product {notification.name} is running low on stock.
                  Please update the stock quantity.
                </div>
              ))
            ) : (
              <div className="notification-item">No notifications.</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationButton;
