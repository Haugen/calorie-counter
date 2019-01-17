import React, { Component } from 'react';

import Toolbar from './components/Toolbar/Toolbar';

class App extends Component {
  render() {
    return (
      <>
        <Toolbar auth={false} />
        <div className="container">
          <div className="col-12">
            <h1>Calorie Counter!</h1>
          </div>
        </div>
      </>
    );
  }
}

export default App;
