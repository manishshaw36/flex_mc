import React, { Component } from 'react';
import Hoc from '../src/container/hoc';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Hoc />
      </div>
    );
  }
}

export default App;
