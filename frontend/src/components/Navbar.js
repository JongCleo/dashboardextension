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

        <div className = "datepicker">
          <FaChevronCircleLeft className ="chevron"/>
          <span className ="datepicker-item">{this.state.currentdate}</span>
          <FaRegCalendarAlt className ="datepicker-item" />
          <FaChevronCircleRight className ="chevron" />
        </div>

        <div className = "settings">
          <FaCog />
          <span> Settings </span>
        </div>
      </div>
    )
  }
}

export default Navbar;
