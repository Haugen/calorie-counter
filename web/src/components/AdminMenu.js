import React from 'react';

import { Link } from '@reach/router';

const AdminToolbar = props => {
  if (['manager', 'admin'].indexOf(props.role) > -1) {
    return (
      <li className="nav-item">
        <Link className="nav-link" to="/admin/users">
          Manage users
        </Link>
      </li>
    );
  } else {
    return null;
  }
};

export default AdminToolbar;
