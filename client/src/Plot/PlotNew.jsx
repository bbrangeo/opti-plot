import React, { Component } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

class PlotNew extends Component {
  state = {
    name: '',
    season: '',
    length: '',
    width: '',
    gardenId: this.props.user.gardens[0]._id,
    message: '',
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
          console.log(response)
          this.setState({
            message: "Plot added!"
          })
        }
      )
      this.setState({ 
        name: '',
        season: "Spring",
        length: '',
        width: '',
        gardenId: this.props.user.gardens[0]._id,
        message: '' 
      })
    } else {
      this.setState({ message: "Please enter a valid plot name" })
    }

  }

  render() {
    const gardenOptions = this.props.user.gardens.map( garden => <option value={garden._id}>{garden.name}</option>)
    return (
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
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
        </select>
        <Button onClick={this.handleSubmit} variant="contained" color="primary">Add Plot</Button>
      </div>
    )
  }
}

export default PlotNew;