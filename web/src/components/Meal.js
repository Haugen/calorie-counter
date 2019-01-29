import React from 'react';

import { Link } from '@reach/router';

import { dateForDisplay } from '../util/helpers';

const Meal = props => {
  const editUrl = `/edit-meal/${props.id}`;

  const mealStyle = {
    borderColor: props.overDaily === true ? '#d34423' : '#259123'
  };

  return (
    <div style={mealStyle} className="col-12 col-md-8 offset-md-2 card mb-3">
      <div className="card-body">
        <p className="card-text">{props.text}</p>
        <div>
          <span className="badge badge-light">Date</span>{' '}
          {dateForDisplay(props.date)}
          <br />
          <span className="badge badge-light">Calories</span> {props.calories}
        </div>
        <hr />
        <Link className="btn btn-outline-secondary btn-sm mr-2" to={editUrl}>
          Edit
        </Link>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => {
            if (
              window.confirm(
                'Are you sure you want to permanently delete this meal?'
              )
            )
              props.onDelete(props.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Meal;
