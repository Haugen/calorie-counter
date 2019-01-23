import React, { Component } from 'react';

import { Redirect } from '@reach/router';

import cFetcher from '../../util/fetch';

const protectedComponent = (WrappedComponent, allowedRoles) => {
  return class extends Component {
    state = {
      isAllowed: false,
      loading: true
    };

    async componentDidMount() {
      const result = await cFetcher(
        '/user/auth',
        'GET',
        null,
        this.props.token
      );

      if (allowedRoles.indexOf(result.data.role) > -1) {
        this.setState({
          isAllowed: true
        });
      }

      this.setState({
        loading: false
      });
    }

    render() {
      if (this.state.isAllowed) {
        return <WrappedComponent test={42} {...this.props} />;
      }
      if (!this.state.loading && !this.state.isAllowed) {
        return <Redirect noThrow to="/" />;
      }
      return null;
    }
  };
};

export default protectedComponent;
