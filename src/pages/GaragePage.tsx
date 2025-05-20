import { useState } from 'react';
import './GaragePage.css';

// Types pour les places de parking
interface ParkingSpot {
  id: number;
  number: string;
  type: 'car' | 'motorcycle' | 'bicycle';
  status: 'occupied' | 'available' | 'reserved' | 'maintenance';
  occupantId?: number;
  occupantName?: string;
  apartmentNumber?: string;
  startDate?: string;
  endDate?: string;
}

interface Occupant {
  id: number;
  name: string;
  apartmentNumber: string;
}

const GaragePage = () => {
  // Liste des occupants (normalement viendrait de l'API)
  const occupants: Occupant[] = [
    { id: 1, name: 'Youssef El Mansouri', apartmentNumber: 'A101' },
    { id: 2, name: 'Amina Berrada', apartmentNumber: 'B205' },
    { id: 3, name: 'Hassan Lahlou', apartmentNumber: 'C310' },
    { id: 4, name: 'Leila Benjelloun', apartmentNumber: 'A203' },
    { id: 5, name: 'Omar Kadiri', apartmentNumber: 'D405' }
  ];

  // État pour stocker les places de parking
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([
    { 
      id: 1, 
      number: 'P001', 
      type: 'car', 
      status: 'occupied',
      occupantId: 1,
      occupantName: 'Youssef El Mansouri',
      apartmentNumber: 'A101',
      startDate: '2023-01-01',
      endDate: '2024-12-31'
    },
    { 
      id: 2, 
      number: 'P002', 
      type: 'car', 
      status: 'available'
    },
    { 
      id: 3, 
      number: 'P003', 
      type: 'car', 
      status: 'occupied',
      occupantId: 2,
      occupantName: 'Amina Berrada',
      apartmentNumber: 'B205',
      startDate: '2023-03-15',
      endDate: '2024-03-14'
    },
    { 
      id: 4, 
      number: 'P004', 
      type: 'car', 
      status: 'maintenance'
    },
    { 
      id: 5, 
      number: 'M001', 
      type: 'motorcycle', 
      status: 'occupied',
      occupantId: 3,
      occupantName: 'Hassan Lahlou',
      apartmentNumber: 'C310',
      startDate: '2023-05-01',
      endDate: '2024-04-30'
    },
    { 
      id: 6, 
      number: 'M002', 
      type: 'motorcycle', 
      status: 'available'
    },
    { 
      id: 7, 
      number: 'B001', 
      type: 'bicycle', 
      status: 'occupied',
      occupantId: 4,
      occupantName: 'Leila Benjelloun',
      apartmentNumber: 'A203',
      startDate: '2023-02-15',
      endDate: '2024-02-14'
    },
    { 
      id: 8, 
      number: 'B002', 
      type: 'bicycle', 
      status: 'reserved',
      occupantId: 5,
      occupantName: 'Omar Kadiri',
      apartmentNumber: 'D405',
      startDate: '2023-06-01'
    }
  ]);

  // État pour le filtre de statut
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // État pour le filtre de type
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // État pour le modal de modification
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSpot, setCurrentSpot] = useState<ParkingSpot | null>(null);

  // Filtrer les places de parking
  const filteredSpots = parkingSpots.filter(spot => {
    const matchStatus = statusFilter === 'all' || spot.status === statusFilter;
    const matchType = typeFilter === 'all' || spot.type === typeFilter;
    return matchStatus && matchType;
  });

  // Calculer les statistiques
  const stats = {
    total: parkingSpots.length,
    available: parkingSpots.filter(spot => spot.status === 'available').length,
    occupied: parkingSpots.filter(spot => spot.status === 'occupied').length,
    reserved: parkingSpots.filter(spot => spot.status === 'reserved').length,
    maintenance: parkingSpots.filter(spot => spot.status === 'maintenance').length,
    cars: parkingSpots.filter(spot => spot.type === 'car').length,
    motorcycles: parkingSpots.filter(spot => spot.type === 'motorcycle').length,
    bicycles: parkingSpots.filter(spot => spot.type === 'bicycle').length
  };

  // Gérer la mise à jour d'une place
  const handleUpdateSpot = (spotData: Partial<ParkingSpot>) => {
    if (currentSpot) {
      let updatedSpot: ParkingSpot = { ...currentSpot, ...spotData };
      
      // Si assigné à un occupant, mettre à jour les informations d'occupant
      if (spotData.occupantId && spotData.status === 'occupied') {
        const occupant = occupants.find(o => o.id === spotData.occupantId);
        if (occupant) {
          updatedSpot.occupantName = occupant.name;
          updatedSpot.apartmentNumber = occupant.apartmentNumber;
        }
      }
      
      // Si marqué comme disponible, supprimer les informations d'occupant
      if (spotData.status === 'available') {
        delete updatedSpot.occupantId;
        delete updatedSpot.occupantName;
        delete updatedSpot.apartmentNumber;
        delete updatedSpot.startDate;
        delete updatedSpot.endDate;
      }
      
      setParkingSpots(parkingSpots.map(spot => 
        spot.id === currentSpot.id ? updatedSpot : spot
      ));
    }
    
    setIsModalOpen(false);
    setCurrentSpot(null);
  };

  // Ajouter une nouvelle place de parking
  const handleAddSpot = () => {
    const newSpotId = Math.max(0, ...parkingSpots.map(s => s.id)) + 1;
    const newSpot: ParkingSpot = {
      id: newSpotId,
      number: `P${newSpotId.toString().padStart(3, '0')}`,
      type: 'car',
      status: 'available'
    };
    
    setParkingSpots([...parkingSpots, newSpot]);
  };

  // Supprimer une place de parking
  const handleDeleteSpot = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette place de parking ?')) {
      setParkingSpots(parkingSpots.filter(spot => spot.id !== id));
    }
  };

  // Ouvrir le modal pour éditer
  const openSpotModal = (spot: ParkingSpot) => {
    setCurrentSpot(spot);
    setIsModalOpen(true);
  };

  return (
    <div className="garage-page">
      <div className="page-header">
        <h1>Gestion du Garage</h1>
        <p>Gérez les places de parking de la résidence</p>
      </div>

      <div className="garage-stats">
        <div className="stat-card">
          <div className="stat-label">Total des places</div>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card available">
          <div className="stat-label">Places disponibles</div>
          <div className="stat-value">{stats.available}</div>
        </div>
        <div className="stat-card occupied">
          <div className="stat-label">Places occupées</div>
          <div className="stat-value">{stats.occupied}</div>
        </div>
        <div className="stat-card reserved">
          <div className="stat-label">Places réservées</div>
          <div className="stat-value">{stats.reserved}</div>
        </div>
      </div>

      <div className="control-panel">
        <div className="filters">
          <div className="filter-group">
            <label>Statut:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Tous</option>
              <option value="available">Disponible</option>
              <option value="occupied">Occupé</option>
              <option value="reserved">Réservé</option>
              <option value="maintenance">En maintenance</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Type:</label>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">Tous</option>
              <option value="car">Voiture</option>
              <option value="motorcycle">Moto</option>
              <option value="bicycle">Vélo</option>
            </select>
          </div>
        </div>

        <button className="add-button" onClick={handleAddSpot}>
          + Ajouter une place
        </button>
      </div>

      <div className="parking-grid">
        {filteredSpots.map(spot => (
          <div 
            key={spot.id} 
            className={`parking-spot ${spot.status} ${spot.type}`}
            onClick={() => openSpotModal(spot)}
          >
            <div className="spot-number">{spot.number}</div>
            <div className="spot-type">
              {spot.type === 'car' && '🚗'}
              {spot.type === 'motorcycle' && '🏍️'}
              {spot.type === 'bicycle' && '🚲'}
            </div>
            <div className="spot-status">{spot.status}</div>
            {spot.occupantName && (
              <div className="spot-details">
                <div className="spot-occupant">{spot.occupantName}</div>
                <div className="spot-apartment">Appartement {spot.apartmentNumber}</div>
                {spot.startDate && (
                  <div className="spot-date">
                    Du {new Date(spot.startDate).toLocaleDateString('fr-MA')}
                    {spot.endDate && ` au ${new Date(spot.endDate).toLocaleDateString('fr-MA')}`}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && currentSpot && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Modifier la place {currentSpot.number}</h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const spotData: Partial<ParkingSpot> = {
                number: formData.get('number') as string,
                type: formData.get('type') as 'car' | 'motorcycle' | 'bicycle',
                status: formData.get('status') as 'occupied' | 'available' | 'reserved' | 'maintenance',
              };
              
              if (spotData.status === 'occupied' || spotData.status === 'reserved') {
                const occupantId = Number(formData.get('occupantId'));
                if (occupantId) {
                  spotData.occupantId = occupantId;
                  spotData.startDate = formData.get('startDate') as string;
                  spotData.endDate = formData.get('endDate') as string || undefined;
                }
              }
              
              handleUpdateSpot(spotData);
            }}>
              <div className="form-group">
                <label htmlFor="number">Numéro de place</label>
                <input 
                  type="text" 
                  id="number" 
                  name="number" 
                  defaultValue={currentSpot.number} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="type">Type de place</label>
                <select 
                  id="type" 
                  name="type" 
                  defaultValue={currentSpot.type}
                >
                  <option value="car">Voiture</option>
                  <option value="motorcycle">Moto</option>
                  <option value="bicycle">Vélo</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="status">Statut</label>
                <select 
                  id="status" 
                  name="status" 
                  defaultValue={currentSpot.status}
                >
                  <option value="available">Disponible</option>
                  <option value="occupied">Occupé</option>
                  <option value="reserved">Réservé</option>
                  <option value="maintenance">En maintenance</option>
                </select>
              </div>
              
              <div className="conditional-fields" id="occupant-fields">
                <div className="form-group">
                  <label htmlFor="occupantId">Occupant</label>
                  <select 
                    id="occupantId" 
                    name="occupantId" 
                    defaultValue={currentSpot.occupantId || ''}
                  >
                    <option value="">Sélectionner un occupant</option>
                    {occupants.map(occupant => (
                      <option key={occupant.id} value={occupant.id}>
                        {occupant.name} (Apt. {occupant.apartmentNumber})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="startDate">Date de début</label>
                  <input 
                    type="date" 
                    id="startDate" 
                    name="startDate" 
                    defaultValue={currentSpot.startDate || new Date().toISOString().split('T')[0]} 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="endDate">Date de fin (optionnel)</label>
                  <input 
                    type="date" 
                    id="endDate" 
                    name="endDate" 
                    defaultValue={currentSpot.endDate || ''} 
                  />
                </div>
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>Annuler</button>
                <button 
                  type="button" 
                  className="delete-button" 
                  onClick={() => {
                    setIsModalOpen(false);
                    handleDeleteSpot(currentSpot.id);
                  }}
                >
                  Supprimer
                </button>
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
