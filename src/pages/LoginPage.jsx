
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
      });
      return;
    }

    try {
      setIsLoading(true);
      const success = await login(email, password);
      
      if (!success) {
        // Toast notification is handled in the AuthContext
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
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
