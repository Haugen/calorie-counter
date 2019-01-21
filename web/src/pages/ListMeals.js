import React, { Component } from 'react';

import Meal from '../components/Meal';
import { BASE_URL } from '../util/vars';

class Login extends Component {
  state = {
    meals: [],
    loading: true
  };

  async componentDidMount() {
    const response = await fetch(BASE_URL + '/meals', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token
      }
    });

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

  render() {
    let content;

    if (!this.state.loading && this.state.meals.length > 0) {
      content = [];
      this.state.meals.forEach(meal => {
        content.push(
          <Meal key={meal._id} text={meal.text} calories={meal.calories} />
        );
      });
    } else if (!this.state.loading) {
      content = 'No meals yet.';
    }

    return (
      <>
        <h2>My meals</h2>
        {content}
      </>
    );
  }
}

export default Login;
