import React, { Component } from 'react';
import axios from 'axios';
import { Icon } from '../Icon'
import { Grid, Button } from '@material-ui/core';

export class Plot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plot: this.props.plot
    }
  }

  // componentDidMount() {
  //   axios.get(`/plots/${this.props.plot}`)
  //     .then( response => {
  //       this.setState({
  //         plot: response.data
  //       })
  //     }).catch( err => console.log(err))
  // }
  
  render() {
    const plot = this.state.plot ? this.state.plot : ''
    const crops = this.state.plot.crops ? this.state.crops : ''


    return(
      <div class="dash-box">
        <Grid container spacing={16} >
        <h1>{plot.name}</h1>
          <Grid item xs={12}>
            <h3>Plot Specs</h3>
            <h4>{plot.season}</h4>
            <p>Dimensions: {plot.length} X {plot.width}</p>
          </Grid>
          <Grid item xs={12}>
            <h3>Optimized Crop Configuration</h3>
            {
              crops ? crops.map( crop => {
                return (
                  <div>
                    <h4>{crop.name}</h4>
                    <p>{crop.sunRequirements}</p>
                    <Icon src={crop.icon} size={30} />
                  </div>

                )
              }) : ''
            }
          </Grid>
          <Grid item xs={12}>

          </Grid>
        </Grid>
      </div>
    )
  }
}
