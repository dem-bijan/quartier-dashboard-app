
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const success = await login(email, password);
      
      if (!success) {
        setError('Identifiants incorrects');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">SyndiGest</h1>
          <p className="login-subtitle">Plateforme de gestion de copropriété</p>
        </div>
        
        <div className="login-form-container">
          <h2>Connexion</h2>
          
          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                placeholder="Votre email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                placeholder="Votre mot de passe"
              />
            </div>
            
            <div className="form-group form-forgot-password">
              <a href="#" className="forgot-password">Mot de passe oublié ?</a>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary login-button" 
              disabled={isLoading}
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>
          
          <div className="login-help">
            <p>Utilisez les identifiants suivants pour la démo :</p>
            <p><strong>Email :</strong> admin@example.com</p>
            <p><strong>Mot de passe :</strong> password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
