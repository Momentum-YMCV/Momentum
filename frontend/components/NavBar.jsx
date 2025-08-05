import { Link } from 'react-router-dom';

function NavBar(){
    return (
        <nav id= "navbar">
            <div id="logo">
                <h1 id="title">Momentum</h1>
                <h3 id="tagline">Kickstart your progress every day</h3>

            </div>
            <div id="nav-buttons">
                <Link id="jobTracker-button" to="/tracker">Job Tracker</Link>
                 <Link id="signup-button" to="/signup">Sign up</Link>
                <Link id="login-button"  to="/login">Login in</Link>
            </div>
        </nav>
    );
}

export default NavBar;