import React, { Component } from 'react';

import { Link, Redirect } from '@reach/router';

import cFetcher from '../util/fetch';

class Signup extends Component {
  state = {
    formData: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    signupSuccess: false
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
      password: formData.password,
      confirmPassword: formData.confirmPassword
    });

    const result = await cFetcher('/user/signup', 'POST', body);

    if (result.hasError) {
      return this.props.setMessages(result.errorMessages);
    }

    this.setState({ signupSuccess: true });
    this.props.onSuccess();
  };

  render() {
    if (this.state.signupSuccess) {
      return <Redirect noThrow to="/" />;
    } else {
      return (
        <div className="signup-login">
          <h1>Sign up</h1>
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
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm password</label>
              <input
                onChange={e => this.handleInputChange(e, 'confirmPassword')}
                value={this.state.formData.confirmPassword}
                type="password"
                className="form-control"
                id="confirm-password"
              />
            </div>
            <button type="submit" className="btn btn-primary mb-2">
              Sign up!
            </button>
          </form>
          <p>
            Already have an account? <Link to="/">Go login!</Link>
          </p>
        </div>
      );
    }
  }
}

export default Signup;
