// src/components/AuthForm.jsx

import { useState } from 'react';
import { signUp, login } from '../auth';

// eslint-disable-next-line react/prop-types
const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signUp(email, password);
      }
      alert('Success!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AuthForm;
