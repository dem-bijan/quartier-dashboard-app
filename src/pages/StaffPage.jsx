
import { useState } from 'react';
import './StaffPage.css';

const StaffPage = () => {
  // État pour stocker la liste du personnel
  const [staff, setStaff] = useState([
    { 
      id: 1, 
      name: 'Mohamed Alaoui', 
      role: 'Gardien', 
      phone: '06-12-34-56-78', 
      email: 'mohamed.alaoui@lesyndic.ma', 
      startDate: '2022-01-15', 
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Fatima Benani', 
      role: 'Femme de ménage', 
      phone: '06-23-45-67-89', 
      email: 'fatima.benani@lesyndic.ma', 
      startDate: '2021-06-10', 
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Karim Tazi', 
      role: 'Agent de sécurité', 
      phone: '06-34-56-78-90', 
      email: 'karim.tazi@lesyndic.ma', 
      startDate: '2023-03-20', 
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Samira Idrissi', 
      role: 'Jardinière', 
      phone: '06-45-67-89-01', 
      email: 'samira.idrissi@lesyndic.ma', 
      startDate: '2021-09-05', 
      status: 'on-leave'
    },
  ]);

  // État pour le filtre de recherche
  const [searchTerm, setSearchTerm] = useState('');
  
  // État pour le modal d'ajout/modification
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);

  // Filtrer le personnel en fonction du terme de recherche
  const filteredStaff = staff.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ajouter ou mettre à jour un membre du personnel
  const handleSaveStaff = (staffData) => {
    if (currentStaff) {
      // Mise à jour d'un membre existant
      setStaff(staff.map(person => 
        person.id === currentStaff.id ? { ...person, ...staffData } : person
      ));
    } else {
      // Ajout d'un nouveau membre
      const newStaff = {
        id: Math.max(0, ...staff.map(p => p.id)) + 1,
        name: staffData.name || '',
        role: staffData.role || '',
        phone: staffData.phone || '',
        email: staffData.email || '',
        startDate: staffData.startDate || new Date().toISOString().split('T')[0],
        status: staffData.status || 'active'
      };
      setStaff([...staff, newStaff]);
    }
    setIsModalOpen(false);
    setCurrentStaff(null);
  };

  // Supprimer un membre du personnel
  const handleDeleteStaff = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre du personnel ?')) {
      setStaff(staff.filter(person => person.id !== id));
    }
  };

  // Ouvrir le modal pour éditer ou ajouter
  const openStaffModal = (staffMember) => {
    if (staffMember) {
      setCurrentStaff(staffMember);
    } else {
      setCurrentStaff(null);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="staff-page">
      <div className="page-header">
        <h1>Gestion du Personnel</h1>
        <p>Gérez les membres du personnel de la copropriété</p>
      </div>

      <div className="control-panel">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Rechercher par nom ou fonction..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button 
          className="add-button"
          onClick={() => openStaffModal()}
        >
          + Ajouter un membre
        </button>
      </div>

      <div className="staff-grid">
        {filteredStaff.map(person => (
          <div key={person.id} className="staff-card">
            <div className={`staff-status ${person.status}`}></div>
            <div className="staff-info">
              <h3>{person.name}</h3>
              <p className="staff-role">{person.role}</p>
              <div className="staff-contact">
                <p><strong>Tél:</strong> {person.phone}</p>
                <p><strong>Email:</strong> {person.email}</p>
                <p><strong>Date d'embauche:</strong> {new Date(person.startDate).toLocaleDateString('fr-MA')}</p>
              </div>
            </div>
            <div className="staff-actions">
              <button 
                className="edit-button"
                onClick={() => openStaffModal(person)}
              >
                ✏️
              </button>
              <button 
                className="delete-button"
                onClick={() => handleDeleteStaff(person.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>{currentStaff ? 'Modifier le membre' : 'Ajouter un membre'}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const staffData = {
                name: formData.get('name'),
                role: formData.get('role'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                startDate: formData.get('startDate'),
                status: formData.get('status'),
              };
              handleSaveStaff(staffData);
            }}>
              <div className="form-group">
                <label htmlFor="name">Nom complet</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  defaultValue={currentStaff?.name || ''} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Fonction</label>
                <input 
                  type="text" 
                  id="role" 
                  name="role" 
                  defaultValue={currentStaff?.role || ''} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Téléphone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  defaultValue={currentStaff?.phone || ''} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  defaultValue={currentStaff?.email || ''} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="startDate">Date d'embauche</label>
                <input 
                  type="date" 
                  id="startDate" 
                  name="startDate" 
                  defaultValue={currentStaff?.startDate || new Date().toISOString().split('T')[0]} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="status">Statut</label>
                <select 
                  id="status" 
                  name="status" 
                  defaultValue={currentStaff?.status || 'active'}
                >
                  <option value="active">Actif</option>
                  <option value="on-leave">En congé</option>
                  <option value="terminated">Contrat terminé</option>
                </select>
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>Annuler</button>
                <button type="submit">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffPage;
