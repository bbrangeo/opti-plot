import React from 'react';
import { Grid } from '@material-ui/core';

export const WelcomeBanner = props => {
  return (
    <Grid item xs={12} className="welcome-banner">
      <h1> Welcome, {props.user.name}!</h1>
      {props.children}
    </Grid>
  )
}