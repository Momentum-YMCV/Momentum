import { Link } from 'react-router-dom';

function NavBar(){
      const user = JSON.parse(localStorage.getItem('user') || 'null');      
    return (
        <nav id= "navbar">
            <div id="logo">
                <h1 id="title">Momentum</h1>
                <h3 id="tagline">Kickstart your progress every day</h3>

            </div>
            <div id="nav-buttons">
                <Link id="jobTracker-button" to="/tracker">Job Tracker</Link>
                { user ? (
                    <div>
                        <h4> welcome, {user.username}</h4>
                    </div>
                 ) : (
                    <Link id="signup-button" to="/signup">Sign up/Log in</Link>
                )}
            </div>
        </nav>
    );
}

export default NavBar;