import React from 'react';
import Login from './Login';

import { AppBar, Toolbar, Button } from '@material-ui/core';

export const Nav = props => {
  let authButtons;
  if (!props.user) {
    authButtons = (
      <span>
        <Login liftTokenToState={props.liftTokenToState} />
        <Button>Sign Up</Button>
      </span>
    ) 
  } else {
    authButtons = (
      <span>
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