import React, { Component } from 'react';

import protectedComponent from '../../components/hoc/protectedComponent';
import cFetcher from '../../util/fetch';

class ListUsers extends Component {
  state = {
    users: [],
    loading: true
  };

  async componentDidMount() {
    const result = await cFetcher(
      '/admin/users',
      'GET',
      null,
      this.props.token
    );

    if (result.hasError) {
      this.props.setMessages(result.errorMessages);
    }

    this.setState({
      loading: false,
      users: result.data.users
    });
  }

  render() {
    return <>Managers and admins only!</>;
  }
}

export default protectedComponent(ListUsers, ['manager', 'admin']);
