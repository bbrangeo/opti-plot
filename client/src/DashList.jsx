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

  return (
    <div className="dash-box">
      <List className={classes.root} subheader={<li />}>
        {[1, 2, 3, 4].map(sectionId => (
          <li key={`section-${sectionId}`} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader>{`Garden: ${sectionId}`}</ListSubheader>
              {[1, 2].map(item => (
                <ListItem key={`item-${sectionId}-${item}`} className={classes.ListItem} >
                  <ListItemText primary={`Plot ${item}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </div>
  )
}

export default withStyles(styles)(DashList);