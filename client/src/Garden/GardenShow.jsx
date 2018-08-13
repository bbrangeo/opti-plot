import React, { Component } from 'react';
import { WelcomeBanner } from '../WelcomeBanner';
import { Garden } from './Garden';
import { Plot } from '../Plot/Plot';
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
        <h3>gosh! what a great good garden!</h3>
      </WelcomeBanner>
      <Garden garden={garden} />
      {
        garden.plots.map( plot => <Plot plot={plot} /> )
      }
    </div>
  )
}

export default GardenShow;