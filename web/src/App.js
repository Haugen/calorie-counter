import React, { Component } from 'react';

import { Router, Link } from '@reach/router';

import Toolbar from './components/Toolbar';
import Modal from './components/Modal';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import EditMealPage from './pages/EditMeal';
import ListMealsPage from './pages/ListMeals';

class App extends Component {
  state = {
    authenticated: false,
    token: null,
    userId: null,
    messages: [],
    authLoading: false
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
      userId: userData.data.userId,
      authLoading: true
    });

    localStorage.setItem('token', userData.data.token);
    localStorage.setItem('userId', userData.data.userId);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    this.setAutoLogout(remainingMilliseconds);
    this.setState({ authLoading: false });
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

  isAuth = () => {
    const storageToken = localStorage.getItem('token');
    const stateToken = this.state.token;
    return stateToken !== null && storageToken === stateToken;
  };

  render() {
    let pageContent;

    if (!this.state.loading) {
      if (!this.isAuth()) {
        pageContent = (
          <Router>
            <SignupPage
              setMessages={this.setMessages}
              onSuccess={this.handleSuccessfulSignup}
              path="signup"
            />
            <LoginPage
              setMessages={this.setMessages}
              onSuccess={this.handleSuccessfulLogin}
              path="/"
            />
          </Router>
        );
      } else {
        pageContent = (
          <Router>
            <EditMealPage
              token={this.state.token}
              setMessages={this.setMessages}
              path="/add-meal"
              editMode={false}
            />
            <EditMealPage
              token={this.state.token}
              setMessages={this.setMessages}
              path="/edit-meal/:id"
              editMode={true}
            />
            <ListMealsPage
              token={this.state.token}
              setMessages={this.setMessages}
              path="/"
            />
          </Router>
        );
      }
    } else {
      pageContent = null;
    }

    return (
      <>
        <Toolbar auth={this.isAuth()} logout={this.logoutHandler} />

        {this.state.messages.length > 0 ? (
          <Modal messages={this.state.messages} onClose={this.clearMessages} />
        ) : null}

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
