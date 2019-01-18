import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from '@reach/router';

import * as actionCreators from '../../store/actions';

class Signup extends Component {
  state = {
    formData: {
      email: '',
      password: ''
    }
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

    this.props.handleSignup(formData);
  };

  render() {
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

const mapStateToProps = state => ({
  // test: state.auth.test
});

const mapDispatchToProps = dispatch => ({
  handleSignup: formData => dispatch(actionCreators.handleSignup(formData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
