import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Button, Grid } from '@material-ui/core';
import { CropInfo } from '../Plot/CropInfo';
import { WelcomeBanner } from '../WelcomeBanner';
// import { CropSearchResult } from './CropSearchResult';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  menu: {
    width: 200,
  },
});


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

  queryAPI(e) {
    e.preventDefault()
    let qs = this.state.query
    axios.get(`https://openfarm.cc/api/v1/crops/?filter=${qs}`)
      .then( response => {
        this.setState({
          data: response.data.data,
          query: ''
        })
      })
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    })
  }

  render() {
    const data = this.state.data ? this.state.data : ''
    const crops = data ? data.map( datum => <CropInfo crop={datum.id} /> ) : ''
    const lastQ = lastQ ? <h3>Search Results for: {this.state.lastQ}</h3> : this.state.lastQ
    return (
      <div>
        <RootContext.Consumer>
          {
            ({user}) => {
            return <WelcomeBanner user={this.props.user}><h3>Research those crops!</h3> </WelcomeBanner>
            }
          }
        </RootContext.Consumer>
        <Grid container spacing={16} justify="center" alignContent="center" alignItems="flex-start">
          <Grid item xs={12} md={10}>
            <TextField name="query" type="text" onChange={this.handleChange} value={this.state.query} fullWidth />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button onClick={this.queryAPI} variant="contained" color="primary" >Find Crops</Button>
          </Grid>
          <Grid item xs={12}>
            {lastQ}
            {crops}
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default CropSearch;