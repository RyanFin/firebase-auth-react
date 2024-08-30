// src/App.jsx
import { useState } from 'react';
import AuthForm from './components/AuthForm';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
      <AuthForm isLogin={isLogin} />
    </div>
  );
}

export default App;
