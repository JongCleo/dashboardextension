import React, { Component } from 'react';
import './Grid.css';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
var moment = require('moment');

function fixTime(tickItem) {
  return moment(tickItem).utcOffset(4).format('MM-DD')
}
function fixString(tickItem){
  return tickItem.split('_')[0]
}
function addPer(tickItem){
  return tickItem+"%"
}
function addHours(value){
  return value+" h"
}

const graphDrawer = (props) => {
  let colors = [];
  switch(props.graph_type){
    case "productivity" :
      colors = ['#00C49F', '#FFBB28','#F08080'];
      return(
        <ResponsiveContainer className="graphContainer" width='90%' height="70%">
          <BarChart data={props.data[0].snapshot}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tickFormatter={fixString} />
            <YAxis />
            <Tooltip labelFormatter={fixString} formatter={addHours}/>
            <Bar dataKey="value" fill="#82ca9d">
              {
                props.data[0].snapshot.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]}/>
                ))
              }
            </Bar>
          </BarChart>
        </ ResponsiveContainer>
      )
    case "sleep" :
      colors = ['#85C1E9', '#5DADE2', '#3498DB','#21618C'];
      return(
        <ResponsiveContainer className="graphContainer" width='90%' height="70%">
          <BarChart data={props.data[0].snapshot}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip formatter={addHours}/>
            <Bar dataKey="value" fill="#82ca9d">
              {
                props.data[0].snapshot.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]}/>
                ))
              }
            </Bar>
          </BarChart>
        </ ResponsiveContainer>
      )
    default:
      
      return(
        <ResponsiveContainer className="graphContainer" width='90%' height="70%">
          <LineChart data={props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={fixTime} padding={{left:10}}/>
            <YAxis tickFormatter={addPer} domain={[0,100]}/>
            <Tooltip labelFormatter={fixTime} formatter={addPer}/>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ ResponsiveContainer>
      )
  }
}

const getImage = (props) => {
  switch(props.graph_type){
    case "productivity":
      return <div className="imgparent"> <img src="./assets/rescuetime.png" alt="logo"/> </div>
    case "sleep":
      return <div className="imgparent"> <img src="./assets/fitbit.png" alt="logo"/> </div>
    default:
      return <div className="sheets"> <img src='./assets/sheets.png' alt="logo"/></div>
  }
}

const Grid = (props) => (
  <div className = "grid">
  {(props.dashData).map(function(graph, index){
    return(
      <div className = "grid-item">
        <div className = "titlebox">
          {getImage(graph)}
          <span>{graph.graph_type}</span>
        </div>
        {graphDrawer(graph)}
      </div>
    )
  })}
  </div>
)

export default Grid;
