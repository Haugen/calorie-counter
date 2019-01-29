import React, { Component } from 'react';

import { Link } from '@reach/router';

import protectedComponent from '../../components/hoc/protectedComponent';
import cFetcher from '../../util/fetch';
import GenericList from '../../components/GenericList';

class AdminListMeals extends Component {
  state = {
    meals: [],
    loading: true
  };

  async componentDidMount() {
    const result = await cFetcher(
      '/admin/meals',
      'GET',
      null,
      this.props.token
    );

    if (result.hasError) {
      return this.props.setMessages(result.errorMessages);
    }

    this.setState({
      meals: result.data.meals,
      loading: false
    });
  }

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
    } else {
      content = (
        <GenericList
          content="meals"
          meals={this.state.meals}
          onDelete={this.handleDelete}
        />
      );
    }
    return (
      <>
        <h1>Manage meals</h1>
        <p>
          <strong>
            <Link to="/add-meal">+ Add new meal</Link>
          </strong>
        </p>
        {content}
      </>
    );
  }
}

export default protectedComponent(AdminListMeals, ['admin']);
