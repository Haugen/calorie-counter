import React from 'react';

export default props => {
  if (!props.auth) return '';

  return <div>This is the toolbar!</div>;
};
