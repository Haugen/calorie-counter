import React, { Component } from 'react';

import { Link } from '@reach/router';

import protectedComponent from '../../components/hoc/protectedComponent';
import cFetcher from '../../util/fetch';
import GenericList from '../../components/GenericList';

class AdminListUsers extends Component {
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
      return this.props.setMessages(result.errorMessages);
    }

    this.setState({
      users: result.data.users,
      loading: false
    });
  }

  handleDelete = async userId => {
    const result = await cFetcher(
      '/user/' + userId,
      'DELETE',
      null,
      this.props.token
    );

    if (result.hasError) {
      return this.props.setMessages(result.errorMessages);
    }

    const newUsers = this.state.users.filter(user => {
      return user._id !== userId;
    });

    this.setState({
      users: newUsers
    });
  };

  render() {
    let content;

    if (this.state.loading) {
      content = 'Loading...';
    } else {
      content = (
        <GenericList
          content="users"
          users={this.state.users}
          onDelete={this.handleDelete}
        />
      );
    }
    return (
      <>
        <h1>Manage users</h1>
        <p>
          <strong>
            <Link to="/admin/add-user">+ Add new user</Link>
          </strong>
        </p>
        {content}
      </>
    );
  }
}

export default protectedComponent(AdminListUsers, ['manager', 'admin']);
