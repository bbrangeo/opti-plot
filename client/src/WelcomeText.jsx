import React from 'react';
import DashPanel from './DashPanel';

export const WelcomeText = props => {
  return (
    <div className="dash-box">
      <h4>{props.user.name},</h4>
      <p>We are so glad that you have chosen <span className="text-plot">Optiplot</span> to help manage your gardens!</p>
      <p>Here are some of the things we can help you do:</p>
      <p>&nbsp; &nbsp; &bull; &nbsp; Find growing information for a variety of crops</p>
      <p>&nbsp; &nbsp; &bull; &nbsp; Choose the best crops to combine in your plot</p>
      <DashPanel />
    </div>
  )
}