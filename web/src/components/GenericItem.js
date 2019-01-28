import React from 'react';

import { Link } from '@reach/router';
import { dateForDisplay } from '../util/helpers';

const GenericItem = props => {
  if (props.content === 'user') {
    const editUrl = '/user-settings/' + props.userId;
    return (
      <div>
        E-mail: {props.email}, Calories: {props.calories}, Role: {props.role}
        <Link className="btn btn-secondary btn-sm" to={editUrl}>
          Edit
        </Link>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => props.onDelete(props.userId)}
        >
          Delete
        </button>
      </div>
    );
  }

  if (props.content === 'meal') {
    const editUrl = '/edit-meal/' + props.mealId;

    return (
      <div>
        Text: {props.text}, Calories: {props.calories}, Date:{' '}
        {dateForDisplay(props.date)}, User: {props.user.email}
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
