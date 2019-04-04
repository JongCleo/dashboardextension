import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

import config from './credentials.json'
import './App.css';
import Navbar from './components/Navbar';
import Grid from './components/Grid';



class App extends Component {
  constructor(props) {
    super(props);

    //call db

    var today = new Date(),
      date = today.toLocaleString('en-us', { month: 'long' }) + " " + today.getDate() + " " + today.getFullYear();

    this.state = {
      currentdate: date,
      loggedIn: true,
      productivity: null
    }
  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  componentDidMount(){
    const email = "email@email.com"
    const date = new Date(this.state.currentdate)

    axios.get('/4000/productivity?email='+email+'&date='
    +this.formatDate(date),{ crossdomain: true })
    .then(res=> {
      const productivity = res.data;
      this.setState({productivity: productivity})
    })
    console.log(this.state.productivity)
  }

  succeedLogin = (reponse) => {
    //create user if not exist
    //else update credential?
  }
  failLogin = (response) => {
    console.log(response);
  }

  renderContent(){
    if(this.state.loggedIn){
      return(
        <div className = "wrapper">
          <Navbar />
          <Grid />
        </div>
      )
    }
    else {
      return (
        <GoogleLogin
          clientId={config.web.client_id}
          onSuccess={this.succeedLogin()}
          onFailure={this.failLogin()}
        >
          <span> Login with Google</span>
        </GoogleLogin>

      )
    }
  }
  render() {
    return (
      this.renderContent()
    );
  }
}

export default App;
