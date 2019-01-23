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
      if (this.props.token) {
        const result = await cFetcher(
          '/user/auth',
          'GET',
          null,
          this.props.token
        );

        if (result.hasError) {
          return this.setState({
            loading: false
          });
        }

        if (allowedRoles.indexOf(result.data.role) > -1) {
          return this.setState({
            isAllowed: true,
            loading: false
          });
        }
      }

      this.setState({
        loading: false
      });
    }

    render() {
      if (this.state.isAllowed) {
        return <WrappedComponent {...this.props} />;
      }
      if (!this.state.loading && !this.state.isAllowed) {
        return <Redirect noThrow to="/" />;
      }
      return null;
    }
  };
};

export default protectedComponent;
