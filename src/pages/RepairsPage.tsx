
import { useState, useEffect } from 'react';
import './RepairsPage.css';

interface Repair {
  id: number;
  title: string;
  description: string;
  location: string;
  reportedBy: string;
  apartment: string;
  reportDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  completionDate?: string;
  estimatedCost?: number;
  actualCost?: number;
  notes?: string;
  images?: string[];
}

const RepairsPage = () => {
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);
  const [newRepair, setNewRepair] = useState({
    title: '',
    description: '',
    location: '',
    reportedBy: '',
    apartment: '',
    priority: 'medium',
  });

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockRepairs: Repair[] = [
        {
          id: 1001,
          title: 'Fuite d\'eau dans la salle de bain',
          description: 'Le robinet du lavabo fuit et cause une flaque au sol',
          location: 'Salle de bain',
          reportedBy: 'Martin Dupont',
          apartment: 'A101',
          reportDate: '22/05/2023',
          status: 'in-progress',
          priority: 'high',
          assignedTo: 'Jean Plombier',
          estimatedCost: 150
        },
        {
          id: 1002,
          title: 'Porte d\'entrée qui grince',
          description: 'La porte d\'entrée grince fortement à chaque ouverture',
          location: 'Entrée',
          reportedBy: 'Sophie Laurent',
          apartment: 'B205',
          reportDate: '20/05/2023',
          status: 'pending',
          priority: 'low'
        },
        {
          id: 1003,
          title: 'Ampoule grillée dans le couloir',
          description: 'L\'ampoule principale du couloir du 3ème étage est grillée',
          location: 'Couloir 3ème étage',
          reportedBy: 'Gardien',
          apartment: 'N/A',
          reportDate: '18/05/2023',
          status: 'completed',
          priority: 'medium',
          assignedTo: 'Michel Électricien',
          completionDate: '19/05/2023',
          actualCost: 35
        },
        {
          id: 1004,
          title: 'Problème chauffage',
          description: 'Le radiateur ne chauffe plus correctement',
          location: 'Salon',
          reportedBy: 'Jean Petit',
          apartment: 'C310',
          reportDate: '15/05/2023',
          status: 'in-progress',
          priority: 'high',
          assignedTo: 'Marc Chauffagiste',
          estimatedCost: 220
        },
        {
          id: 1005,
          title: 'Interphone défectueux',
          description: 'L\'interphone ne sonne plus quand on appelle depuis l\'extérieur',
          location: 'Hall d\'entrée',
          reportedBy: 'Marie Leroy',
          apartment: 'A105',
          reportDate: '12/05/2023',
          status: 'completed',
          priority: 'medium',
          assignedTo: 'Pierre Technicien',
          completionDate: '14/05/2023',
          actualCost: 95
        }
      ];
      setRepairs(mockRepairs);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddModalOpen = () => {
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    // Reset form
    setNewRepair({
      title: '',
      description: '',
      location: '',
      reportedBy: '',
      apartment: '',
      priority: 'medium',
    });
  };

  const handleDetailModalOpen = (repair: Repair) => {
    setSelectedRepair(repair);
    setShowDetailModal(true);
  };

  const handleDetailModalClose = () => {
    setSelectedRepair(null);
    setShowDetailModal(false);
  };

  const handleNewRepairChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRepair({
      ...newRepair,
      [name]: value
    });
  };

  const handleAddRepair = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    const newRepairItem: Repair = {
      id: Date.now(), // Using timestamp as ID for mock
      ...newRepair as any, // Cast to any to avoid TypeScript errors in this mock example
      reportDate: new Date().toLocaleDateString('fr-FR'),
      status: 'pending',
      priority: newRepair.priority as 'low' | 'medium' | 'high' | 'urgent',
    };
    setRepairs([newRepairItem, ...repairs]);
    handleAddModalClose();
    alert('Demande de réparation ajoutée avec succès !');
  };

  const handleStatusChange = (repairId: number, newStatus: 'pending' | 'in-progress' | 'completed' | 'cancelled') => {
    const updatedRepairs = repairs.map(repair => {
      if (repair.id === repairId) {
        return {
          ...repair,
          status: newStatus,
          completionDate: newStatus === 'completed' ? new Date().toLocaleDateString('fr-FR') : repair.completionDate
        };
      }
      return repair;
    });
    setRepairs(updatedRepairs);
  };

  // Filter repairs based on search and filter
  const filteredRepairs = repairs.filter(repair => {
    const matchesSearch = repair.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         repair.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         repair.apartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         repair.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'pending') return matchesSearch && repair.status === 'pending';
    if (filter === 'in-progress') return matchesSearch && repair.status === 'in-progress';
    if (filter === 'completed') return matchesSearch && repair.status === 'completed';
    if (filter === 'high-priority') return matchesSearch && (repair.priority === 'high' || repair.priority === 'urgent');
    
    return matchesSearch;
  });

  if (isLoading) {
    return <div className="loading-state">Chargement des demandes de réparation...</div>;
  }

  return (
    <div className="repairs-page">
      <div className="page-header">
        <h1>Gestion des réparations</h1>
        <button className="btn btn-primary" onClick={handleAddModalOpen}>+ Nouvelle demande</button>
      </div>
      
      <div className="repairs-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher une réparation..."
            value={searchQuery}
            onChange={handleSearch}
            className="form-control"
          />
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            Toutes
          </button>
          <button 
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => handleFilterChange('pending')}
          >
            En attente
          </button>
          <button 
            className={`filter-tab ${filter === 'in-progress' ? 'active' : ''}`}
            onClick={() => handleFilterChange('in-progress')}
          >
            En cours
          </button>
          <button 
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => handleFilterChange('completed')}
          >
            Terminées
          </button>
          <button 
            className={`filter-tab ${filter === 'high-priority' ? 'active' : ''}`}
            onClick={() => handleFilterChange('high-priority')}
          >
            Prioritaires
          </button>
        </div>
      </div>
      
      {filteredRepairs.length === 0 ? (
        <div className="no-results">
          Aucune demande de réparation ne correspond aux critères de recherche.
        </div>
      ) : (
        <div className="repairs-list">
          {filteredRepairs.map(repair => (
            <div key={repair.id} className={`repair-card status-${repair.status}`}>
              <div className="repair-card-header">
                <div className="repair-title-section">
                  <h3 className="repair-title">{repair.title}</h3>
                  <div className="repair-meta">
                    <span className="repair-location">{repair.location}</span>
                    <span className="repair-id">#{repair.id}</span>
                  </div>
                </div>
                <div className="repair-priority-badge priority-${repair.priority}">
                  {repair.priority === 'low' ? 'Basse' : 
                   repair.priority === 'medium' ? 'Moyenne' : 
                   repair.priority === 'high' ? 'Haute' : 'Urgente'}
                </div>
              </div>
              
              <div className="repair-content">
                <p className="repair-description">{repair.description}</p>
                
                <div className="repair-details">
                  <div className="repair-detail-item">
                    <span className="detail-label">Signalé par:</span>
                    <span className="detail-value">{repair.reportedBy}</span>
                  </div>
                  <div className="repair-detail-item">
                    <span className="detail-label">Appartement:</span>
                    <span className="detail-value">{repair.apartment}</span>
                  </div>
                  <div className="repair-detail-item">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{repair.reportDate}</span>
                  </div>
                  <div className="repair-detail-item">
                    <span className="detail-label">Statut:</span>
                    <span className={`detail-value status-badge status-${repair.status}`}>
                      {repair.status === 'pending' ? 'En attente' : 
                       repair.status === 'in-progress' ? 'En cours' : 
                       repair.status === 'completed' ? 'Terminée' : 'Annulée'}
                    </span>
                  </div>
                </div>
                
                {repair.assignedTo && (
                  <div className="repair-assignment">
                    Assigné à: <strong>{repair.assignedTo}</strong>
                  </div>
                )}
              </div>
              
              <div className="repair-actions">
                <button 
                  className="btn btn-secondary view-details-btn"
                  onClick={() => handleDetailModalOpen(repair)}
                >
                  Détails
                </button>
                
                <div className="status-actions">
                  {repair.status !== 'completed' && repair.status !== 'cancelled' && (
                    <select 
                      className="status-select"
                      value={repair.status}
                      onChange={(e) => handleStatusChange(repair.id, e.target.value as any)}
                    >
                      <option value="pending">En attente</option>
                      <option value="in-progress">En cours</option>
                      <option value="completed">Terminée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add Repair Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2>Nouvelle demande de réparation</h2>
              <button className="close-btn" onClick={handleAddModalClose}>✕</button>
            </div>
            <form onSubmit={handleAddRepair}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Titre</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={newRepair.title}
                    onChange={handleNewRepairChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newRepair.description}
                    onChange={handleNewRepairChange}
                    className="form-control"
                    rows={3}
                    required
                  ></textarea>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="location">Emplacement</label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={newRepair.location}
                      onChange={handleNewRepairChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="priority">Priorité</label>
                    <select
                      id="priority"
                      name="priority"
                      value={newRepair.priority}
                      onChange={handleNewRepairChange}
                      className="form-control"
                      required
                    >
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Haute</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="reportedBy">Signalé par</label>
                    <input
                      id="reportedBy"
                      name="reportedBy"
                      type="text"
                      value={newRepair.reportedBy}
                      onChange={handleNewRepairChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apartment">Appartement</label>
                    <input
                      id="apartment"
                      name="apartment"
                      type="text"
                      value={newRepair.apartment}
                      onChange={handleNewRepairChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleAddModalClose}>Annuler</button>
                <button type="submit" className="btn btn-primary">Soumettre</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Repair Detail Modal */}
      {showDetailModal && selectedRepair && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2>Détails de la réparation #{selectedRepair.id}</h2>
              <button className="close-btn" onClick={handleDetailModalClose}>✕</button>
            </div>
            <div className="modal-body">
              <div className="repair-detail-section">
                <h3>Informations générales</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-label">Titre</div>
                    <div className="info-value">{selectedRepair.title}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Statut</div>
                    <div className="info-value">
                      <span className={`status-badge status-${selectedRepair.status}`}>
                        {selectedRepair.status === 'pending' ? 'En attente' : 
                         selectedRepair.status === 'in-progress' ? 'En cours' : 
                         selectedRepair.status === 'completed' ? 'Terminée' : 'Annulée'}
                      </span>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Priorité</div>
                    <div className="info-value">
                      <span className={`priority-badge priority-${selectedRepair.priority}`}>
                        {selectedRepair.priority === 'low' ? 'Basse' : 
                         selectedRepair.priority === 'medium' ? 'Moyenne' : 
                         selectedRepair.priority === 'high' ? 'Haute' : 'Urgente'}
                      </span>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Date du signalement</div>
                    <div className="info-value">{selectedRepair.reportDate}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Emplacement</div>
                    <div className="info-value">{selectedRepair.location}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Signalé par</div>
                    <div className="info-value">{selectedRepair.reportedBy}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Appartement</div>
                    <div className="info-value">{selectedRepair.apartment}</div>
                  </div>
                  {selectedRepair.assignedTo && (
                    <div className="info-item">
                      <div className="info-label">Assigné à</div>
                      <div className="info-value">{selectedRepair.assignedTo}</div>
                    </div>
                  )}
                  {selectedRepair.completionDate && (
                    <div className="info-item">
                      <div className="info-label">Date de complétion</div>
                      <div className="info-value">{selectedRepair.completionDate}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="repair-detail-section">
                <h3>Description</h3>
                <p className="repair-description-full">{selectedRepair.description}</p>
              </div>
              
              {(selectedRepair.estimatedCost || selectedRepair.actualCost) && (
                <div className="repair-detail-section">
                  <h3>Informations financières</h3>
                  <div className="info-grid">
                    {selectedRepair.estimatedCost && (
                      <div className="info-item">
                        <div className="info-label">Coût estimé</div>
                        <div className="info-value">{selectedRepair.estimatedCost} €</div>
                      </div>
                    )}
                    {selectedRepair.actualCost && (
                      <div className="info-item">
                        <div className="info-label">Coût réel</div>
                        <div className="info-value">{selectedRepair.actualCost} €</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {selectedRepair.notes && (
                <div className="repair-detail-section">
                  <h3>Notes</h3>
                  <p className="repair-notes">{selectedRepair.notes}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {selectedRepair.status !== 'completed' && selectedRepair.status !== 'cancelled' && (
                <select 
                  className="status-select"
                  value={selectedRepair.status}
                  onChange={(e) => {
                    handleStatusChange(selectedRepair.id, e.target.value as any);
                    handleDetailModalClose();
                  }}
                >
                  <option value="pending">Marquer comme en attente</option>
                  <option value="in-progress">Marquer comme en cours</option>
                  <option value="completed">Marquer comme terminée</option>
                  <option value="cancelled">Marquer comme annulée</option>
                </select>
              )}
              <button className="btn btn-secondary" onClick={handleDetailModalClose}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepairsPage;
