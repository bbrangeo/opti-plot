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
          <Grid item xs={12} md={6}>
            <h3>Optimized Crop Configuration</h3>
            {
              crops ? crops.map( crop => {
                return (
                  <div>
                    <h4>{crop.name}</h4>
                    <p>{crop.sunRequirements}</p>
                  </div>

                )
              }) : ''
            }
          </Grid>
          <Grid item xs={12} md={6} className='plot-container'>
            <div className="display-plot" style={{width: plot.length * 10 + '%', height: plot.width * 10 + '%',}}>
              {
                crops ? crops.map( crop => {
                  return <Icon src={crop.icon} size={20} />
                }) : plot.width*(<p>&nbsp;</p>)
              }
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}
