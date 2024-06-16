import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      // Prepare data to be sent to the backend
      const userData = {
        username,
        password,
      };

      const backendUrl = 'http://localhost:8000/login';

      // Assuming you have an API endpoint for login
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Login successful, you can handle success state here
      console.log('Login successful!');
      // Optionally, you can redirect to another page or update state
    } catch (error) {
      console.error('Error during login:', error);
      // Handle errors from fetch or from backend
      setError('Failed to login. Please check your credentials.');
    }

    // Clear password field after submission for security reasons
    setPassword('');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <span className="error">{error}</span>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
