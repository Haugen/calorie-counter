import React from 'react';

import { Link } from '@reach/router';

export default props => {
  const editUrl = `/edit-meal/${props.id}`;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-text">
          {props.text}, {props.calories}
        </p>
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
