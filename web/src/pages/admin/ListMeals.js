import React, { Component } from 'react';

import protectedComponent from '../../components/hoc/protectedComponent';
import cFetcher from '../../util/fetch';
import GenericList from '../../components/GenericList';

class AdminListMeals extends Component {
  state = {
    meals: []
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
      meals: result.data.meals
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
    return (
      <>
        <h1>Manager meals</h1>
        <p>+ Add new meal</p>
        <GenericList
          content="meals"
          meals={this.state.meals}
          onDelete={this.handleDelete}
        />
      </>
    );
  }
}

export default protectedComponent(AdminListMeals, ['admin']);
