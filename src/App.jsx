// src/App.jsx
import AuthForm from './components/AuthForm';
import './App.css';  // Importing the CSS file for styling
import { useState } from 'react';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      </header>
      <AuthForm isLogin={isLogin} />
      <button className="toggle-button" onClick={toggleAuthMode}>
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default App;
