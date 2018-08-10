import React, { Component } from 'react';
import { Modal, Button } from '@material-ui/core';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      name: '',
      email: '',
      password: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({
      open: true
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
  }


  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      localStorage.setItem('mernToken', result.data.token)
      this.props.liftTokenToState(result.data);
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <span>
        <Button onClick={this.handleOpen}>Sign Up</Button>
        <Modal open={this.state.open} 
          oncClose={this.handleClose}
          onEscapeKeyDown={this.handleClose}
          onBackdropClick={this.handleClose} >
          <div className="auth-modal" >
            <form onSubmit={this.handleSubmit}>
              Name: <input type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
              /> <br />
              Email: <input type="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              /> <br />
              Password: <input type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              <input type="submit" value="Sign up" />
            </form>
          </div>
        </Modal>
      </span>
    )
  }
}

export default Signup