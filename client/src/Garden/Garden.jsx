import React from 'react';
import axios from 'axios';
import { Icon } from '../Icon';
import { Grid, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

export const Garden = props => {
  let garden = props.garden

  const deleteGarden = (e) => {
    e.stopPropagation()
    axios.delete(`/gardens/${garden._id}`)
      .then( response => {
        console.log(response)
        props.updateUser();
      })
  }

  const deletePlot = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let target = e.currentTarget.href
    axios.delete(target)
      .then( response => {
        console.log(response)
        props.updateUser();
      })
  }

  const deleteCropFromGarden = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let target = e.currentTarget.href
    axios.delete(target)
      .then(response => {
        console.log(response)
        props.updateUser();
      })
  }

  return (
    <div className="dash-box">
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <h1>{garden.name}&nbsp;&nbsp;<Button variant="contained" onClick={(e) => { deleteGarden(e) }} color="secondary" className="del-btn"><DeleteIcon />Remove</Button></h1>

        </Grid>
        <Grid container spacing={16} >
          <Grid item xs={12} md={4} className="dash-box">
            <h3>Plots</h3>
            <ul>
              {
                garden.plots.map(plot => <li key={plot._id}>{plot.name}&nbsp;&nbsp; 
                                          <Button href={`/plots/${plot._id}`} 
                                            onClick={(e) => deletePlot(e)} 
                                            variant="fab"
                                            color="secondary"
                                            className="del-btn"
                                            >
                                            <DeleteIcon />
                                          </Button>
                                         </li>
                                        )
              }
            </ul>
          </Grid>
          <Grid item xs={12} md={4} className="dash-box">
            <h3>Crops Chosen</h3>
            <ul>
              {
                garden.cropsChosen.map(crop => <li key={crop.ofId}>{crop.name}</li>)
              }
            </ul>
          </Grid>
          <Grid item xs={12} md={4} className="dash-box">
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {
                garden.cropsChosen.map(crop => <Icon src={crop.icon} size={30} />)
              }
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}