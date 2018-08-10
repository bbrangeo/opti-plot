import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link className="link-btn" to='/gardens/new/'>
          <Button size="large" variant="contained" color="primary" className={classes.button}>
            Add a Garden
          </Button>
        </Link>
      </div>
      <div>
        <Link className="link-btn" to='/plots/new'>
          <Button size="large" variant="contained" color="primary" className={classes.button}>
            Add a Plot
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default withStyles(styles)(DashPanel);