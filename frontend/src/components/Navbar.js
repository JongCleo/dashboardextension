import React, { Component } from 'react';
import { GoogleLogout } from "react-google-login";
import ls from 'local-storage'
import { FaChevronCircleLeft, FaChevronCircleRight, FaRegCalendarAlt, FaCog } from 'react-icons/fa'
import './Navbar.css';
import config from '../credentials.json'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(loggedOut) {
    this.props.onLogoutChange(loggedOut)
  }

  render(){
    const successLogout = () => {

      ls.set('loggedIn', false)
      this.handleChange(false)
    }
    return(
      <div className = "nav">

        <div className = "vertical-center">
          {/*<FaChevronCircleLeft className ="nav-item clickable"/>*/}

          <div className ="vertical-center clickable">
            <span>{this.props.currentDate}</span>
            <FaRegCalendarAlt className="calendar"/>
          </div>
          {/*<FaChevronCircleRight className ="nav-item clickable" />*/}
        </div>


        <div className = "vertical-center clickable">
          <FaCog className="nav-item"/>
          <span> <a href={"http://localhost:4000/settings"} target="_blank" rel="noopener noreferrer"> Settings </a></span>
        </div>
        <div onClick={successLogout}> <GoogleLogout buttonText="Logout" /></div>

      </div>
    )
  }
}


export default Navbar;
