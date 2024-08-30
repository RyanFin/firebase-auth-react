// src/components/AuthForm.jsx
import { useState } from 'react';
import { signUp, login } from '../auth';

// eslint-disable-next-line react/prop-types
const AuthForm = ({ isLogin, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Added state for name
  const [address, setAddress] = useState(''); // Added state for address
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signUp(email, password, name, address);
      }
      if (onSuccess) onSuccess(); // Notify App about successful login or sign-up
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      {!isLogin && (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
        </>
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AuthForm;
