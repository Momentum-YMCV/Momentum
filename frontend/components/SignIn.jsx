import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, username, password }),
        });

        if (response.ok) {
          console.log('Sign up successful');

          setIsSignUp(false);

          setEmail('');
          setUsername('');
          setPassword('');
        }
      } else {
        // Login logic
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          console.log('Login successful');
          const userData = await response.json();
          localStorage.setItem('user', JSON.stringify(userData));

          // Dispatch custom event to update NavBar
          window.dispatchEvent(new Event('userLoggedIn'));

          navigate('/home'); // Navigate to home page
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div id='signin-container'>
      <form id='signin-form' onSubmit={handleSubmit}>
        <h2 id='signin-title'>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
        <input
          id='email-input'
          type='email'
          placeholder='Email address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {isSignUp && (
          <input
            id='username-input'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          id='password-input'
          type='password'
          placeholder='Password...'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id='signin-submit-button' type='submit'>
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>
        <p id='signin-toggle-text'>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            id='signin-toggle-button'
            type='button'
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: 'none',
              border: 'none',
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Signin;
