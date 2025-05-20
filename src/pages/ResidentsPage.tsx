
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ResidentsPage.css';

interface Resident {
  id: number;
  name: string;
  email: string;
  phone: string;
  apartment: string;
  status: 'owner' | 'tenant';
  moveInDate: string;
  paymentStatus: 'paid' | 'pending' | 'late';
}

const ResidentsPage = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newResident, setNewResident] = useState({
    name: '',
    email: '',
    phone: '',
    apartment: '',
    status: 'owner',
    moveInDate: '',
    paymentStatus: 'paid'
  });

  // Mock data - would be fetched from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockResidents: Resident[] = [
        {
          id: 1,
          name: 'Martin Dupont',
          email: 'martin.dupont@example.com',
          phone: '06 12 34 56 78',
          apartment: 'A101',
          status: 'owner',
          moveInDate: '12/05/2020',
          paymentStatus: 'paid'
        },
        {
          id: 2,
          name: 'Sophie Laurent',
          email: 'sophie.laurent@example.com',
          phone: '06 23 45 67 89',
          apartment: 'B205',
          status: 'owner',
          moveInDate: '23/07/2019',
          paymentStatus: 'paid'
        },
        {
          id: 3,
          name: 'Jean Petit',
          email: 'jean.petit@example.com',
          phone: '06 34 56 78 90',
          apartment: 'C310',
          status: 'tenant',
          moveInDate: '07/01/2022',
          paymentStatus: 'pending'
        },
        {
          id: 4,
          name: 'Marie Leroy',
          email: 'marie.leroy@example.com',
          phone: '06 45 67 89 01',
          apartment: 'A105',
          status: 'tenant',
          moveInDate: '15/03/2021',
          paymentStatus: 'late'
        },
        {
          id: 5,
          name: 'Thomas Bernard',
          email: 'thomas.bernard@example.com',
          phone: '06 56 78 90 12',
          apartment: 'B208',
          status: 'owner',
          moveInDate: '02/09/2018',
          paymentStatus: 'paid'
        }
      ];
      setResidents(mockResidents);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleAddModalOpen = () => {
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    // Reset form
    setNewResident({
      name: '',
      email: '',
      phone: '',
      apartment: '',
      status: 'owner',
      moveInDate: '',
      paymentStatus: 'paid'
    });
  };

  const handleNewResidentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewResident({
      ...newResident,
      [name]: value
    });
  };

  const handleAddResident = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would call an API here
    const newResidentWithId = {
      ...newResident,
      id: residents.length + 1
    } as Resident;
    
    setResidents([...residents, newResidentWithId]);
    handleAddModalClose();
    // Feedback would be shown here
    alert('Résident ajouté avec succès !');
  };

  const handleDeleteResident = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce résident ?')) {
      setResidents(residents.filter(resident => resident.id !== id));
      // Feedback would be shown here
      alert('Résident supprimé avec succès !');
    }
  };

  // Filter and search logic
  const filteredResidents = residents.filter(resident => {
    const matchesSearch = resident.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resident.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resident.apartment.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'owners') return matchesSearch && resident.status === 'owner';
    if (filter === 'tenants') return matchesSearch && resident.status === 'tenant';
    if (filter === 'paid') return matchesSearch && resident.paymentStatus === 'paid';
    if (filter === 'pending') return matchesSearch && (resident.paymentStatus === 'pending' || resident.paymentStatus === 'late');
    
    return matchesSearch;
  });

  if (isLoading) {
    return <div className="loading-state">Chargement des résidents...</div>;
  }

  return (
    <div className="residents-page">
      <div className="page-header">
        <h1>Gestion des résidents</h1>
        <button className="btn btn-primary" onClick={handleAddModalOpen}>+ Ajouter un résident</button>
      </div>
      
      <div className="residents-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un résident..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>
        
        <div className="filter-box">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="form-control"
          >
            <option value="all">Tous les résidents</option>
            <option value="owners">Propriétaires</option>
            <option value="tenants">Locataires</option>
            <option value="paid">Paiements à jour</option>
            <option value="pending">Paiements en attente</option>
          </select>
        </div>
      </div>
      
      {filteredResidents.length === 0 ? (
        <div className="no-results">
          Aucun résident correspondant aux critères de recherche.
        </div>
      ) : (
        <div className="table-container">
          <table className="residents-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Appartement</th>
                <th>Statut</th>
                <th>Date d'entrée</th>
                <th>Paiement</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResidents.map((resident) => (
                <tr key={resident.id}>
                  <td>
                    <Link to={`/residents/${resident.id}`} className="resident-name-link">
                      {resident.name}
                    </Link>
                    <div className="resident-email">{resident.email}</div>
                  </td>
                  <td>{resident.apartment}</td>
                  <td>
                    <span className={`status-badge status-${resident.status}`}>
                      {resident.status === 'owner' ? 'Propriétaire' : 'Locataire'}
                    </span>
                  </td>
                  <td>{resident.moveInDate}</td>
                  <td>
                    <span className={`payment-status payment-${resident.paymentStatus}`}>
                      {resident.paymentStatus === 'paid' ? 'Payé' : 
                       resident.paymentStatus === 'pending' ? 'En attente' : 'En retard'}
                    </span>
                  </td>
                  <td>
                    <div className="resident-actions">
                      <Link to={`/residents/${resident.id}`} className="action-btn view-btn">
                        👁️
                      </Link>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteResident(resident.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2>Ajouter un résident</h2>
              <button className="close-btn" onClick={handleAddModalClose}>✕</button>
            </div>
            <form onSubmit={handleAddResident}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Nom complet</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={newResident.name}
                    onChange={handleNewResidentChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={newResident.email}
                      onChange={handleNewResidentChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Téléphone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={newResident.phone}
                      onChange={handleNewResidentChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="apartment">Appartement</label>
                    <input
                      id="apartment"
                      name="apartment"
                      type="text"
                      value={newResident.apartment}
                      onChange={handleNewResidentChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Statut</label>
                    <select
                      id="status"
                      name="status"
                      value={newResident.status}
                      onChange={handleNewResidentChange}
                      className="form-control"
                      required
                    >
                      <option value="owner">Propriétaire</option>
                      <option value="tenant">Locataire</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="moveInDate">Date d'entrée</label>
                    <input
                      id="moveInDate"
                      name="moveInDate"
                      type="text"
                      placeholder="JJ/MM/AAAA"
                      value={newResident.moveInDate}
                      onChange={handleNewResidentChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentStatus">État du paiement</label>
                    <select
                      id="paymentStatus"
                      name="paymentStatus"
                      value={newResident.paymentStatus}
                      onChange={handleNewResidentChange}
                      className="form-control"
                      required
                    >
                      <option value="paid">Payé</option>
                      <option value="pending">En attente</option>
                      <option value="late">En retard</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleAddModalClose}>Annuler</button>
                <button type="submit" className="btn btn-primary">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResidentsPage;
