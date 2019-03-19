import React, { Component } from 'react';
import './Grid.css';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const graphData = {
    "graphType": "finance",
    "data": [
      {
        "account": "Income",
        "amount": 4000
      },
      {
        "account": "Expenses",
        "amount": 2210
      }
    ]
  }

class ChartCard extends Component {

  determineGraph = (props) => {

      if (props.graphType === "finance"){

      return(
        <ResponsiveContainer className="graphContainer" width='80%' height="80%">
        <BarChart data={props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="account" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#82ca9d" />
        </BarChart>
        </ ResponsiveContainer>
      )
    }
  }

  render() {
    return (
      <div className = "grid-item">
        {this.determineGraph(graphData)}
      </div>
    )
  }
};

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // The order of the json objects should be correct to pass sequentially
  render(){
    return(
      <div className = "grid">
        <ChartCard />

      </div>
    )
  };
}

export default Grid;
/*
TODO:
- empty card shouldn't respond to hover
- put the plus symbol by the next available card up until card 6
- Finance:  category: Number,//minutes pend: Number,//minutes
- Meditation: minutes meditated
- productive_time: Number,//minutes
- neutral_time: Number,//minutes
- distracted_time: Number,//minutes

*/
