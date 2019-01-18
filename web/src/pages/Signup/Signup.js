import React from 'react';

import { Link } from '@reach/router';

export default props => {
  return (
    <>
      <p>
        Already have an account? <Link to="/">Go login!</Link>
      </p>
      <h2>Signup</h2>
      <form onSubmit={e => props.onPost(e, 'Form data')}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </>
  );
};
