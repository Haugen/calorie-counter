import React, { Component } from 'react';

import protectedComponent from '../../components/hoc/protectedComponent';
import cFetcher from '../../util/fetch';
import GenericList from '../../components/GenericList';

class AdminListUsers extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const result = await cFetcher(
      '/admin/users',
      'GET',
      null,
      this.props.token
    );

    if (result.hasError) {
      return this.props.setMessages(result.errorMessages);
    }

    this.setState({
      users: result.data.users
    });
  }

  render() {
    return (
      <>
        <h1>Manager users</h1>
        <p>+ Add new user</p>
        <GenericList content="users" users={this.state.users} />
      </>
    );
  }
}

export default protectedComponent(AdminListUsers, ['manager', 'admin']);
