import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Signin() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
            try {
            if (isSignUp) {
                
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, username, password })
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
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                
                if (response.ok) {
                    console.log('Login successful');
                    const userData = await response.json();
                    localStorage.setItem('user', JSON.stringify(userData));
                    navigate('/home'); // Navigate to home page
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
         <div className="signin-container">
        <form onSubmit={handleSubmit}>
            <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
                <input 
                    type="email" 
                    placeholder="Email address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    />
                    {isSignUp && (
                        <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                    )}
                <input
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type = "submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
                <p>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button 
                    type="button" 
                    onClick={() => setIsSignUp(!isSignUp)}
                    style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                >
                    {isSignUp ? 'Log In' : 'Sign Up'}
                </button>
            </p>
            </form>
       </div>
    );
}

export default Signin;