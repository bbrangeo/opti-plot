import React from 'react';
import { Garden } from './Garden'
import { WelcomeBanner } from '../WelcomeBanner';

const Gardens = props => {
  let gardens = props.user.gardens.map( garden => <Garden garden={garden} /> )

  return (
    <div>
      <WelcomeBanner user={props.user}>
        <h3>gosh! what great good gardens!</h3>
      </WelcomeBanner>
      {gardens}
    </div>
  )
}

export default Gardens;