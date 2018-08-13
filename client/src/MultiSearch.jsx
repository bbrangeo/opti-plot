import React from 'react';
import CropSearch from './Crop/CropSearch';
import { Grid } from '@material-ui/core';

export const MultiSearch = props => {
  return (
    <Grid container spacing={16}>
      <Grid item xs={4}>
        <CropSearch user={props.user} updateUser={props.updateUser} />
      </Grid>
      <Grid item xs={4}>
        <CropSearch user={props.user} updateUser={props.updateUser} />
      </Grid>
      <Grid item xs={4}>
        <CropSearch user={props.user} updateUser={props.updateUser} />
      </Grid>
    </Grid>
  )
}