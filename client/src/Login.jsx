import React, { Component } from 'react';
import { Modal, Button } from '@material-ui/core';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      email: '',
      password: '',
      response: null
    }
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
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      if (result.data.hasOwnProperty('error')) {
        this.setState({
          response: result.data
        })
      } else {
        localStorage.setItem('mernToken', result.data.token)
        this.props.liftTokenToState(result.data);
        this.setState({
          response: null,
        })
      }
    })
  }

  render() {
    const {classes} = this.props
    return (
      <span>
        <Button onClick={this.handleOpen}>Login</Button>
        <Modal open={this.state.open}
          oncClose={this.handleClose}
          onEscapeKeyDown={this.handleClose}
          onBackdropClick={this.handleClose} >
          <div className="auth-modal" >

          <p>{this.state.response ? this.state.response.message : ''}</p>
          <form onSubmit={this.handleSubmit}>
            Email: <input type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            /> <br />
            Password: <input type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <input type="submit" value="Log In" />
          </form>
          </div>
        </Modal>
      </span>
    )
  }
}

export default Login