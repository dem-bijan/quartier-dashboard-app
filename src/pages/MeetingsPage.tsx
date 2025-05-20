
import { useState, useEffect } from 'react';
import './MeetingsPage.css';

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  attendees?: number;
  attachments?: MeetingAttachment[];
  minutes?: string;
}

interface MeetingAttachment {
  id: number;
  name: string;
  type: string;
  size: string;
  url: string;
}

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockMeetings: Meeting[] = [
        {
          id: 1,
          title: "Assemblée Générale Annuelle",
          date: "15/06/2023",
          time: "18:00",
          location: "Salle commune",
          description: "Assemblée générale annuelle obligatoire pour tous les copropriétaires. Ordre du jour : bilan financier, travaux à prévoir, élection du conseil syndical.",
          status: "upcoming",
          attendees: 0,
          attachments: [
            {
              id: 1,
              name: "Convocation AG",
              type: "PDF",
              size: "245 KB",
              url: "#"
            },
            {
              id: 2,
              name: "Rapport financier 2022",
              type: "PDF",
              size: "1.2 MB",
              url: "#"
            }
          ]
        },
        {
          id: 2,
          title: "Réunion du Conseil Syndical",
          date: "05/06/2023",
          time: "19:00",
          location: "Bureau du syndic",
          description: "Réunion préparatoire à l'assemblée générale. Points à aborder : présentation des comptes, discussion des travaux urgents, préparation de l'ordre du jour.",
          status: "upcoming",
          attendees: 0,
          attachments: [
            {
              id: 3,
              name: "Ordre du jour",
              type: "PDF",
              size: "125 KB",
              url: "#"
            }
          ]
        },
        {
          id: 3,
          title: "Réunion sur la Sécurité",
          date: "12/04/2023",
          time: "18:30",
          location: "Salle commune",
          description: "Discussion sur l'amélioration de la sécurité dans la résidence. Points abordés : installation de caméras, changement des serrures des portes communes.",
          status: "completed",
          attendees: 14,
          attachments: [
            {
              id: 4,
              name: "Procès-verbal",
              type: "PDF",
              size: "320 KB",
              url: "#"
            },
            {
              id: 5,
              name: "Devis sécurité",
              type: "PDF",
              size: "1.5 MB",
              url: "#"
            }
          ],
          minutes: "La réunion a commencé à 18h30 avec 14 participants. Les points suivants ont été abordés : 1) Installation de caméras de surveillance aux entrées principales, 2) Remplacement des serrures d'entrée avec des modèles plus sécurisés, 3) Mise en place d'un éclairage à détection de mouvement dans les parkings. Les résidents ont voté à l'unanimité pour l'installation des caméras et le changement des serrures. Le conseil syndical présentera les devis lors de la prochaine assemblée générale."
        },
        {
          id: 4,
          title: "Réunion d'Information Travaux",
          date: "18/03/2023",
          time: "17:00",
          location: "Salle commune",
          description: "Information sur les travaux de ravalement de façade à venir. Présentation du planning, des contraintes et des coûts.",
          status: "completed",
          attendees: 22,
          attachments: [
            {
              id: 6,
              name: "Planning des travaux",
              type: "PDF",
              size: "450 KB",
              url: "#"
            },
            {
              id: 7,
              name: "Présentation visuelle",
              type: "PPT",
              size: "2.8 MB",
              url: "#"
            }
          ],
          minutes: "La réunion d'information sur les travaux de ravalement s'est tenue avec 22 participants. L'architecte a présenté les différentes phases du projet, qui débutera le 15 juillet et durera environ 3 mois. Les nuisances sonores seront limitées aux heures ouvrables. Plusieurs résidents ont exprimé des inquiétudes concernant l'accès aux balcons pendant les travaux. L'entreprise s'engage à minimiser les perturbations et à communiquer un calendrier précis par étage."
        },
        {
          id: 5,
          title: "Assemblée Générale Extraordinaire",
          date: "10/02/2023",
          time: "18:00",
          location: "Salle communale municipale",
          description: "Assemblée générale extraordinaire concernant le vote de travaux urgents sur le système de chauffage collectif.",
          status: "completed",
          attendees: 35,
          attachments: [
            {
              id: 8,
              name: "Procès-verbal",
              type: "PDF",
              size: "520 KB",
              url: "#"
            },
            {
              id: 9,
              name: "Résultats des votes",
              type: "PDF",
              size: "180 KB",
              url: "#"
            }
          ],
          minutes: "L'assemblée générale extraordinaire s'est tenue avec un quorum atteint (35 copropriétaires présents ou représentés, soit 68% des tantièmes). Le vote pour le remplacement de la chaudière collective a été approuvé à 82% des voix. Le financement se fera par le fonds de travaux existant et un appel de fonds complémentaire de 150€/lot. Les travaux débuteront dès le mois prochain pour une durée de 3 semaines."
        }
      ];
      setMeetings(mockMeetings);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddModalOpen = () => {
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    // Reset form
    setNewMeeting({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
    });
  };

  const handleDetailModalOpen = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setShowDetailModal(true);
  };

  const handleDetailModalClose = () => {
    setSelectedMeeting(null);
    setShowDetailModal(false);
  };

  const handleNewMeetingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMeeting({
      ...newMeeting,
      [name]: value
    });
  };

  const handleAddMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    const newMeetingItem: Meeting = {
      id: Date.now(), // Using timestamp as ID for mock
      ...newMeeting,
      status: 'upcoming',
      attendees: 0,
      attachments: []
    };
    setMeetings([newMeetingItem, ...meetings]);
    handleAddModalClose();
    alert('Réunion ajoutée avec succès !');
  };

  const filteredMeetings = meetings.filter(meeting => 
    (activeTab === 'upcoming' && meeting.status === 'upcoming') || 
    (activeTab === 'past' && (meeting.status === 'completed' || meeting.status === 'cancelled'))
  );

  // Sort meetings by date (most recent first for past, soonest first for upcoming)
  filteredMeetings.sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('-'));
    const dateB = new Date(b.date.split('/').reverse().join('-'));
    
    if (activeTab === 'upcoming') {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });

  const handleSendInvitations = () => {
    alert('Des invitations ont été envoyées aux résidents.');
  };

  if (isLoading) {
    return <div className="loading-state">Chargement des réunions...</div>;
  }

  return (
    <div className="meetings-page">
      <div className="page-header">
        <h1>Gestion des assemblées</h1>
        <button className="btn btn-primary" onClick={handleAddModalOpen}>+ Nouvelle réunion</button>
      </div>
      
      <div className="meetings-tabs">
        <button 
          className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => handleTabChange('upcoming')}
        >
          À venir
        </button>
        <button 
          className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => handleTabChange('past')}
        >
          Passées
        </button>
      </div>
      
      {filteredMeetings.length === 0 ? (
        <div className="no-results">
          {activeTab === 'upcoming' ? 
            "Aucune réunion à venir." : 
            "Aucune réunion passée à afficher."}
        </div>
      ) : (
        <div className="meetings-list">
          {filteredMeetings.map(meeting => (
            <div key={meeting.id} className="meeting-card">
              <div className="meeting-card-content">
                <div className="meeting-date-container">
                  <div className="meeting-date">
                    <div className="meeting-day">{meeting.date.split('/')[0]}</div>
                    <div className="meeting-month">{
                      (() => {
                        const months = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];
                        const monthIndex = parseInt(meeting.date.split('/')[1]) - 1;
                        return months[monthIndex];
                      })()
                    }</div>
                  </div>
                  <div className="meeting-time">{meeting.time}</div>
                </div>
                
                <div className="meeting-info">
                  <h3 className="meeting-title">{meeting.title}</h3>
                  <div className="meeting-location">{meeting.location}</div>
                  <p className="meeting-description">{meeting.description.length > 120 ? 
                    `${meeting.description.substring(0, 120)}...` : meeting.description}</p>
                  
                  {meeting.attachments && meeting.attachments.length > 0 && (
                    <div className="meeting-attachments-count">
                      <span className="attachment-icon">📎</span>
                      {meeting.attachments.length} document{meeting.attachments.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="meeting-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleDetailModalOpen(meeting)}
                >
                  Détails
                </button>
                
                {meeting.status === 'upcoming' && (
                  <button 
                    className="btn btn-primary"
                    onClick={handleSendInvitations}
                  >
                    Envoyer invitations
                  </button>
                )}
                
                {meeting.status === 'completed' && meeting.minutes && (
                  <button className="btn btn-secondary">
                    PV de réunion
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add Meeting Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2>Programmer une réunion</h2>
              <button className="close-btn" onClick={handleAddModalClose}>✕</button>
            </div>
            <form onSubmit={handleAddMeeting}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Titre</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={newMeeting.title}
                    onChange={handleNewMeetingChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      id="date"
                      name="date"
                      type="text"
                      placeholder="JJ/MM/AAAA"
                      value={newMeeting.date}
                      onChange={handleNewMeetingChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">Heure</label>
                    <input
                      id="time"
                      name="time"
                      type="text"
                      placeholder="HH:MM"
                      value={newMeeting.time}
                      onChange={handleNewMeetingChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="location">Lieu</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={newMeeting.location}
                    onChange={handleNewMeetingChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newMeeting.description}
                    onChange={handleNewMeetingChange}
                    className="form-control"
                    rows={4}
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleAddModalClose}>Annuler</button>
                <button type="submit" className="btn btn-primary">Programmer</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Meeting Detail Modal */}
      {showDetailModal && selectedMeeting && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <h2>{selectedMeeting.title}</h2>
              <button className="close-btn" onClick={handleDetailModalClose}>✕</button>
            </div>
            <div className="modal-body">
              <div className="meeting-detail-section">
                <div className="meeting-detail-header">
                  <div className="meeting-detail-meta">
                    <div className="meeting-detail-item">
                      <span className="detail-icon">📅</span>
                      <span>{selectedMeeting.date} à {selectedMeeting.time}</span>
                    </div>
                    <div className="meeting-detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{selectedMeeting.location}</span>
                    </div>
                    {selectedMeeting.status === 'completed' && selectedMeeting.attendees && (
                      <div className="meeting-detail-item">
                        <span className="detail-icon">👥</span>
                        <span>{selectedMeeting.attendees} participants</span>
                      </div>
                    )}
                  </div>
                  <div className={`meeting-status-badge status-${selectedMeeting.status}`}>
                    {selectedMeeting.status === 'upcoming' ? 'À venir' : 
                     selectedMeeting.status === 'completed' ? 'Terminée' : 'Annulée'}
                  </div>
                </div>
                
                <div className="meeting-detail-description">
                  <h3>Description</h3>
                  <p>{selectedMeeting.description}</p>
                </div>
                
                {selectedMeeting.minutes && (
                  <div className="meeting-detail-minutes">
                    <h3>Procès-verbal</h3>
                    <div className="minutes-content">
                      <p>{selectedMeeting.minutes}</p>
                    </div>
                  </div>
                )}
                
                {selectedMeeting.attachments && selectedMeeting.attachments.length > 0 && (
                  <div className="meeting-detail-attachments">
                    <h3>Documents ({selectedMeeting.attachments.length})</h3>
                    <div className="attachments-list">
                      {selectedMeeting.attachments.map(attachment => (
                        <div key={attachment.id} className="attachment-item">
                          <div className="attachment-icon">
                            {attachment.type === 'PDF' ? '📄' : 
                             attachment.type === 'PPT' ? '📊' : 
                             attachment.type === 'DOC' ? '📝' : '📁'}
                          </div>
                          <div className="attachment-info">
                            <div className="attachment-name">{attachment.name}</div>
                            <div className="attachment-meta">
                              {attachment.type} • {attachment.size}
                            </div>
                          </div>
                          <a href={attachment.url} className="attachment-download-btn" download>
                            ⬇️
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              {selectedMeeting.status === 'upcoming' && (
                <>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      handleDetailModalClose();
                      handleSendInvitations();
                    }}
                  >
                    Envoyer invitations
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={handleDetailModalClose}
                  >
                    Modifier
                  </button>
                </>
              )}
              {selectedMeeting.status === 'completed' && (
                <button className="btn btn-secondary">Télécharger le PV</button>
              )}
              <button className="btn btn-secondary" onClick={handleDetailModalClose}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingsPage;
