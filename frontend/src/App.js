import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className = "logged-out">
        <h1 className = "title" > Dash Extension </h1>
        <h2> Improve your life with data! </h2>

        <div className = "btn-container">
          <button className = "signup-btn">Sign Up</button>
          <button className = "login-btn">Log In</button>
        </div>

      </div>
    );
  }
}

export default App;
