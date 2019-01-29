import React, { Component } from 'react';

import cFetcher from '../util/fetch';

class UserSettings extends Component {
  state = {
    account: '',
    formData: {
      id: '',
      email: '',
      password: '',
      confirmPassword: '',
      calories: ''
    },
    loading: true
  };

  async componentDidMount() {
    const result = await cFetcher(
      '/user/' + this.props.id,
      'GET',
      null,
      this.props.token
    );

    if (result.hasError) {
      return this.props.setMessages(result.errorMessages);
    }

    this.setState({
      account: result.data.email,
      formData: {
        id: result.data.userId,
        email: result.data.email,
        password: '',
        calories: result.data.calories
      },
      loading: false
    });
  }

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

    const body = {
      email: formData.email,
      calories: formData.calories,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    const result = await cFetcher(
      '/user/edit/' + formData.id,
      'PUT',
      JSON.stringify(body),
      this.props.token
    );

    if (result.hasError) {
      return this.props.setMessages(result.errorMessages);
    }

    return this.props.setMessages({
      type: 'success',
      message: result.message
    });
  };

  render() {
    let content;

    if (this.state.loading) {
      content = 'Loading';
    } else {
      content = (
        <>
          <strong>Account: </strong>
          {this.state.account}
          <hr />
          <form onSubmit={e => this.handleFormPost(e, this.state.formData)}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                onChange={e => this.handleInputChange(e, 'email')}
                value={this.state.formData.email}
                type="email"
                className="form-control"
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="calories">Number of daily calories</label>
              <input
                onChange={e => this.handleInputChange(e, 'calories')}
                value={this.state.formData.calories}
                type="number"
                className="form-control"
                id="calories"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">New password</label>
              <input
                onChange={e => this.handleInputChange(e, 'password')}
                value={this.state.formData.password}
                type="password"
                className="form-control"
                id="password"
              />
              <small>Leave blank if you don't want to change password</small>
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm new password</label>
              <input
                onChange={e => this.handleInputChange(e, 'confirmPassword')}
                value={this.state.formData.confirmPassword}
                type="password"
                className="form-control"
                id="confirm-password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update settings
            </button>
          </form>
        </>
      );
    }
    return (
      <>
        <h1>User settings</h1>
        {content}
      </>
    );
  }
}

export default UserSettings;
