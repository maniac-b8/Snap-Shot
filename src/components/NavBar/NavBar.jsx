import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      {!user && (
        <>
          <Link to="/auth">Log In</Link>
          &nbsp; | &nbsp;
          <Link to="/">Home</Link>
        </>
      )}
      
      {user && (
        <>
          <Link to="/posts">Posts</Link>
          &nbsp; | &nbsp;
          <Link to="/profile">Profile</Link>
          &nbsp; | &nbsp;
          <Link to="/cars">Cars</Link>
          &nbsp; | &nbsp;
          <Link to="/nature">Nature</Link>
          &nbsp; | &nbsp;
          <Link to="/gaming">Gaming</Link>
          &nbsp; | &nbsp;
          <span>Welcome, {user.name}</span>
          &nbsp;&nbsp;
          <Link to="" onClick={handleLogOut}>Log Out</Link>
          &nbsp; &nbsp;
        </>
      )}
    </nav>
  );
}