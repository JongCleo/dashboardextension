import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import ls from 'local-storage'

import config from './credentials.json'
import './App.css';
import Navbar from './components/Navbar';
import Grid from './components/Grid';
axios.defaults.withCredentials = true;


class App extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
      date = today.toLocaleString('en-us', { month: 'long' }) + " " + today.getDate() + " " + today.getFullYear();

    this.state = {
      currentDate: date,
      loggedIn: ls.get('loggedIn') || false,
      dashData: []
    }

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
      console.log(this.state.dashData)
      return(
        <div className = "wrapper">
          <Navbar />
          <Grid
            dashData={this.state.dashData}/>
        </div>
      )
    }
    else {
      const succeedLogin = (response) => {
        axios.post('http://localhost:4000/api/user/create',{
          email: response.profileObj.email,
          name: response.profileObj.givenName + " "+ response.profileObj.familyName
        }).then((res) => {
          this.setState({
            loggedIn: true,
            dashData: res.data
          })
          ls.set('loggedIn', true)
        })

      }
      const failLogin = (response) => {
        console.log(response);
      }
      return (

        <div className = "wrapper">

          <GoogleLogin
            clientId={config.web.client_id}
            onSuccess={succeedLogin}
            onFailure={failLogin}
          >
            <span> Login with Google</span>
          </GoogleLogin>
        </div>
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
