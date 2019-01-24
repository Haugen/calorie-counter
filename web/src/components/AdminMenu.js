import React from 'react';

import { Link } from '@reach/router';

const AdminToolbar = props => {
  let userLink, mealLink;

  if (['manager', 'admin'].indexOf(props.role) > -1) {
    userLink = (
      <li className="nav-item">
        <Link className="nav-link" to="/admin/users">
          Manage users
        </Link>
      </li>
    );

    if (props.role === 'admin') {
      mealLink = (
        <li className="nav-item">
          <Link className="nav-link" to="/admin/meals">
            Manage meals
          </Link>
        </li>
      );
    }

    return (
      <>
        {userLink}
        {mealLink}
      </>
    );
  } else {
    return null;
  }
};

export default AdminToolbar;
