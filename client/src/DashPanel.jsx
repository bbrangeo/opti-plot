import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: "0.5em",
    width: "100%"
  }
})


const DashPanel = props => {
  const { classes } = props;
  return (
    <div>
      <div>
        <Button size="large" variant="contained" color="primary" className={classes.button}>
          Add a Garden
        </Button>
      </div>
      <div>
        <Button size="large" variant="contained" color="primary" className={classes.button}>
          Add a Plot
        </Button>
      </div>
    </div>
  )
}

export default withStyles(styles)(DashPanel);