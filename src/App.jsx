// src/App.jsx
import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import { getUserDetails, loginWithGoogle } from './auth'; // Import the Google login function
import './App.css';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null); // State to store user information
  const [loading, setLoading] = useState(false); // State to handle loading state

  const toggleAuthMode = () => {
    setIsLogin((prevState) => !prevState);
  };

  // Function to fetch user details and update state
  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage
      if (user && user.uid) {
        const userDetails = await getUserDetails(user.uid);
        setUser(userDetails);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      await fetchUserDetails(); // Fetch user details after Google login
    } catch (error) {
      console.error('Error with Google login:', error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchUserDetails when the component mounts or after a successful login/sign-up
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      </header>
      {user ? (
        <div className="user-info">
          <h2>Welcome, {user.name}!</h2>
          <p>Address: {user.address}</p>
        </div>
      ) : (
        <>
          <AuthForm isLogin={isLogin} onSuccess={fetchUserDetails} />
          <button className="toggle-button" onClick={toggleAuthMode}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>

          {/* Google login button */}
          <button className="google-login-button" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default App;
