import React from 'react';
import { RootContext } from './RootContext';
import { WelcomeBanner } from './WelcomeBanner';
import { WelcomeText } from './WelcomeText';
import DashList from './DashList';
import axios from 'axios';
import { Grid } from '@material-ui/core';

export const Welcome = props => {

  return (
    <RootContext.Consumer> 
      {
        ({user}) => {
          return (
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <WelcomeBanner user={user}>
                <h3>Grow with us!</h3>
              </WelcomeBanner>
            </Grid>
            <Grid item xs={12} md={6}>
              <WelcomeText user={user} />
            </Grid>
            <Grid item xs={12} md={6}>
              <DashList />
              {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nulla inventore quas ab molestiae autem, ea, facere quisquam nemo ullam soluta expedita ad at sapiente nam. Laboriosam dicta repellat beatae!</p> */}
            </Grid>
          </Grid>
          )
        }
      }
    </RootContext.Consumer>
  )
}


