import '@/styles/globals.css'; 
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import Auth from './auth';
import Home from './home';

function MyApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      {isAuthenticated ? <Home /> : <Auth onLogin={handleLogin} />}
    </>
  );
}

export default MyApp;
