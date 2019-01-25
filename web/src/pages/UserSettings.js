import React, { Component } from 'react';

import cFetcher from '../util/fetch';

class UserSettings extends Component {
  state = {
    formData: {
      id: '',
      email: '',
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
      formData: {
        id: result.data.userId,
        email: result.data.email,
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
      calories: formData.calories
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

    this.props.updateUserSettings({
      dailyCalories: result.data.calories
    });

    return this.props.setMessages({
      type: 'success',
      message: result.message
    });
  };

  render() {
    return (
      <>
        <h1>User settings</h1>
        {!this.state.loading ? (
          <>
            <strong>Account: </strong>
            {this.state.formData.email}
            <hr />
            <form onSubmit={e => this.handleFormPost(e, this.state.formData)}>
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
              <button type="submit" className="btn btn-primary">
                Update settings
              </button>
            </form>
          </>
        ) : null}
      </>
    );
  }
}

export default UserSettings;
