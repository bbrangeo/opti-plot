import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import { Icon } from '../Icon';

export class CropSearchResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
      gardens: [],
    }
    this.addToGarden = this.addToGarden.bind(this)
  }

  componentDidMount() {
    this.setState({
      gardens: this.props.user.gardens
    })
    axios.get(`https://openfarm.cc/api/v1/crops/${this.props.crop}`).then(response => {
      this.setState({
        result: response.data.data,
      })
    }).catch( err => console.log(err));
  }

  addToGarden(e) {
    e.preventDefault();
    console.log('TARGET',e.currentTarget);
    let cropToAdd = {
      name: this.state.result.attributes.name,
      spread: this.state.result.attributes.spread,
      rowSpacing: this.state.result.attributes.row_spacing,
      icon: this.state.result.attributes.svg_icon,
      ofId: this.state.result.id,
      sunRequirements: this.state.result.attributes.sun_requirements,
    }
    console.log("CROP",cropToAdd);
    axios.put(e.currentTarget.href, cropToAdd).then( response => {
      console.log("RESPONSE", response)
    }).catch( err => console.error(err))
    
  }

  render() {
    const name = this.state.result ? this.state.result.attributes.name : ''
    const binomialName = this.state.result ? this.state.result.attributes.binomial_name : ''
    const description = this.state.result ? this.state.result.attributes.description : ''
    let iconString = this.state.result ? this.state.result.attributes.svg_icon : ''
    const gardens = this.props.user.gardens.map(garden => <Button href={`/gardens/${garden._id}/addcrop`} variant="contained" color="primary" onClick={this.addToGarden} children={`Add to ${garden.name}`} />)
    // console.log(this.props.user)
    return (
      <div className="dash-box">
        <Grid container spacing={16} justify="center">
          <Grid item xs={3}>
            <Icon src={iconString} size="100" />
          </Grid>
          <Grid item xs={9}>
            <h2>{name}</h2>
            <h4>{binomialName}</h4>
            <p>{description}</p>
          </Grid>
          <Grid item xs={12}>
            <div className="add-to-gardens">
              {gardens}
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}
