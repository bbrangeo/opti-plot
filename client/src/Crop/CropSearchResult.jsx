import React from 'react';
import axios from 'axios';

export const CropSearchResult = props => {
  let cropInfo = null;
  axios.get(`https://openfarm.cc/api/v1/crops/${props.crop}`).then(response => {
    cropInfo = response.data.data
  })

  return (
    <div>
      <h3>{cropInfo.attributes.name}</h3>
    </div>
  )
}