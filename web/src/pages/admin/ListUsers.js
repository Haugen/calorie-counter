import React, { Component } from 'react';

import protectedComponent from '../../components/hoc/protectedComponent';

class ListUsers extends Component {
  render() {
    return (
      <>
        Managers and admins only!
        {this.props.test}
      </>
    );
  }
}

export default protectedComponent(ListUsers, ['manager', 'admin']);
