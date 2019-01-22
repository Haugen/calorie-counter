import React, { Component } from 'react';

import Meal from '../components/Meal';
import MealFilters from '../components/MealFilters';
import { BASE_URL, convertDate } from '../util/helpers';

class Login extends Component {
  state = {
    meals: [],
    filters: {
      fromDate: null,
      toDate: null,
      fromTime: null,
      toTime: null
    },
    activeQuery: '',
    loading: true
  };

  async componentDidMount() {
    const response = await this.fetchMeals(BASE_URL + '/meals');

    if (response.status !== 200) {
      const result = await response.json();

      this.setState({
        loading: false
      });

      return this.props.setMessages({
        type: 'warning',
        message: result.error
      });
    }

    const result = await response.json();

    this.setState({
      meals: result.data.meals,
      loading: false
    });
  }

  fetchMeals = async url => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token
      }
    });

    return response;
  };

  handleFilterChange = (event, filter) => {
    this.setState(
      {
        ...this.state,
        filters: {
          ...this.state.filters,
          [filter]: event
        }
      },
      () => this.buildQuery()
    );
  };

  handleFiltering = async () => {
    this.setState({
      ...this.state,
      loading: true
    });

    const response = await this.fetchMeals(
      BASE_URL + '/meals' + this.state.activeQuery
    );

    const result = await response.json();

    this.setState({
      meals: result.data.meals,
      loading: false
    });
  };

  buildQuery = () => {
    const fromDate = this.state.filters.fromDate
      ? convertDate(this.state.filters.fromDate, 'ltu')
      : null;
    const toDate = this.state.filters.toDate
      ? convertDate(this.state.filters.toDate, 'ltu')
      : null;
    const fromTime = this.state.filters.fromTime
      ? convertDate(this.state.filters.fromTime, 'ltu')
      : null;
    const toTime = this.state.filters.toTime
      ? convertDate(this.state.filters.toTime, 'ltu')
      : null;

    let query = '';
    let queries = [];

    if (fromDate) {
      queries.push(`fromDate=${fromDate}`);
    }
    if (toDate) {
      queries.push(`toDate=${toDate}`);
    }
    if (fromTime) {
      queries.push(`fromTime=${fromTime}`);
    }
    if (toTime) {
      queries.push(`toTime=${toTime}`);
    }
    if (queries.length > 0) {
      query = `?${queries.join('&')}`;
    }

    console.log(query);

    this.setState({
      ...this.state,
      activeQuery: query
    });
  };

  handleDelete = async mealId => {
    const response = await fetch(BASE_URL + '/meals/' + mealId, {
      method: 'DELETE',
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

    const newMeals = this.state.meals.filter(meal => {
      return meal._id !== mealId;
    });

    this.setState({
      meals: newMeals,
      loading: false
    });
  };

  render() {
    let content;

    if (!this.state.loading && this.state.meals.length > 0) {
      content = [];
      this.state.meals.forEach(meal => {
        content.push(
          <Meal
            key={meal._id}
            text={meal.text}
            calories={meal.calories}
            date={meal.date}
            id={meal._id}
            onDelete={this.handleDelete}
          />
        );
      });
    } else if (!this.state.loading) {
      content = 'No meals yet.';
    }

    return (
      <>
        <h2>My meals</h2>
        <MealFilters
          filters={this.state.filters}
          onFilterChange={this.handleFilterChange}
          onHandleFiltering={this.handleFiltering}
        />
        {content}
      </>
    );
  }
}

export default Login;
