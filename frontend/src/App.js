import React, { Component } from 'react';
import axios from 'axios';
import ls from 'local-storage'

import './App.css';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
import LoggedOut from './components/LoggedOut'
axios.defaults.withCredentials = true;


class App extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
      date = today.toLocaleString('en-us', { month: 'long' }) + " " + today.getDate() + " " + today.getFullYear();

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogin.bind(this);
    this.state = {
      currentDate: date,
      loggedIn: ls.get('loggedIn') || false,
      dashData: []
    }

  }
  handleLogin(loggedIn, dashData) {
    this.setState({
      loggedIn: loggedIn,
      dashData: dashData
    })
  }
  handleLogout(loggedIn){
    this.setState({
      loggedIn: loggedIn
    })
  }
  componentDidMount(){
    if(this.state.loggedIn){

      axios.get('http://localhost:4000/api/user/alldata?date='
      +formatDate(this.state.currentDate))
      .then(res=> {
        console.log("component did mout:"+res)
        this.setState({dashData: res.data})
      })
    }
  }

  renderContent(){

    if(this.state.loggedIn){
      return(
        <div className = "wrapper">
          <Navbar
            onLogoutChange={this.handleLogout}
            currentDate={this.state.currentDate}
          />
          <Grid
            dashData={this.state.dashData}/>
        </div>
      )
    }
    else {
      return(
        <LoggedOut
          onLoginChange={this.handleLogin}
        />
      )
    }
  }
  render() {
    return (
      this.renderContent()
    );
  }
}


function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + (d.getDate()-1),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export default App;
