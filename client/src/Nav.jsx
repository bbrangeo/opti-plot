import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

export const Nav = props => {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <h1 className="nav-logo">OPTIPLOT</h1>
      </Toolbar>
    </AppBar>
  )
}