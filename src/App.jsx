
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import StaffPage from './pages/StaffPage';
import GaragePage from './pages/GaragePage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="sidebar">
          <div className="sidebar-header">
            <h2>LeSyndic</h2>
          </div>
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">Tableau de bord</Link></li>
            <li><Link to="/residents" className="nav-link">Résidents</Link></li>
            <li><Link to="/staff" className="nav-link">Personnel</Link></li>
            <li><Link to="/garage" className="nav-link">Parking</Link></li>
            <li><Link to="/finances" className="nav-link">Finances</Link></li>
            <li><Link to="/repairs" className="nav-link">Réparations</Link></li>
            <li><Link to="/meetings" className="nav-link">Réunions</Link></li>
          </ul>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/garage" element={<GaragePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
