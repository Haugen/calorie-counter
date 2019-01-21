import React, { Component } from 'react';

import { Router, Link } from '@reach/router';

import Toolbar from './components/Toolbar/Toolbar';
import Modal from './components/Modal/Modal';
import SignupPage from './pages/Signup/Signup';
import LoginPage from './pages/Login/Login';

class App extends Component {
  state = {
    authenticated: false,
    token: null,
    userId: null,
    messages: []
  };

  setMessages = messages => {
    if (!Array.isArray(messages)) {
      messages = [messages];
    }

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

  handleSuccessfulSignup = () => {
    this.setMessages([
      {
        type: 'success',
        message: 'Woho! You successfully created an account. You can now login!'
      }
    ]);
  };

  componentDidMount() {
    if (localStorage.getItem('userId')) {
      this.setState({
        ...this.state,
        authenticated: true,
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId')
      });
    }
  }

  handleSuccessfulLogin = userData => {
    this.setState({
      ...this.state,
      authenticated: true,
      token: userData.data.token,
      userId: userData.data.userId
    });

    localStorage.setItem('token', userData.data.token);
    localStorage.setItem('userId', userData.data.userId);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    this.setAutoLogout(remainingMilliseconds);
  };

  logoutHandler = () => {
    this.setState({
      authenticated: false,
      token: null,
      userId: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  test = async () => {
    const response = await fetch('http://localhost:3001/meals', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.state.token
      }
    });

    console.log(await response.json());
  };

  render() {
    let pageContent;

    if (!this.state.authenticated) {
      pageContent = (
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
            onSuccess={this.handleSuccessfulLogin}
            path="/"
          />
        </Router>
      );
    } else {
      pageContent = 'Logged in!';
    }

    return (
      <>
        <Toolbar auth={this.state.authenticated} logout={this.logoutHandler} />

        {this.state.messages.length > 0 ? (
          <Modal messages={this.state.messages} onClose={this.clearMessages} />
        ) : null}

        <button onClick={this.test}>Only for auth!</button>

        <div className="container">
          <div className="col-12">
            <Link to="/">
              <h1>Calorie Counter!</h1>
            </Link>
            {pageContent}
          </div>
        </div>
      </>
    );
  }
}

export default App;
