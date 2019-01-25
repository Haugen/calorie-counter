import React, { Component } from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { convertDate } from '../util/helpers';
import cFetcher from '../util/fetch';

class EditMeals extends Component {
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
      const result = await cFetcher(
        '/meals/' + this.props.id,
        'GET',
        null,
        this.props.token
      );

      if (result.hasError) {
        return this.props.setMessages(result.errorMessages);
      }

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
    const body = {
      text: formData.text,
      calories: formData.calories,
      date: convertDate(formData.date, 'ltu')
    };
    body._id = this.props.editMode ? this.state.formData.id : null;
    let url = '/meals';
    url += this.props.editMode ? '/' + this.state.formData.id : '';

    const result = await cFetcher(
      url,
      method,
      JSON.stringify(body),
      this.props.token
    );

    if (result.hasError) {
      return this.props.setMessages(result.errorMessages);
    }

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
    return (
      <>
        <h1>{this.props.editMode ? 'Edit meal' : 'Add new meal'}</h1>
        {!this.state.loading ? (
          <>
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

export default EditMeals;
