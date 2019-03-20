import React, { Component } from 'react';
import './Grid.css';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

class ChartCard extends Component {

  determineGraph = (props) => {

      if (props.graphType === "finance"){
        const COLORS = ['#00C49F', '#F08080'];
        return(
          <ResponsiveContainer className="graphContainer" width='80%' height="80%">
          <BarChart data={props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="account" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#82ca9d">
              {
                props.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                ))
              }
            </Bar>
          </BarChart>
          </ ResponsiveContainer>
        )
      }
      else if(props.graphType === "productivity"){
        const COLORS = ['#00C49F', '#F08080', '#FFBB28'];
        return(

          <ResponsiveContainer className="graphContainer" width='80%' height="80%">
            <BarChart data={props.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time_type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#82ca9d">
                {
                  props.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                  ))
                }
              </Bar>
            </BarChart>
          </ ResponsiveContainer>
        )
      }
      else{
        const COLORS = ['#85C1E9', '#5DADE2', '#3498DB','#21618C'];
        return(
          <ResponsiveContainer className="graphContainer" width='80%' height="80%">
            <BarChart data={props.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sleep_type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="minutes" fill="#82ca9d">
                {
                  props.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                  ))
                }
              </Bar>
            </BarChart>
          </ ResponsiveContainer>
        )
      }
  }

  render() {
    return (
      <div className = "grid-item">
        {this.determineGraph(this.props.chartData)}
      </div>
    )
  }
};

class Grid extends Component {

  // The order of the json objects should be correct to pass sequentially
  render(){
    const finGraphData = {
        "graphType": "finance",
        "data": [
          {
            "account": "Income",
            "amount": 2543
          },
          {
            "account": "Expenses",
            "amount": 120
          }
        ]
    }
    const prodGraphData = {
      "graphType": "productivity",
      "data": [
        {
          "time_type": "productive",
          "hours": 3.11
        },
        {
          "time_type": "distracting",
          "hours": 0.53
        },
        {
          "time_type": "neutral",
          "hours": 2.1
        }
      ]
    }
    const sleepGraphData = {
      "graphType": "sleep",
      "data": [
        {
          "sleep_type": "wake",
          "minutes": 15
        },
        {
          "sleep_type": "light",
          "minutes": 120
        },
        {
          "sleep_type": "rem",
          "minutes": 65
        },
        {
          "sleep_type": "deep",
          "minutes": 220
        }
      ]
    }
    return(
      <div className = "grid">
        <ChartCard chartData={finGraphData}/>
        <ChartCard chartData={prodGraphData}/>
        <ChartCard chartData={sleepGraphData}/>
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

*/
