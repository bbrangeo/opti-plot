import React from 'react';
import Login from './Login';
import Signup from './Signup';
import { AppBar, Toolbar, Button } from '@material-ui/core';

export const Nav = props => {
  let authButtons;
  if (!props.user) {
    authButtons = (
      <span style={{display: 'inline-block'}}>
        <Login liftTokenToState={props.liftTokenToState} />
        <Signup liftTokenToState={props.liftTokenToState} />
      </span>
    ) 
  } else {
    authButtons = (
      <span style={{ display: 'inline-block' }}>
      	<Button onClick={props.logout} >Logout</Button>
      	<Button>My Gardens</Button>
      </span>
    )
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <h1 className="nav-logo">OPTIPLOT</h1>
        {authButtons}
      </Toolbar>
    </AppBar>
  )
}