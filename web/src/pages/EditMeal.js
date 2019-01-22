import React, { Component } from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { BASE_URL, convertDate } from '../util/helpers';

class Login extends Component {
  state = {
    formData: {
      id: '',
      text: '',
      calories: '',
      date: new Date(),
      time: ''
    },
    loading: true
  };

  async componentDidMount() {
    if (this.props.editMode) {
      const response = await fetch(BASE_URL + '/meals/' + this.props.id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.props.token
        }
      });

      if (response.status !== 200) {
        const result = await response.json();

        return this.props.setMessages({
          type: 'warning',
          message: result.error
        });
      }

      const result = await response.json();

      this.setState({
        formData: {
          ...this.state.formData,
          id: result.data.meal._id,
          text: result.data.meal.text,
          calories: result.data.meal.calories,
          date: convertDate(result.data.meal.date, 'utl')
        },
        loading: false
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  handleInputChange = (event, field) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [field]: field === 'date' ? event : event.target.value
      }
    });
  };

  handleFormPost = async (event, formData) => {
    event.preventDefault();

    const method = this.props.editMode ? 'PUT' : 'POST';
    const contentBody = {
      text: formData.text,
      calories: formData.calories,
      date: convertDate(formData.date, 'ltu')
    };
    contentBody._id = this.props.editMode ? this.state.formData.id : null;
    let url = BASE_URL + '/meals';
    url += this.props.editMode ? '/' + this.state.formData.id : '';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token
      },
      body: JSON.stringify(contentBody)
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

    // Meal sucessfully added or edited.
    const result = await response.json();

    if (!this.props.editMode) {
      this.setState({
        formData: {
          id: '',
          text: '',
          calories: '',
          date: new Date(),
          time: ''
        }
      });
    }

    return this.props.setMessages({
      type: 'success',
      message: result.message
    });
  };

  render() {
    console.log(this.state.formData.date);

    return (
      <>
        {!this.state.loading ? (
          <>
            <h2>{this.props.editMode ? 'Edit meal' : 'Add new meal'}</h2>
            <form onSubmit={e => this.handleFormPost(e, this.state.formData)}>
              <div className="form-group">
                <label>Date and time</label>
                <div className="form-group">
                  <DatePicker
                    selected={new Date(this.state.formData.date)}
                    onChange={e => this.handleInputChange(e, 'date')}
                    showTimeSelect
                    dateFormat="d/M yyyy HH:mm"
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                  />
                </div>
              </div>
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
                Save meal
              </button>
            </form>
          </>
        ) : null}
      </>
    );
  }
}

export default Login;
