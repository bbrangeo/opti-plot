import React, { Component } from 'react';
import { Icon } from './Icon';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    axios.get('https://openfarm.cc/api/v1/crops/5928ef4aafa29a0004000012')
      .then(response => {
        this.setState({
          data: response.data.data
        })
      })
  }

  render() {
    let iconString = this.state.data ? this.state.data.attributes.svg_icon : ''
    iconString = iconString.replace(/<\?xml.*?\?>/g, '')
    iconString = iconString.replace(/<!-- .* -->/g, '')
    iconString = iconString.replace(/\r?\n|\r/g, '')
    const svgString = this.state.data ? iconString : '<svg background="black"></svg>'
    const dataURI = `url(data:image/svg+xml;base64,${btoa(svgString)})`
    return (
      <div className="App">
        <h1>Hello OptiPlot</h1>
        <Icon icon={iconString} />
      </div>
    );
  }
}

export default App;
