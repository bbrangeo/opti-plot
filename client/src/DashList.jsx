import React from 'react';
import { List, ListSubheader, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: '#FFF',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 600,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ListItem: {
    textAlign: 'center',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

const DashList = props => {
  const { classes } = props;

  const list = props.user.gardens ? 
      <List className={classes.root} subheader={<li />}>
        {props.user.gardens.map(garden => (
          <li key={`section-${garden._id}`} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader>{garden.name}</ListSubheader>
              { garden.plots.map( plot => (
                <ListItem key={`item-${garden.name}-${plot.name}`} className={classes.ListItem} >
                  <ListItemText primary={`Plot: ${plot.name}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
   : <p>no gardens yet</p>;
  console.log(props.user)

  return (
    <div className="dash-box">
      <h4>My Gardens</h4>
        {list}
    </div>
  )
}

export default withStyles(styles)(DashList);