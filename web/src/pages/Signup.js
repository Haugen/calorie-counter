import React, { Component } from 'react';

import { Link, Redirect } from '@reach/router';

class Signup extends Component {
  state = {
    formData: {
      email: '',
      password: ''
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

    const response = await fetch('http://localhost:3001/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    // If validation failed.
    if (response.status === 422) {
      const result = await response.json();

      const errors = [];

      if (result.errors) {
        result.errors.forEach(error => {
          errors.push({
            type: 'warning',
            message: error.msg
          });
        });
      }

      return this.props.setMessages(errors);
    }
    if (response.status !== 201) {
      const result = await response.json();

      return this.props.setMessages({
        type: 'warning',
        message: result.message
      });
    }

    // Account sucessfully created.
    this.setState({ signupSuccess: true });
    this.props.onSuccess();
  };

  render() {
    if (this.state.signupSuccess) {
      return <Redirect noThrow to="/" />;
    } else {
      return (
        <>
          <p>
            Already have an account? <Link to="/">Go login!</Link>
          </p>
          <h2>Sign up</h2>
          <form onSubmit={e => this.handleFormPost(e, this.state.formData)}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                onChange={e => this.handleInputChange(e, 'email')}
                value={this.state.email}
                type="email"
                className="form-control"
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={e => this.handleInputChange(e, 'password')}
                value={this.state.password}
                type="password"
                className="form-control"
                id="password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign up!
            </button>
          </form>
        </>
      );
    }
  }
}

export default Signup;
