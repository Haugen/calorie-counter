import React, { Component } from 'react';

import { Link } from '@reach/router';
import { BASE_URL } from '../util/helpers';

class Login extends Component {
  state = {
    formData: {
      email: '',
      password: ''
    },
    loginSuccess: false
  };

  handleInputChange = (event, field) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [field]: event.target.value
      }
    });
  };

  handleFormPost = async (event, formData) => {
    event.preventDefault();

    const response = await fetch(BASE_URL + '/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    // If wrong credentials.
    if (response.status === 401) {
      const result = await response.json();

      return this.props.setMessages({
        type: 'warning',
        message: result.message
      });
    }
    if (response.status !== 200) {
      const result = await response.json();

      return this.props.setMessages({
        type: 'warning',
        message: result.message
      });
    }

    // Account sucessfully created.
    const result = await response.json();
    this.setState({ loginSuccess: true });
    this.props.onSuccess(result);
  };

  render() {
    return (
      <>
        <p>
          Don't yet have an account? <Link to="signup">Sign up now!</Link>
        </p>
        <h2>Login</h2>
        <form onSubmit={e => this.handleFormPost(e, this.state.formData)}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              onChange={e => this.handleInputChange(e, 'email')}
              value={this.state.formData.email}
              type="email"
              className="form-control"
              id="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={e => this.handleInputChange(e, 'password')}
              value={this.state.formData.password}
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login!
          </button>
        </form>
      </>
    );
  }
}

export default Login;
