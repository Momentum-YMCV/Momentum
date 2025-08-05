import { useState } from 'react';


function Signin() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('Sign in with:', email, username, password);
        //TODO: log in logic
    };
    return (
        // <div className="signin-container">
        <form onSubmit={handleSubmit}>
            <h2>Sign Up/ Log In</h2>
            
                <input 
                    type="email" 
                    placeholder="Email address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                <input
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type = "submit">Get Started</button>
                
            </form>

        // </div>
    );
}

export default Signin;