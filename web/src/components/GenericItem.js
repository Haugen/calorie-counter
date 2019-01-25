import React from 'react';

import { Link } from '@reach/router';

const GenericItem = props => {
  if (props.content === 'user') {
    return (
      <div>
        E-mail: {props.email}, Calories: {props.calories}, UserId:{' '}
        {props.userId}
      </div>
    );
  }

  if (props.content === 'meal') {
    const editUrl = '/edit-meal/' + props.mealId;

    return (
      <div>
        Text: {props.text}, Calories: {props.calories}, MealId: {props.mealId},
        Date: {props.date}, User: {props.user.email}
        <Link className="btn btn-secondary btn-sm" to={editUrl}>
          Edit
        </Link>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => props.onDelete(props.mealId)}
        >
          Delete
        </button>
      </div>
    );
  }

  return null;
};

export default GenericItem;
