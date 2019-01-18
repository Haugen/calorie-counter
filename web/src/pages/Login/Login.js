import React, { Component } from 'react';

import { Link } from '@reach/router';

class Login extends Component {
  render() {
    return (
      <>
        <p>
          Don't yet have an account? <Link to="signup">Sign up now!</Link>
        </p>
        <h2>Login</h2>
        <form onSubmit={e => this.props.onPost(e, 'Form data')}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </>
    );
  }
}

export default Login;
