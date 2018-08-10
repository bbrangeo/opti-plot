import React, { Component } from 'react';
import { RootContext } from '../RootContext'
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
    const name = this.state.data ? this.state.data.name : ''
    const binomialName = this.state.data.binomial_name ? this.state.data.binomial_name : ''
    const description = this.state.data.description ? this.state.data.description : ''
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
              <h1>Hello {this.props.user.name}</h1>
              <h2>{name}</h2>
              <h4>{binomialName}</h4>
              <Grid container spacing={16}>
                <Grid item xs={12} md={3}>
                  <Icon src={iconString} size="60" />
                </Grid>
                <Grid item xs={12} md={9}>
                  <p>{description}</p>

                </Grid>
              </Grid>
          </div>
        </Grid>
        {companions}
      </Grid>
    )
  }
}