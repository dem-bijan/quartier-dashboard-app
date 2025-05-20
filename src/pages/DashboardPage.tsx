
import { useState, useEffect } from 'react';
import './DashboardPage.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <div className="stat-card" style={{ borderColor: color }}>
    <div className="stat-icon" style={{ backgroundColor: color }}>
      {icon}
    </div>
    <div className="stat-content">
      <h3 className="stat-title">{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
  </div>
);

interface Task {
  id: number;
  title: string;
  due: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
}

interface RecentPayment {
  id: number;
  resident: string;
  amount: number;
  date: string;
  type: string;
}

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulated data - would be fetched from API in production
  const stats = [
    { title: "Résidents", value: 78, icon: "👥", color: "#4285F4" },
    { title: "Réparations en cours", value: 12, icon: "🔧", color: "#EA4335" },
    { title: "Factures impayées", value: "5 320 €", icon: "💰", color: "#FBBC05" },
    { title: "Prochaine assemblée", value: "15 Juin", icon: "📅", color: "#34A853" },
  ];
  
  const tasks: Task[] = [
    { id: 1, title: "Valider les devis de plomberie", due: "Aujourd'hui", priority: "high", status: "pending" },
    { id: 2, title: "Programmer l'entretien des espaces verts", due: "Demain", priority: "medium", status: "pending" },
    { id: 3, title: "Répondre aux demandes de réparation", due: "25/05/2023", priority: "high", status: "in-progress" },
    { id: 4, title: "Préparer l'ordre du jour de l'AG", due: "28/05/2023", priority: "medium", status: "pending" },
    { id: 5, title: "Mettre à jour le plan d'entretien", due: "02/06/2023", priority: "low", status: "completed" },
  ];
  
  const recentPayments: RecentPayment[] = [
    { id: 1, resident: "Martin Dupont", amount: 450, date: "22/05/2023", type: "Charges mensuelles" },
    { id: 2, resident: "Sophie Laurent", amount: 450, date: "21/05/2023", type: "Charges mensuelles" },
    { id: 3, resident: "Jean Petit", amount: 275, date: "20/05/2023", type: "Charges mensuelles" },
    { id: 4, resident: "Marie Leroy", amount: 550, date: "19/05/2023", type: "Charges mensuelles" },
  ];
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <div className="loading-state">Chargement du tableau de bord...</div>;
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Tableau de bord</h1>
      </header>
      
      <section className="dashboard-stats">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </section>
      
      <section className="dashboard-content">
        <div className="dashboard-tasks">
          <div className="card">
            <div className="card-header">
              <h2>Tâches à faire</h2>
              <button className="action-button">+ Ajouter</button>
            </div>
            <div className="task-list">
              {tasks.map((task) => (
                <div key={task.id} className="task-item">
                  <div className="task-checkbox">
                    <input 
                      type="checkbox" 
                      id={`task-${task.id}`}
                      checked={task.status === 'completed'}
                      readOnly 
                    />
                    <label htmlFor={`task-${task.id}`}>
                      <span className={task.status === 'completed' ? 'completed' : ''}>
                        {task.title}
                      </span>
                    </label>
                  </div>
                  <div className="task-meta">
                    <span className="task-due">{task.due}</span>
                    <span className={`task-priority priority-${task.priority}`}>
                      {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <button className="view-all-btn">Voir toutes les tâches</button>
            </div>
          </div>
        </div>
        
        <div className="dashboard-payments">
          <div className="card">
            <div className="card-header">
              <h2>Paiements récents</h2>
            </div>
            <div className="table-container">
              <table className="payments-table">
                <thead>
                  <tr>
                    <th>Résident</th>
                    <th>Montant</th>
                    <th>Date</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.resident}</td>
                      <td>{payment.amount} €</td>
                      <td>{payment.date}</td>
                      <td>{payment.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer">
              <button className="view-all-btn">Voir tous les paiements</button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="dashboard-announcements">
        <div className="card">
          <div className="card-header">
            <h2>Annonces récentes</h2>
            <button className="action-button">+ Créer</button>
          </div>
          <div className="announcements-content">
            <div className="announcement">
              <h3>Maintenance ascenseurs</h3>
              <p>Les ascenseurs seront en maintenance le 27/05 de 9h à 12h.</p>
              <div className="announcement-date">Publié le 20/05/2023</div>
            </div>
            <div className="announcement">
              <h3>Assemblée générale</h3>
              <p>L'assemblée générale annuelle aura lieu le 15 juin à 18h dans la salle commune.</p>
              <div className="announcement-date">Publié le 15/05/2023</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
