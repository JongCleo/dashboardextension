import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'


class App extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
      date = today.toLocaleString('en-us', { month: 'long' }) + " " + today.getDate() + " " + today.getFullYear();

    this.state = {
      currentdate: date
    }
  }
  render() {
    return (

      <div className = "wrapper">
        <Navbar />

        <div className = "main">
        </div>
      </div>
    );
  }
}

export default App;
