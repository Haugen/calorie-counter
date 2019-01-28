import React from 'react';

import GenericItem from './GenericItem';

const GenericList = props => {
  let content = [];

  if (props.content === 'users') {
    props.users.forEach(user => {
      content.push(
        <GenericItem
          key={user._id}
          content="user"
          email={user.email}
          calories={user.dailyCalories}
          userId={user._id}
          onDelete={props.onDelete}
        />
      );
    });

    return content;
  }

  if (props.content === 'meals') {
    props.meals.forEach(meal => {
      content.push(
        <GenericItem
          key={meal._id}
          content="meal"
          text={meal.text}
          date={meal.date}
          calories={meal.calories}
          mealId={meal._id}
          user={meal.user}
          onDelete={props.onDelete}
        />
      );
    });

    return content;
  }

  return null;
};

export default GenericList;
