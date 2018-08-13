import React, { Component } from 'react';
import axios from 'axios';
import { Icon } from '../Icon'
import { Grid, Button } from '@material-ui/core';

export class Plot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plot: null,
      crops: null,
    }
  }

  componentDidMount() {
    axios.get(`/plots/${this.props.plot._id}`)
      .then( response => {
        this.setState({
          plot: response.data,
          crops: response.data.crops
        })
      }).catch( err => console.log(err))
  }
  
  render() {
    const plot = this.state.plot ? this.state.plot : null
    const crops = this.state.crops ? this.state.crops.map(crop => {
      return (
        <div>
          <h4>{crop.name}</h4>
          <Icon src={crop.icon} size={30} />
          <p>{crop.sunRequirements}</p>
        </div>
      )
    }) : ''
    
    let plotSpace = '' // reserve for crop display

    const display = this.state.plot ? (
      <div class="dash-box">
        <Grid container spacing={16} >
          <h1>{plot.name}</h1>
          <Grid item xs={12}>
            <h3>Plot Specs</h3>
            <h4>{plot.season}</h4>
            <p>Dimensions: {plot.length} X {plot.width}</p>
          </Grid>
          <Grid item xs={12} md={6}>
            <h3>Optimized Crop Configuration</h3>
            {crops}
          </Grid>
          <Grid item xs={12} md={6} className='plot-container'>
            <div className="display-plot" style={{ width: plot.length + 'em', height: plot.width + 'em', }}>
              {plotSpace}
            </div>
          </Grid>
        </Grid>
      </div>
    ) : '' ;


    return(
      <div>
        {display}
      </div>
    )
  }
}
