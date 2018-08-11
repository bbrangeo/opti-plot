import React, { Component } from 'react';
import { RootContext } from '../RootContext'
import { Icon } from '../Icon';
import { Grid, Button } from '@material-ui/core';
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
    axios.get(`https://openfarm.cc/api/v1/crops/${this.props.crop}`).then( response => {
      this.setState({
        data: response.data.data,
        // companions: response.data.included
      })
    })
  }

  render() {
    const name = this.state.data ? this.state.data.attributes.name : ''
    const binomialName = this.state.data ? this.state.data.attributes.binomial_name : ''
    const description = this.state.data ? this.state.data.attributes.description : ''
    // const companions = this.state.companions ? this.state.companions.map((companion, i) => {
    //   return (
    //     <Grid item xs={12} lg={3} key={i}>
    //       <div className="companion-stub">
    //         <Icon src={companion.attributes.svg_icon} size="40" />
    //         <h4>{companion.attributes.name}</h4>
    //       </div>
    //     </Grid>
    //   )
    // }) : ''
    
    let iconString = this.state.data ? this.state.data.attributes.svg_icon : ''
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
            <h2>{name}</h2>
            <h4>{binomialName}</h4>
            <Grid container justify="center" spacing={16}>
              <Grid item xs={12} md={3}>
                <Icon src={iconString} size="100" />
              </Grid>
              <Grid item xs={12} md={9}>
                <p>{description}</p>

              </Grid>
            </Grid>
        </Grid>
        
        {/* todo: companion => {companions} */}
      </Grid>
    )
  }
}