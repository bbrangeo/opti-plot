import React, { Component } from 'react';
import { WelcomeBanner } from '../WelcomeBanner';
import { Icon } from '../Icon';
import { Grid } from '@material-ui/core';

const GardenShow = props => {
  console.log('PROPS',props)
  const paramsId = props.match.params.id
  let garden;
  props.user.gardens.forEach( item => {
      if ( item._id === paramsId ) {
        garden = item
      }
    }
  )
  console.log("PARAM", paramsId, "GARDEN", garden)
  return (
    <div>
      <WelcomeBanner user={props.user}>
        <h3>gosh! what great good gardens!</h3>
      </WelcomeBanner>
      <div className="dash-box">
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <h1>{garden.name}</h1>
          </Grid>
          <Grid container spacing={16} justify="center" alignContent="center" alignItems="center">
            <Grid item xs={12} md={3} className="dash-box">
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                {
                  garden.cropsChosen.map( crop => <Icon src={crop.icon} size={30} />)
                }
              </div>
            </Grid>
            <Grid item xs={12} md={3} className="dash-box">
              <ul>
              {
                garden.plots.map( plot => <li key={plot._id}>{plot.name}</li>)
              }
              </ul>
            </Grid>
            <Grid item xs={12} md={3} className="dash-box">
              <ul>
                {
                  garden.cropsChosen.map( crop => <li key={crop.ofId}>{crop.name}</li>)
                }
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default GardenShow;