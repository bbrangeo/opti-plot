import React from 'react';
import axios from 'axios';
import { Icon } from '../Icon';
import { Grid, Button } from '@material-ui/core';

export const Garden = props => {
  let garden = props.garden

  const deleteGarden = (e) => {
    e.stopPropagation();
    axios.delete(`/gardens/${garden._id}`)
      .then( response => console.log(response))
    props.updateUser();
  }

  return (
    <div className="dash-box">
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <h1>{garden.name}</h1><Button variant="contained" onClick={(e) => {deleteGarden(e)}} color="secondary" >DELETE</Button>

        </Grid>
        <Grid container spacing={16} justify="center" alignContent="center" alignItems="center">
          <Grid item xs={12} md={3} className="dash-box">
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {
                garden.cropsChosen.map(crop => <Icon src={crop.icon} size={30} />)
              }
            </div>
          </Grid>
          <Grid item xs={12} md={3} className="dash-box">
            <ul>
              {
                garden.plots.map(plot => <li key={plot._id}>{plot.name}</li>)
              }
            </ul>
          </Grid>
          <Grid item xs={12} md={3} className="dash-box">
            <ul>
              {
                garden.cropsChosen.map(crop => <li key={crop.ofId}>{crop.name}</li>)
              }
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}