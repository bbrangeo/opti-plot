import React, { Component } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

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
        response => console.log(response)
      )
      this.setState({name: '', message: ''})
    } else {
      this.setState({message: "Please enter a valid garden name"})
    }
    this.props.updateUser();
  }

  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <input name="name" type="text" onChange={this.handleChange} />
        <Button onClick={this.handleSubmit}></Button>
      </div>
    )
  }
}

export default GardenNew;