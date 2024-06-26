import { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import './SignUpForm.css';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { name, email, password } = this.state;
      const formData = { name, email, password };
      const user = await signUp(formData);
      this.props.setUser(user);
      window.location.replace('/');
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container-signup">
          <h1>Sign Up Here</h1>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <label>Confirm</label>
              <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            </div>
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
