import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import ls from 'local-storage'
import axios from 'axios';
import config from '../credentials.json'
import './LoggedOut.css';
axios.defaults.withCredentials = true;

class LoggedOut extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(loggedIn, dashData) {
    this.props.onLoginChange(loggedIn, dashData)
  }
  render() {
    const succeedLogin = (response) => {
      axios.post('http://localhost:4000/api/user/create',{
        email: response.profileObj.email,
        name: response.profileObj.givenName + " "+ response.profileObj.familyName
      }).then((res) => {
        this.handleChange(true, res.data)
        ls.set('loggedIn', true)
      })
    }
    const failLogin = (response) => {
      console.log(response);
    }
    return (

      <div className = "wrapper">
        <div className = "welcome-card">
          <div className="logoholder">
            <img src="./assets/birdseye.png"/>
          </div>
          <h1> Birdseye New Tab</h1>

          <GoogleLogin
            clientId={config.web.client_id}
            onSuccess={succeedLogin}
            onFailure={failLogin}
          >
            <span> Login with Google</span>
          </GoogleLogin>
        </div>
      </div>
    )
  }
}

export default LoggedOut;
