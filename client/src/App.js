import React, { Component } from 'react';
import { RootContext } from './RootContext';
import { CropInfo } from './Plot/CropInfo'
import { Nav } from './Nav';
import SimpleModal from './SimpleModal'
import { Grid, AppBar, Toolbar, Typography, Modal } from '@material-ui/core';
import { createMuiTheme, getMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as Colors from '@material-ui/core/colors';
import axios from 'axios';
import Signup from './Signup';


const theme = createMuiTheme({
  palette: {
    primary: Colors.green,
    secondary: Colors.brown,
    textPrimary: Colors.white
  },
});


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
    const user = this.state.user;

    let jsx = user ? <CropInfo /> : <SimpleModal content={<Signup liftTokenToState={this.liftTokenToState} />} />



    return (
        <MuiThemeProvider theme={theme}>
          <div>
            <Nav />
            <div>
              <Grid container justify="center" spacing={16}>
                  <Grid item xs={8} >
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <RootContext.Provider value={this.state}>
                      {jsx}
                    </RootContext.Provider>
                  </Grid>
              </Grid>
            </div>
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
