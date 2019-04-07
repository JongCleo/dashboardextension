import React, { Component } from 'react';
import './Grid.css';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const graphDrawer = (props) => {
  
  if(props.graph_type === "productivity"){
    const COLORS = ['#00C49F', '#F08080', '#FFBB28'];
    return(
      <ResponsiveContainer className="graphContainer" width='80%' height="80%">
        <BarChart data={props.data[0].snapshot}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d">
            {
              props.data[0].snapshot.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]}/>
              ))
            }
          </Bar>
        </BarChart>
      </ ResponsiveContainer>
    )
  }
  // else{
  //   const COLORS = ['#85C1E9', '#5DADE2', '#3498DB','#21618C'];
  //   return(
  //     <ResponsiveContainer className="graphContainer" width='80%' height="80%">
  //       <BarChart data={props.data}>
  //         <CartesianGrid strokeDasharray="3 3" />
  //         <XAxis dataKey="sleep_type" />
  //         <YAxis />
  //         <Tooltip />
  //         <Bar dataKey="minutes" fill="#82ca9d">
  //           {
  //             props.data.map((entry, index) => (
  //               <Cell key={`cell-${index}`} fill={COLORS[index]}/>
  //             ))
  //           }
  //         </Bar>
  //       </BarChart>
  //     </ ResponsiveContainer>
  //   )
  // }
}

const Grid = (props) => (
  <div className = "grid">
  {(props.dashData).map(function(graph, index){
    return(<div className = "grid-item">
      {graphDrawer(graph)}
    </div>)
  })}
  </div>
)

export default Grid;
