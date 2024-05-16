import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css'; // Import CSS for styling

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {!user && (
          <>
            <Link to="/auth">
              <button className="nav-button">Log In</button>
            </Link>
            &nbsp; | &nbsp;
            <Link to="/">
              <button className="nav-button">Home</button>
            </Link>
          </>
        )}
      </div>
      {user && (
        <div className="navbar-user-info">
          <span>Welcome, &nbsp; </span>
          <Link to="/profile" className="user-link">
            {user.name}
          </Link>
          &nbsp;&nbsp;
          <button onClick={handleLogOut} className="nav-buttonlogout">Log Out</button>
          &nbsp;&nbsp;
        </div>
      )}
    </nav>
  );
}
