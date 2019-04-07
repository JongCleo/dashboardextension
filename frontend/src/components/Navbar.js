import React, { Component } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight, FaRegCalendarAlt, FaCog } from 'react-icons/fa'
//https://react-icons.netlify.com/#/icons/fa
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
      date = today.toLocaleString('en-us', { month: 'long' }) + " " + today.getDate() + " " + today.getFullYear();

    this.state = {
      currentdate: date
    }
  }

  render(){
    return(
      <div className = "nav">

        <div className = "vertical-center">
          <FaChevronCircleLeft className ="nav-item clickable"/>
          <div className ="vertical-center clickable">
            <span>{this.state.currentdate}</span>
            <FaRegCalendarAlt className="calendar"/>
          </div>
          <FaChevronCircleRight className ="nav-item clickable" />
        </div>

        <div className = "vertical-center clickable">
          <FaCog className="nav-item"/>
          <span> <a href={"http://localhost:4000/settings"} target="_blank" rel="noopener noreferrer"> Settings </a></span>
        </div>
      </div>
    )
  }
}

export default Navbar;
