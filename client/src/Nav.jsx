import React from 'react';
import Login from './Login';
import Signup from './Signup';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const Nav = props => {
  let menuItems;
  if (!props.user) {
    menuItems = (
      <span style={{display: 'inline-block'}}>
        <Login liftTokenToState={props.liftTokenToState} />
        <Signup liftTokenToState={props.liftTokenToState} />
      </span>
    ) 
  } else {
    menuItems = (
      <span style={{ display: 'inline-block' }}>
      	<Button onClick={props.logout} >Logout</Button>
      	<Link to="/gardens" className="link-btn">
          <Button>My Gardens</Button>
        </Link>
      </span>
    )
  }

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Link className="link-btn" to="/">
          <h1 className="nav-logo">OPTIPLOT</h1>
        </Link>
        {menuItems}
      </Toolbar>
    </AppBar>
  )
}