import React, { Component } from 'react';

import protectedComponent from '../../components/hoc/protectedComponent';
import cFetcher from '../../util/fetch';

class AdminListUsers extends Component {
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

    const body = JSON.stringify({
      email: formData.email,
      password: formData.password
    });

    const result = await cFetcher('/user/signup', 'POST', body);

    if (result.hasError) {
      return this.props.setMessages(result.errorMessages);
    }

    this.props.setMessages({
      type: 'success',
      message: 'User successfully added.'
    });
  };

  render() {
    return (
      <>
        <h1>Add new user</h1>
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
            Add user
          </button>
        </form>
      </>
    );
  }
}

export default protectedComponent(AdminListUsers, ['manager', 'admin']);
