import React, { Component } from 'react';
import axios from 'axios';
import { RootContext } from '../RootContext'
import { TextField, Button, Grid } from '@material-ui/core';
import { CropInfo } from '../Crop/CropInfo';
import { WelcomeBanner } from '../WelcomeBanner';
import { CropSearchResult } from './CropSearchResult';

class CropSearch extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      query: '',
      lastQ: '',
      data: null
    }
    this.queryAPI = this.queryAPI.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  queryAPI() {
    let qs = this.state.query
    axios.get(`https://openfarm.cc/api/v1/crops/?filter=${qs}`)
      .then( response => {
        console.log(response)
        this.setState({
          data: response.data.data,
          query: '',
          lastQ: qs
        }, function() {
          console.log("CALLBACK AFTER SET STATE",this.state)
        })
      })
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    })
  }

  render() {
    const crops = this.state.data ? this.state.data.map( datum => <CropSearchResult user={this.props.user} crop={datum.id} updateUser={this.props.updateUser} /> ) : ''
    const lastQ = this.state.lastQ !== '' ? <h3>Search Results for: {this.state.lastQ}</h3> : this.state.lastQ
    return (
      <div>
        <RootContext.Consumer>
          {
            ({user}) => {
              if (user) {
                return <WelcomeBanner user={user}><h3>Research those crops!</h3></WelcomeBanner>
              } else {
                return <WelcomeBanner user="user">How did you get here from there??</WelcomeBanner>
              } 
            }
          }
        </RootContext.Consumer>
        <div className="crop-search">
          <Grid container spacing={16} justify="center" alignContent="center" alignItems="center">
              <Grid item xs={12} md={10}>
                  <TextField name="query" type="text" onChange={this.handleChange} value={this.state.query} fullWidth />
              </Grid>
              <Grid item xs={12} md={2} style={{display: 'flex'}}>
                <Button onClick={this.queryAPI} variant="contained" color="primary" style={{width: "100%", alignItems:'center'}}>Find Crops</Button>
              </Grid>
            <Grid item xs={12}>
              {lastQ}
              {crops}
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default CropSearch;