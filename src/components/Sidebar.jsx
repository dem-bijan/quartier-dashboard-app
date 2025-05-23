
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Tableau de bord', icon: '📊' },
    { path: '/residents', label: 'Résidents', icon: '👥' },
    { path: '/repairs', label: 'Réparations', icon: '🔧' },
    { path: '/meetings', label: 'Assemblées', icon: '📅' },
    { path: '/staff', label: 'Personnel', icon: '👷' },
    { path: '/garage', label: 'Garage', icon: '🚗' },
  ];

  return (
    <>
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? '✕' : '☰'}
      </div>
      
      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">Le Syndic</div>
        </div>
        
        <div className="user-info">
          <div className="avatar">{user?.name?.charAt(0) || 'A'}</div>
          <div className="user-details">
            <div className="user-name">{user?.name}</div>
            <div className="user-role">{user?.role}</div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <span className="logout-icon">🚪</span>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
      
      {isMobileMenuOpen && (
        <div className="sidebar-backdrop" onClick={toggleMobileMenu}></div>
      )}
    </>
  );
};

export default Sidebar;
