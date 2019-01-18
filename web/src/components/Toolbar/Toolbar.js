import React from 'react';

export default props => {
  if (!props.auth) return '';

  return (
    <div>
      Logged in toolbar! <button onClick={props.logout}>Logout</button>
    </div>
  );
};
