import React, { Component } from 'react';

import { Router, Link } from '@reach/router';

import Toolbar from './components/Toolbar/Toolbar';
import Modal from './components/Modal/Modal';
import SignupPage from './pages/Signup/Signup';
import LoginPage from './pages/Login/Login';

class App extends Component {
  state = {
    authenticated: false,
    token: '',
    userId: '',
    messages: []
  };

  setMessages = messages => {
    this.setState({
      ...this.state,
      messages: messages
    });
  };

  clearMessages = () => {
    this.setState({
      ...this.state,
      messages: []
    });
  };

  handleSuccessfulSignup = userData => {
    this.setMessages([
      {
        type: 'success',
        message: 'Woho! You successfully created an account. You can now login!'
      }
    ]);
  };

  render() {
    return (
      <>
        <Toolbar auth={this.state.authenticated} />

        {this.state.messages.length > 0 ? (
          <Modal messages={this.state.messages} onClose={this.clearMessages} />
        ) : null}

        <div className="container">
          <div className="col-12">
            <Link to="/">
              <h1>Calorie Counter!</h1>
            </Link>
            <Router>
              <SignupPage
                onPost={this.handleSignup}
                setMessages={this.setMessages}
                onSuccess={this.handleSuccessfulSignup}
                path="signup"
              />
              <LoginPage
                onPost={this.handleLogin}
                setMessages={this.setMessages}
                path="/"
              />
            </Router>
          </div>
        </div>
      </>
    );
  }
}

export default App;
