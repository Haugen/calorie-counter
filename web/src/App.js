import React, { Component } from 'react';

import { Router, navigate } from '@reach/router';

import Toolbar from './components/Toolbar';
import Modal from './components/Modal';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import EditMealPage from './pages/EditMeal';
import ListMealsPage from './pages/ListMeals';
import UserSettingsPage from './pages/UserSettings';
import AdminListUsersPage from './pages/admin/ListUsers';
import AdminListMealsPage from './pages/admin/ListMeals';
import AdminAddUserPage from './pages/admin/AddUser';

import './styles/style.scss';

class App extends Component {
  state = {
    token: null,
    userId: null,
    userRole: null,
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
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        userRole: localStorage.getItem('userRole')
      });
    }
  }

  handleSuccessfulLogin = userData => {
    this.setState({
      token: userData.data.token,
      userId: userData.data.userId,
      userRole: userData.data.userRole,
      authLoading: true
    });

    localStorage.setItem('token', userData.data.token);
    localStorage.setItem('userId', userData.data.userId);
    localStorage.setItem('userRole', userData.data.userRole);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    this.setAutoLogout(remainingMilliseconds);
    this.setState({ authLoading: false });
  };

  logoutHandler = () => {
    this.setState({
      token: null,
      userId: null,
      userRole: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');

    navigate('/');
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
              path="*"
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
              userRole={this.state.userRole}
            />
            <EditMealPage
              token={this.state.token}
              setMessages={this.setMessages}
              path="/edit-meal/:id"
              editMode={true}
              userRole={this.state.userRole}
            />
            <UserSettingsPage
              token={this.state.token}
              userId={this.state.userId}
              setMessages={this.setMessages}
              path="/user-settings/:id"
            />
            <AdminListUsersPage
              token={this.state.token}
              setMessages={this.setMessages}
              path="admin/users"
            />
            <AdminListMealsPage
              token={this.state.token}
              setMessages={this.setMessages}
              path="admin/meals"
            />
            <AdminAddUserPage
              setMessages={this.setMessages}
              path="admin/add-user"
              token={this.state.token}
            />
            <ListMealsPage
              token={this.state.token}
              setMessages={this.setMessages}
              path="*"
            />
          </Router>
        );
      }
    } else {
      pageContent = null;
    }

    return (
      <>
        <Toolbar
          auth={this.isAuth()}
          userId={this.state.userId}
          role={this.state.userRole}
          logout={this.logoutHandler}
        />

        {this.state.messages.length > 0 ? (
          <Modal messages={this.state.messages} onClose={this.clearMessages} />
        ) : null}

        <div className="container page-content">
          <div className="col-12 col-xl-10 offset-xl-1">{pageContent}</div>
        </div>

        <footer className="small footer">
          Calorie Counter, made with love and hunger!
        </footer>
      </>
    );
  }
}

export default App;
