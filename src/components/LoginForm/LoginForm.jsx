import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import * as usersService from '../../utilities/users-service';
import './LoginForm.css'; 

export default function LoginForm({ setUser }) {
  const navigate = useNavigate(); 
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
      navigate('/posts');
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div className='mainlogin'>
      <div className="form-container-login">
        <h1>Login</h1>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          </div>
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
