import React, { Component } from 'react';

import { Link } from '@reach/router';
import cFetcher from '../util/fetch';

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

    const body = JSON.stringify({
      email: formData.email,
      password: formData.password
    });

    const result = await cFetcher('/user/login', 'POST', body);

    if (result.hasError) {
      return this.props.setMessages(result.errorMessages);
    }

    this.setState({ loginSuccess: true });
    this.props.onSuccess(result);
  };

  render() {
    return (
      <>
        <p>
          Don't yet have an account? <Link to="signup">Sign up now!</Link>
        </p>
        <h1>Login</h1>
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
