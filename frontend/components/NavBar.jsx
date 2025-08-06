import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function NavBar(){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
    
    useEffect(() => {
        const handleStorageChange = () => {
            setUser(JSON.parse(localStorage.getItem('user') || 'null'));
        };
        window.addEventListener('userLoggedIn', handleStorageChange);
        return () => {
            window.removeEventListener('userLoggedIn', handleStorageChange);
        };
    }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null); 
    };
    
    return (
        <nav id= "navbar">
            <div id="logo">
                <div id="logo-text">
                    <div id="title-with-image">
                        <h1 id="title">Momentum</h1>
                        <img src="/momentum.png" alt="Momentum Logo" id="logo-image" />
                    </div>
                    <h3 id="tagline">Kickstart your progress every day</h3>
                </div>
            </div>
            <div id="nav-buttons">
                <Link id="jobTracker-button" to="/tracker">Job Tracker</Link>
                <Link id="checkin-button" to="/home">Daily Check-in</Link>
                { user ? (
                    <button id="logout-button" onClick={handleLogout}>
                        welcome, {user.username || user.name || 'Chris'}
                    </button>
                 ) : (
                    <Link id="signup-button" to="/signup">Sign up/Log in</Link>
                )}
            </div>
        </nav>
    );
}

export default NavBar;