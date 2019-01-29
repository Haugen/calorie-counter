import React, { Component } from 'react';

import { Link } from '@reach/router';

import Meal from '../components/Meal';
import MealFilters from '../components/MealFilters';
import { convertDate, timeNumber } from '../util/helpers';
import cFetcher from '../util/fetch';

class ListMeals extends Component {
  state = {
    meals: [],
    filters: {
      fromDate: null,
      toDate: null,
      fromTime: null,
      toTime: null
    },
    dailyCalories: null,
    activeQuery: '',
    loading: true
  };

  async componentDidMount() {
    const userId = localStorage.getItem('userId');
    const result = await cFetcher(
      '/user/' + userId,
      'GET',
      null,
      this.props.token
    );

    if (result.hasError) {
      return this.props.setMessages(result.errorMessages);
    }

    this.setState({
      dailyCalories: result.data.calories
    });

    this.handleFiltering();
  }

  fetchMeals = async resource => {
    const response = await cFetcher(resource, 'GET', null, this.props.token);
    return response;
  };

  handleFilterChange = (event, filter) => {
    this.setState(
      {
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
      loading: true
    });

    const result = await this.fetchMeals('/meals' + this.state.activeQuery);

    if (result.hasError) {
      return this.props.setMessages(result.errorMessages);
    }

    const meals = [];

    const fromTime = timeNumber(this.state.filters.fromTime) || 0;
    const toTime = timeNumber(this.state.filters.toTime) || 1440;

    result.data.meals.forEach(day => {
      day.dayMeals.forEach(meal => {
        meal.overDaily = day.dayTotalCalories > this.state.dailyCalories;
        if (meal.time >= fromTime && meal.time <= toTime) {
          meals.push(meal);
        }
      });
    });

    this.setState({
      meals: meals,
      loading: false
    });
  };

  buildQuery = () => {
    const queries = [];
    let query = '';

    for (let [key, value] of Object.entries(this.state.filters)) {
      if (value) {
        const date = convertDate(value, 'ltu');
        queries.push(`${key}=${date}`);
      }
    }

    if (queries.length > 0) {
      query = `?${queries.join('&')}`;
    }

    this.setState({
      activeQuery: query
    });
  };

  handleDelete = async mealId => {
    const result = await cFetcher(
      '/meals/' + mealId,
      'DELETE',
      null,
      this.props.token
    );

    if (result.hasError) {
      return this.props.setMessages(result.errorMessages);
    }

    const newMeals = this.state.meals.filter(meal => {
      return meal._id !== mealId;
    });

    this.setState({
      meals: newMeals
    });
  };

  render() {
    let content;

    if (this.state.loading) {
      content = 'Loading...';
    } else if (!this.state.loading && this.state.meals.length > 0) {
      content = [];
      this.state.meals.forEach(meal => {
        content.push(
          <Meal
            key={meal._id}
            text={meal.text}
            calories={meal.calories}
            date={meal.date}
            overDaily={meal.overDaily}
            id={meal._id}
            onDelete={this.handleDelete}
          />
        );
      });
    } else if (!this.state.loading) {
      content = 'No meals to display.';
    }

    return (
      <>
        <h1>My meals</h1>
        <p>
          <strong>
            <Link to="/add-meal">+ Add new meal</Link>
          </strong>
        </p>
        <MealFilters
          filters={this.state.filters}
          onFilterChange={this.handleFilterChange}
          onHandleFiltering={this.handleFiltering}
        />
        <div className="meal-list">{content}</div>
      </>
    );
  }
}

export default ListMeals;
