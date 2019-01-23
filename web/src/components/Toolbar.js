import React from 'react';

import { Link } from '@reach/router';

import AdminMenu from './AdminMenu';

export default props => {
  if (!props.auth) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Calorie Counter
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#toolbar"
        aria-controls="toolbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="toolbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              My meals
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add-meal">
              + Add meal
            </Link>
          </li>
          <AdminMenu role={props.role} />
          <li className="nav-item">
            <button onClick={props.logout} className="nav-link btn btn-link">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
