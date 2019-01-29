import React from 'react';

import { Link } from '@reach/router';
import { dateForDisplay } from '../util/helpers';

const GenericItem = props => {
  if (props.content === 'user') {
    const editUrl = '/user-settings/' + props.userId;
    return (
      <tr>
        <td>{props.email}</td>
        <td>{props.role}</td>
        <td>{props.calories}</td>
        <td>
          <Link className="btn btn-secondary btn-sm" to={editUrl}>
            Edit
          </Link>
        </td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => props.onDelete(props.userId)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }

  if (props.content === 'meal') {
    const editUrl = '/edit-meal/' + props.mealId;
    const text =
      props.text.length > 30 ? props.text.substring(0, 25) + '...' : props.text;

    return (
      <tr>
        <td>{props.user.email}</td>
        <td>{text}</td>
        <td>{props.calories}</td>
        <td>{dateForDisplay(props.date)}</td>
        <td>
          <Link className="btn btn-secondary btn-sm" to={editUrl}>
            Edit
          </Link>
        </td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => props.onDelete(props.mealId)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }

  return null;
};

export default GenericItem;
