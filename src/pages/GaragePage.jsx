
import { useState } from 'react';
import './GaragePage.css';

const GaragePage = () => {
  // États pour les places de parking et les formulaires
  const [parkingSpots, setParkingSpots] = useState([
    { id: 1, number: 'P001', type: 'car', status: 'occupied', resident: 'Ahmed Benjelloun', vehicle: 'BMW X5 - 12345-A-23' },
    { id: 2, number: 'P002', type: 'car', status: 'available' },
    { id: 3, number: 'P003', type: 'car', status: 'occupied', resident: 'Sofia Alami', vehicle: 'Renault Clio - 56789-B-41' },
    { id: 4, number: 'P004', type: 'motorcycle', status: 'reserved', resident: 'Kamal Idrissi' },
    { id: 5, number: 'P005', type: 'car', status: 'available' },
    { id: 6, number: 'P006', type: 'car', status: 'maintenance', note: 'Réparation du sol prévue le 15/06' },
    { id: 7, number: 'P007', type: 'car', status: 'occupied', resident: 'Laila Bennani', vehicle: 'Peugeot 208 - 98765-C-12' },
    { id: 8, number: 'P008', type: 'car', status: 'available' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSpot, setCurrentSpot] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  
  // Filtrer les places de parking
  const filteredSpots = parkingSpots.filter(spot => {
    const matchesSearch = 
      spot.number.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (spot.resident && spot.resident.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && spot.status === filterStatus;
  });
  
  // Calculer les statistiques
  const totalSpots = parkingSpots.length;
  const occupiedSpots = parkingSpots.filter(spot => spot.status === 'occupied').length;
  const availableSpots = parkingSpots.filter(spot => spot.status === 'available').length;
  const reservedSpots = parkingSpots.filter(spot => spot.status === 'reserved').length;
  const maintenanceSpots = parkingSpots.filter(spot => spot.status === 'maintenance').length;
  
  // Gérer la soumission du formulaire de place de parking
  const handleSpotSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const updatedSpot = {
      number: formData.get('number'),
      type: formData.get('type'),
      status: formData.get('status'),
      resident: formData.get('resident') || null,
      vehicle: formData.get('vehicle') || null,
      note: formData.get('note') || null,
    };
    
    if (currentSpot) {
      // Modifier une place existante
      setParkingSpots(parkingSpots.map(spot => 
        spot.id === currentSpot.id ? { ...spot, ...updatedSpot } : spot
      ));
    } else {
      // Ajouter une nouvelle place
      const newSpot = {
        ...updatedSpot,
        id: Math.max(0, ...parkingSpots.map(s => s.id)) + 1
      };
      setParkingSpots([...parkingSpots, newSpot]);
    }
    
    setIsFormOpen(false);
    setCurrentSpot(null);
  };
  
  // Ouvrir le formulaire pour modifier ou ajouter une place
  const openSpotForm = (spot = null) => {
    setCurrentSpot(spot);
    setIsFormOpen(true);
    setIsDetailsOpen(false);
  };
  
  // Ouvrir la vue détaillée d'une place
  const openSpotDetails = (spot) => {
    setSelectedSpot(spot);
    setIsDetailsOpen(true);
    setIsFormOpen(false);
  };
  
  // Supprimer une place de parking
  const deleteSpot = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette place de parking ?")) {
      setParkingSpots(parkingSpots.filter(spot => spot.id !== id));
      setIsDetailsOpen(false);
    }
  };
  
  // Ajouter une nouvelle place de parking
  const addNewSpot = () => {
    const newSpotId = Math.max(0, ...parkingSpots.map(s => s.id)) + 1;
    const newSpot = {
      id: newSpotId,
      number: `P${newSpotId.toString().padStart(3, '0')}`,
      type: 'car',
      status: 'available'
    };
    setParkingSpots([...parkingSpots, newSpot]);
  };
  
  // Obtenir la traduction française du statut
  const getStatusInFrench = (status) => {
    switch (status) {
      case 'occupied': return 'Occupée';
      case 'available': return 'Disponible';
      case 'reserved': return 'Réservée';
      case 'maintenance': return 'En maintenance';
      default: return status;
    }
  };
  
  // Obtenir la traduction française du type de véhicule
  const getTypeInFrench = (type) => {
    switch (type) {
      case 'car': return 'Voiture';
      case 'motorcycle': return 'Moto';
      default: return type;
    }
  };
  
  return (
    <div className="garage-page">
      <div className="page-header">
        <h1>Gestion du Parking</h1>
        <p>Gérez les places de stationnement de la copropriété</p>
      </div>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-value">{totalSpots}</div>
          <div className="stat-label">Places totales</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{availableSpots}</div>
          <div className="stat-label">Disponibles</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{occupiedSpots}</div>
          <div className="stat-label">Occupées</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{reservedSpots}</div>
          <div className="stat-label">Réservées</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{maintenanceSpots}</div>
          <div className="stat-label">Maintenance</div>
        </div>
      </div>
      
      <div className="control-panel">
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher par numéro ou résident..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">Tous les statuts</option>
            <option value="available">Disponibles</option>
            <option value="occupied">Occupées</option>
            <option value="reserved">Réservées</option>
            <option value="maintenance">En maintenance</option>
          </select>
        </div>
        
        <button className="add-button" onClick={addNewSpot}>
          + Ajouter une place
        </button>
      </div>
      
      <div className="spots-grid">
        {filteredSpots.map(spot => (
          <div 
            key={spot.id} 
            className={`spot-card status-${spot.status}`}
            onClick={() => openSpotDetails(spot)}
          >
            <div className="spot-number">{spot.number}</div>
            <div className="spot-type">{getTypeInFrench(spot.type)}</div>
            <div className="spot-status">{getStatusInFrench(spot.status)}</div>
            {spot.resident && <div className="spot-resident">{spot.resident}</div>}
          </div>
        ))}
      </div>
      
      {isDetailsOpen && selectedSpot && (
        <div className="modal-backdrop">
          <div className="modal-content spot-details">
            <h2>Détails de la place {selectedSpot.number}</h2>
            
            <div className="spot-detail-grid">
              <div className="spot-detail-item">
                <div className="detail-label">Status</div>
                <div className={`detail-value status-${selectedSpot.status}`}>
                  {getStatusInFrench(selectedSpot.status)}
                </div>
              </div>
              
              <div className="spot-detail-item">
                <div className="detail-label">Type</div>
                <div className="detail-value">{getTypeInFrench(selectedSpot.type)}</div>
              </div>
              
              {selectedSpot.resident && (
                <div className="spot-detail-item">
                  <div className="detail-label">Résident</div>
                  <div className="detail-value">{selectedSpot.resident}</div>
                </div>
              )}
              
              {selectedSpot.vehicle && (
                <div className="spot-detail-item">
                  <div className="detail-label">Véhicule</div>
                  <div className="detail-value">{selectedSpot.vehicle}</div>
                </div>
              )}
              
              {selectedSpot.note && (
                <div className="spot-detail-item full-width">
                  <div className="detail-label">Note</div>
                  <div className="detail-value note">{selectedSpot.note}</div>
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button onClick={() => setIsDetailsOpen(false)}>Fermer</button>
              <button onClick={() => openSpotForm(selectedSpot)}>Modifier</button>
              <button 
                className="delete-button"
                onClick={() => deleteSpot(selectedSpot.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {isFormOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>{currentSpot ? `Modifier la place ${currentSpot.number}` : 'Ajouter une place'}</h2>
            
            <form onSubmit={handleSpotSubmit}>
              <div className="form-group">
                <label htmlFor="number">Numéro de place</label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  defaultValue={currentSpot?.number || ''}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  name="type"
                  defaultValue={currentSpot?.type || 'car'}
                >
                  <option value="car">Voiture</option>
                  <option value="motorcycle">Moto</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="status">Statut</label>
                <select
                  id="status"
                  name="status"
                  defaultValue={currentSpot?.status || 'available'}
                >
                  <option value="available">Disponible</option>
                  <option value="occupied">Occupée</option>
                  <option value="reserved">Réservée</option>
                  <option value="maintenance">En maintenance</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="resident">Résident (si assigné)</label>
                <input
                  type="text"
                  id="resident"
                  name="resident"
                  defaultValue={currentSpot?.resident || ''}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="vehicle">Véhicule (marque, modèle, immatriculation)</label>
                <input
                  type="text"
                  id="vehicle"
                  name="vehicle"
                  defaultValue={currentSpot?.vehicle || ''}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="note">Note</label>
                <textarea
                  id="note"
                  name="note"
                  defaultValue={currentSpot?.note || ''}
                ></textarea>
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => setIsFormOpen(false)}>Annuler</button>
                <button type="submit">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaragePage;
