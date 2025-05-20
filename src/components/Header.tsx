
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Simulated notifications data
  const notifications = [
    { id: 1, message: "Nouvelle demande de réparation #342", time: "Il y a 5 min", isRead: false },
    { id: 2, message: "Rappel: Assemblée générale le 15/06", time: "Il y a 2h", isRead: false },
    { id: 3, message: "Facture #567 en attente de paiement", time: "Il y a 1j", isRead: true },
  ];
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">Gestion de Syndic</h1>
      </div>
      
      <div className="header-right">
        <div className="header-notifications">
          <button 
            className="notifications-btn" 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          >
            <span className="notifications-icon">🔔</span>
            {unreadCount > 0 && <span className="notifications-badge">{unreadCount}</span>}
          </button>
          
          {isNotificationsOpen && (
            <div className="notifications-dropdown">
              <h3 className="notifications-title">Notifications</h3>
              {notifications.length > 0 ? (
                <ul className="notifications-list">
                  {notifications.map((notification) => (
                    <li 
                      key={notification.id} 
                      className={`notification-item ${notification.isRead ? '' : 'unread'}`}
                    >
                      <p className="notification-message">{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-notifications">Aucune notification</p>
              )}
              <div className="notifications-footer">
                <button className="mark-all-read">Tout marquer comme lu</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="header-search">
          <input type="text" placeholder="Rechercher..." className="search-input" />
          <button className="search-btn">🔍</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
