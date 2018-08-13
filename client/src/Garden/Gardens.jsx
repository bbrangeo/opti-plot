import React from 'react';
import { Garden } from './Garden'
import { WelcomeBanner } from '../WelcomeBanner';
import DashPanel from '../DashPanel';

const Gardens = props => {
  let gardens = props.user.gardens.map( garden => <Garden garden={garden} updateUser={props.updateUser}/> )

  return (
    <div>
      <WelcomeBanner user={props.user}>
        <h3>gosh! what great good gardens!</h3>
        <DashPanel />
      </WelcomeBanner>
      {gardens}
    </div>
  )
}

export default Gardens;