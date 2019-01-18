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
    console.log(event.target.value);
    this.setState({
      formData: {
        ...this.state.formData,
        [field]: event.target.value
      }
    });
  };

  handleFormPost = async (event, formData) => {
    event.preventDefault();
    console.log(formData);

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

      // @TODO Deal with and display the errors here somehow.
      return;
    }
    if (response.status !== 201) {
      const result = await response.json();

      // @TODO Deal with and display the errors here somehow.
      return;
    }

    // Account sucessfully created.
    this.setState({
      signupSuccess: true
    });
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
          <h2>Signup</h2>
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
              Login
            </button>
          </form>
        </>
      );
    }
  }
}

export default Signup;
