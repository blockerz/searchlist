import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import SearchTable from './SearchTable.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Dog Breed Reference</h1>
        </header>
        <p/>
        <SearchTable />
      </div>
    );
  }
}

export default App;
