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

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.state = {
      currentDate: date,
      loggedIn: ls.get('loggedIn') || false,
      dashData: []
    }

  }
  handleLoginChange(loggedIn, dashData) {
    this.setState({
      loggedIn: loggedIn,
      dashData: dashData
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
          <Navbar />
          <Grid
            dashData={this.state.dashData}/>
        </div>
      )
    }
    else {
      return(
        <LoggedOut
          onLoginChange={this.handleLoginChange}
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
