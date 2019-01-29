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
          role={user.role}
          calories={user.dailyCalories}
          userId={user._id}
          onDelete={props.onDelete}
        />
      );
    });

    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">E-mail</th>
              <th scope="col">Role</th>
              <th scope="col">Daily Calories</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
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

    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Text</th>
              <th scope="col">Calories</th>
              <th scope="col">Date</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  }

  return null;
};

export default GenericList;
