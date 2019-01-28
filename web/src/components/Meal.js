import React from 'react';

import { Link } from '@reach/router';

import { dateForDisplay } from '../util/helpers';

const Meal = props => {
  const editUrl = `/edit-meal/${props.id}`;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-text">
          {props.text} {props.overDaily === true ? 'RED' : 'GREEN'}
        </p>
        <div>
          <strong>Calories: </strong>
          {props.calories}
        </div>
        <div>
          <strong>Date: </strong>
          {dateForDisplay(props.date)}
        </div>
      </div>
      <div className="card-footer text-muted">
        <Link className="btn btn-secondary btn-sm mr-2" to={editUrl}>
          Edit
        </Link>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => props.onDelete(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Meal;
