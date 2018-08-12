import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, ListSubheader, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { RootContext } from './RootContext';

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

class DashList extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      gardens: this.props.user.gardens
    }
  }

  render() {
    const { classes } = this.props;
    let datetime = new Date();
    console.log(datetime,"====>",this.props.user)
    const list = this.state.gardens[0].hasOwnProperty('plots') ? 
        <List className={classes.root} subheader={<li />}>
          {this.state.gardens.map(garden => (
            <li key={`section-${garden._id}`} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader><Link to={`/gardens/${garden._id}`} className="link-btn">{garden.name}</Link></ListSubheader>
                { 
                  garden.plots.map( plot => (
                    <ListItem key={`item-${garden.name}-${plot.name}`} className={classes.ListItem} >
                      <ListItemText primary={plot.name} />
                    </ListItem>
                   ))
                }
              </ul>
            </li>
          ))}
        </List>
     : <p>no gardens yet</p>;
    
    return (
      <div className="dash-box">
        <h4>My Gardens</h4>
          {list}
      </div>
    )
  }
}

export default withStyles(styles)(DashList);