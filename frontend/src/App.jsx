import { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import useAuthStore from './store/useAuthStore';

function App() {
  const { token } = useAuthStore();
  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return showRegister
      ? <Register onSwitch={() => setShowRegister(false)} />
      : <Login onSwitch={() => setShowRegister(true)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
