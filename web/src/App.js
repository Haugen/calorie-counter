import React, { Component } from 'react';

import { Router, Link } from '@reach/router';

import Toolbar from './components/Toolbar/Toolbar';
import SignupPage from './pages/Signup/Signup';
import LoginPage from './pages/Login/Login';

class App extends Component {
  handleLogin = (event, formData) => {
    event.preventDefault();
    console.log(formData);
  };

  render() {
    return (
      <>
        <Toolbar auth={false} />
        <div className="container">
          <div className="col-12">
            <Link to="/">
              <h1>Calorie Counter!</h1>
            </Link>
            <Router>
              <SignupPage onPost={this.handleSignup} path="signup" />
              <LoginPage onPost={this.handleLogin} path="/" />
            </Router>
          </div>
        </div>
      </>
    );
  }
}

export default App;
