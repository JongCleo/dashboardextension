import React, { Component } from 'react';
import './Grid.css';


const ChartCard = (props) => {
  return (
    <div className = "grid-item">

    </div>
  )
};

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render(){
    return(
      <div className = "grid">
        <ChartCard />
        <ChartCard />
        <ChartCard />
        <ChartCard />
        <ChartCard />
        <ChartCard />
      </div>
    )
  };
}

export default Grid;
