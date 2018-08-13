import React, { Component } from 'react';
import axios from 'axios';
import DashList from '../DashList';
import { Button, Grid } from '@material-ui/core';

class PlotNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      season: 'Spring',
      length: '',
      width: '',
      gardenId: this.props.user.gardens[0]._id,
      message: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let plot = {
      name: this.state.name,
      season: this.state.season,
      length: this.state.length,
      width: this.state.width,
      gardenId: this.state.gardenId
    }
    if (plot.name !== '') {
      console.log(plot)
      axios.post('/plots', plot).then(
        response => {
          this.props.updateUser();
          console.log(response)
          this.setState({
            message: "Plot added!"
          })
        }
      ).catch( err => this.setState({message: err}))
      this.setState({ 
        name: '',
        season: 'Spring',
        length: '',
        width: '',
        gardenId: this.props.user.gardens[0]._id,
        message: '' 
      })
      // this.props.history.push('/gardens')
    } else {
      this.setState({ message: "Please enter a valid plot name" })
    }

  }

  render() {
    const gardenOptions = this.props.user.gardens.map( garden => <option value={garden._id}>{garden.name}</option>)
    return (
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <div>
            <p>{this.state.message}</p>
            <label htmlFor="name">{"name".toUpperCase()}
              <input type="text" name="name" onChange={this.handleChange} value={this.state.name}/> <br/></label>
            <label htmlFor="length">{"length".toUpperCase()}
              <input type="text" name="length" onChange={this.handleChange} value={this.state.length}/> <br/></label>
            <label htmlFor="width">{"width".toUpperCase()}
              <input type="text" name="width" onChange={this.handleChange} value={this.state.width}/> <br/></label>
            <select name="gardenId" onChange={this.handleChange}>
              {gardenOptions}
            </select>
            <select name="season" onChange={this.handleChange}>
              <option selected="selected" value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
            </select>
            <Button onClick={this.handleSubmit} variant="contained" color="primary">Add Plot</Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <DashList user={this.props.user} />
        </Grid>
      </Grid>
    )
  }
}

export default PlotNew;