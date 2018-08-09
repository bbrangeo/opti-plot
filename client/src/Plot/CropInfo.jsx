import React, { Component } from 'react';
import { Icon } from '../Icon';
import { Grid } from '@material-ui/core';
import axios from 'axios';

export class CropInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      companions: null
    }
  }

  componentDidMount() {
    axios.get('https://openfarm.cc/api/v1/crops/54bda00e3961370003150400').then( response => {
      this.setState({
        data: response.data.data,
        companions: response.data.included
      })
    })
  }

  render() {
    const companions = this.state.companions ? this.state.companions.map((companion, i) => {
      return (
        <Grid item xs={12} lg={3} key={i}>
          <div>
            <h4>{companion.attributes.name}</h4>
            <Icon src={companion.attributes.svg_icon} size="40" />
          </div>
        </Grid>
      )
    }) : ''
    let iconString = this.state.data ? this.state.data.attributes.svg_icon : ''

    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <div className="App">
            <h1>Hello OptiPlot</h1>
            <Icon src={iconString} size="60" />
          </div>
        </Grid>
        {companions}
      </Grid>
    )
  }
}