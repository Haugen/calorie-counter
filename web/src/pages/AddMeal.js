import React, { Component } from 'react';

import { BASE_URL } from '../util/vars';

class Login extends Component {
  state = {
    formData: {
      text: '',
      calories: '',
      date: '',
      time: ''
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

    const response = await fetch(BASE_URL + '/meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token
      },
      body: JSON.stringify({
        text: formData.text,
        calories: formData.calories,
        date: formData.date,
        time: formData.time
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

    // If unauthorized or other error.
    if (response.status !== 200) {
      const result = await response.json();

      return this.props.setMessages({
        type: 'warning',
        message: result.error
      });
    }

    // Meal sucessfully added.
    const result = await response.json();

    this.setState({
      formData: {
        text: '',
        calories: '',
        date: '',
        time: ''
      }
    });

    return this.props.setMessages({
      type: 'success',
      message: result.message
    });
  };

  render() {
    return (
      <>
        <h2>Add new meal</h2>
        <form onSubmit={e => this.handleFormPost(e, this.state.formData)}>
          <div className="form-group">
            <label htmlFor="text">Text</label>
            <textarea
              onChange={e => this.handleInputChange(e, 'text')}
              value={this.state.formData.text}
              className="form-control"
              id="text"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="calories">Number of calories</label>
            <input
              onChange={e => this.handleInputChange(e, 'calories')}
              value={this.state.formData.calories}
              type="number"
              className="form-control"
              id="calories"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add meal
          </button>
        </form>
      </>
    );
  }
}

export default Login;
