import React from 'react';
import axios from 'axios';
import { Icon } from '../Icon';
import { Grid, Button, IconButton } from '@material-ui/core';
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

  const optimizeGarden = (e) => {
    e.preventDefault()
    e.stopPropagation()
    axios.put(`/gardens/${garden._id}/optimize`)
      .then(response => {
        console.log(response)
        props.updateUser();
      })
    props.history.push(`/gardens/${garden._id}`)
  }

  return (
    <div className="dash-box">
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <h1>{garden.name}&nbsp;&nbsp;
          <Button variant="contained" onClick={(e) => { optimizeGarden(e) }} color="primary" size="small" className="del-btn"> Optimize </Button>
          &nbsp;&nbsp;
          <Button variant="outlined" onClick={(e) => { deleteGarden(e) }} color="secondary" size="small" className="del-btn"><DeleteIcon />Remove</Button></h1>

        </Grid>
        <Grid container spacing={16} >
          <Grid item xs={12} md={4} className="dash-box">
            <h3>Plots</h3>
            <ul>
              {
                garden.plots.map(plot => <li key={plot._id}>{plot.name}&nbsp;&nbsp; 
                                          <IconButton href={`/plots/${plot._id}`} 
                                            onClick={(e) => deletePlot(e)} 
                                            variant="outlined"
                                            color="secondary"
                                            className="del-btn"
                                            size="small"
                                            >
                                            <DeleteIcon />
                                          </IconButton>
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