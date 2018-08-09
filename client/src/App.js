import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    axios.get('https://openfarm.cc/api/v1/crops/54bda00e3961370003150400')
      .then(response => {
        this.setState({
          data: response.data.data
        })
      })
  }

  render() {
    // const svgParser = new DOMParser()
    // const data = this.state.data ? JSON.stringify(this.state.data) : ''
    // const icon = this.state.data ? svgParser.parseFromString(this.state.data.attributes.svg_icon, "application/xml") : ''
    let iconString = this.state.data ? this.state.data.attributes.svg_icon : ''
    iconString = iconString.replace(/<\?xml.*?\?>/g, '')
    iconString = iconString.replace(/<!-- .* -->/g, '')
    iconString = iconString.replace(/\r?\n|\r/g, '')
    const svgString = this.state.data ? iconString : '<svg background="black"></svg>'
    const dataURI = `url(data:image/svg+xml;base64,${btoa(svgString)})`
    return (
      <div className="App">
        <h1>Hello OptiPlot</h1>
        <div id="icon_spc" style={{background: dataURI, width: 200, height: 200}}></div>
      </div>
    );
  }
}

export default App;
