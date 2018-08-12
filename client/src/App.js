import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RootContext } from './RootContext';
import { Welcome } from './Welcome';
import { NotLoggedIn } from './NotLoggedIn';
import { CropInfo } from './Plot/CropInfo';
import CropSearch from './Crop/CropSearch';
import GardenShow from './Garden/GardenShow';
import { Nav } from './Nav';
import { Grid } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as Colors from '@material-ui/core/colors';
import axios from 'axios';


const theme = createMuiTheme({
  palette: {
    primary: Colors.green,
    secondary: Colors.brown,
    background: {
      paper: Colors.white,
    }
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
    // TODO: wrap the rest of app in user?
    let app = user ? Welcome : NotLoggedIn;
    
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Nav user={this.state.user} logout={this.logout} liftTokenToState={this.liftTokenToState} />
          <div>
            <div>
              <Grid container justify="center" spacing={16}>
                  <Grid item xs={8} >                  
                    <RootContext.Provider value={this.state}>
                      {/* {app} */}
                      <Switch>
                        <Route exact path='/' component={app} />
                        <Route path='/gardens/:id' component={ (props) => <GardenShow user={user} {...props} />} />
                        <Route path='/crops' component={ () => <CropSearch user={user} /> } />
                      </Switch>
                    </RootContext.Provider>
                  </Grid>
              </Grid>
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
