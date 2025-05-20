
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResidentDetailPage.css';

interface Resident {
  id: number;
  name: string;
  email: string;
  phone: string;
  apartment: string;
  status: 'owner' | 'tenant';
  moveInDate: string;
  paymentStatus: 'paid' | 'pending' | 'late';
  balance: number;
  occupants: number;
  profileImage?: string;
  notes?: string;
}

interface Invoice {
  id: number;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'late';
  description: string;
}

interface Repair {
  id: number;
  date: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

const ResidentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [resident, setResident] = useState<Resident | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedResident, setEditedResident] = useState<Resident | null>(null);

  // Mock data fetch
  useEffect(() => {
    // In a real application, these would be API calls
    setTimeout(() => {
      // Mock resident data
      const mockResident: Resident = {
        id: parseInt(id || '0'),
        name: 'Martin Dupont',
        email: 'martin.dupont@example.com',
        phone: '06 12 34 56 78',
        apartment: 'A101',
        status: 'owner',
        moveInDate: '12/05/2020',
        paymentStatus: 'paid',
        balance: 0,
        occupants: 2,
        notes: 'Propriétaire du conseil syndical. A un chien nommé Rex.'
      };
      
      // Mock invoices
      const mockInvoices: Invoice[] = [
        {
          id: 101,
          date: '01/05/2023',
          amount: 450,
          status: 'paid',
          description: 'Charges trimestrielles Q2 2023'
        },
        {
          id: 92,
          date: '01/02/2023',
          amount: 450,
          status: 'paid',
          description: 'Charges trimestrielles Q1 2023'
        },
        {
          id: 83,
          date: '01/11/2022',
          amount: 450,
          status: 'paid',
          description: 'Charges trimestrielles Q4 2022'
        },
        {
          id: 74,
          date: '01/08/2022',
          amount: 450,
          status: 'paid',
          description: 'Charges trimestrielles Q3 2022'
        }
      ];
      
      // Mock repairs
      const mockRepairs: Repair[] = [
        {
          id: 201,
          date: '15/04/2023',
          description: 'Problème de robinet qui fuit dans la salle de bain',
          status: 'completed'
        },
        {
          id: 185,
          date: '23/01/2023',
          description: 'Serrure de la porte d\'entrée bloquée',
          status: 'completed'
        },
        {
          id: 172,
          date: '05/10/2022',
          description: 'Remplacement du détecteur de fumée',
          status: 'completed'
        }
      ];
      
      setResident(mockResident);
      setEditedResident(mockResident);
      setInvoices(mockInvoices);
      setRepairs(mockRepairs);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleBackClick = () => {
    navigate('/residents');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedResident(resident);
  };

  const handleSaveEdit = () => {
    if (editedResident) {
      setResident(editedResident);
      setIsEditing(false);
      alert('Informations mises à jour !');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editedResident) {
      setEditedResident({
        ...editedResident,
        [name]: value
      });
    }
  };

  if (isLoading) {
    return <div className="loading-state">Chargement des informations...</div>;
  }

  if (!resident) {
    return <div className="error-state">Résident non trouvé</div>;
  }

  return (
    <div className="resident-detail-page">
      <div className="page-header">
        <button className="back-button" onClick={handleBackClick}>
          ← Retour
        </button>
        <h1>Détails du résident</h1>
      </div>
      
      <div className="resident-card">
        <div className="resident-header">
          <div className="resident-avatar">
            {resident.profileImage ? 
              <img src={resident.profileImage} alt={resident.name} /> : 
              resident.name.charAt(0)}
          </div>
          <div className="resident-title">
            <h2>{resident.name}</h2>
            <div className="resident-subtitle">
              <span className={`status-badge status-${resident.status}`}>
                {resident.status === 'owner' ? 'Propriétaire' : 'Locataire'}
              </span>
              <span className="resident-apartment">Appartement {resident.apartment}</span>
            </div>
          </div>
          {!isEditing && (
            <button className="btn btn-secondary edit-btn" onClick={handleEditClick}>
              ✏️ Modifier
            </button>
          )}
        </div>
        
        <div className="resident-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profil
          </button>
          <button 
            className={`tab-btn ${activeTab === 'invoices' ? 'active' : ''}`}
            onClick={() => setActiveTab('invoices')}
          >
            Factures
          </button>
          <button 
            className={`tab-btn ${activeTab === 'repairs' ? 'active' : ''}`}
            onClick={() => setActiveTab('repairs')}
          >
            Réparations
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="profile-tab">
              {isEditing ? (
                <form className="edit-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Nom complet</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        value={editedResident?.name || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        value={editedResident?.email || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Téléphone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="form-control"
                        value={editedResident?.phone || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="apartment">Appartement</label>
                      <input
                        id="apartment"
                        name="apartment"
                        type="text"
                        className="form-control"
                        value={editedResident?.apartment || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="status">Statut</label>
                      <select
                        id="status"
                        name="status"
                        className="form-control"
                        value={editedResident?.status || ''}
                        onChange={handleInputChange}
                      >
                        <option value="owner">Propriétaire</option>
                        <option value="tenant">Locataire</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="occupants">Nombre d'occupants</label>
                      <input
                        id="occupants"
                        name="occupants"
                        type="number"
                        className="form-control"
                        value={editedResident?.occupants || 0}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      className="form-control"
                      rows={3}
                      value={editedResident?.notes || ''}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  
                  <div className="edit-actions">
                    <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                      Annuler
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>
                      Enregistrer
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-section">
                    <h3>Informations de contact</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <div className="info-label">Email</div>
                        <div className="info-value">{resident.email}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Téléphone</div>
                        <div className="info-value">{resident.phone}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Date d'entrée</div>
                        <div className="info-value">{resident.moveInDate}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Nombre d'occupants</div>
                        <div className="info-value">{resident.occupants}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="info-section">
                    <h3>Informations financières</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <div className="info-label">État du compte</div>
                        <div className="info-value">
                          <span className={`payment-status payment-${resident.paymentStatus}`}>
                            {resident.paymentStatus === 'paid' ? 'À jour' : 
                             resident.paymentStatus === 'pending' ? 'En attente' : 'En retard'}
                          </span>
                        </div>
                      </div>
                      <div className="info-item">
                        <div className="info-label">Solde</div>
                        <div className="info-value">
                          {resident.balance === 0 ? 
                            <span className="balance-zero">0 €</span> : 
                            <span className="balance-due">{resident.balance} €</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {resident.notes && (
                    <div className="info-section">
                      <h3>Notes</h3>
                      <div className="notes-box">{resident.notes}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'invoices' && (
            <div className="invoices-tab">
              <div className="tab-header">
                <h3>Historique des factures</h3>
                <button className="btn btn-primary">+ Nouvelle facture</button>
              </div>
              
              {invoices.length > 0 ? (
                <div className="table-container">
                  <table className="invoices-table">
                    <thead>
                      <tr>
                        <th>Référence</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Montant</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td>#{invoice.id}</td>
                          <td>{invoice.date}</td>
                          <td>{invoice.description}</td>
                          <td>{invoice.amount} €</td>
                          <td>
                            <span className={`payment-status payment-${invoice.status}`}>
                              {invoice.status === 'paid' ? 'Payée' : 
                               invoice.status === 'pending' ? 'En attente' : 'En retard'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="no-data">Aucune facture trouvée</div>
              )}
            </div>
          )}
          
          {activeTab === 'repairs' && (
            <div className="repairs-tab">
              <div className="tab-header">
                <h3>Demandes de réparation</h3>
                <button className="btn btn-primary">+ Nouvelle demande</button>
              </div>
              
              {repairs.length > 0 ? (
                <div className="repairs-list">
                  {repairs.map((repair) => (
                    <div key={repair.id} className="repair-item">
                      <div className="repair-header">
                        <div className="repair-id">#{repair.id}</div>
                        <span className={`repair-status status-${repair.status}`}>
                          {repair.status === 'pending' ? 'En attente' : 
                           repair.status === 'in-progress' ? 'En cours' : 'Terminée'}
                        </span>
                      </div>
                      <div className="repair-date">{repair.date}</div>
                      <div className="repair-desc">{repair.description}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">Aucune demande de réparation trouvée</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResidentDetailPage;
