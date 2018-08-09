import React, { Component } from 'react';
import { Icon } from './Icon';
import { CropInfo } from './Plot/CropInfo'
import { Grid, AppBar, Toolbar, Typography } from '@material-ui/core';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: null,
    }
    this.liftTokenToState = this.liftTokenToState.bind(this);
    this.logout = this.logout.bind(this);
    this.checkForLocalToken = this.checkForLocalToken.bind(this);
  }

  liftTokenToState(data) {
    this.setState({
      token: data.token,
      user: data.user
    })
  }

  logout() {
    localStorage.removeItem('mernToken');
    this.setState({
      token: '',
      user: null
    })
  }

  checkForLocalToken() {
    let token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: null
      })
    } else {
      axios.post('/auth/me/from/token', {
        token
      }).then(results => {
        localStorage.setItem('mernToken', results.data.token);
        this.setState({
          token: results.data.token,
          user: results.data.user
        })
      }).catch(err => console.log(err));
    }
  }

  componentDidMount() {
    this.checkForLocalToken();
  }

  render() {
    return (
      <div>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit">
              OPTIPLOT
          </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <CropInfo></CropInfo>
        </div>
      </div>
    );
  }
}

export default App;
