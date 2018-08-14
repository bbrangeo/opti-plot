import React, { Component } from 'react';
import DashList from '../DashList';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';

class GardenNew extends Component {
  state = {
    name: '',
    message: ''
  }

  handleChange = (e) => {
    let name = e.target.value;
    this.setState({name})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let garden = {name: this.state.name, userId: this.props.user._id}
    if ( garden.name !== '') {
      axios.post('/gardens', garden).then( 
        response => {
          this.props.updateUser();
          console.log(response)
        }
      )
      this.setState({name: '', message: ''})
    } else {
      this.setState({message: "Please enter a valid garden name"})
    }
  }

  render() {
    return (
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <div>
            <h3>New Garden</h3>
            <p>{this.state.message}</p>
            <input name="name" type="text" onChange={this.handleChange} />
            &nbsp;&nbsp;
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>Add a Garden</Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <DashList user={this.props.user} />
        </Grid>
      </Grid>
    )
  }
}

export default GardenNew;