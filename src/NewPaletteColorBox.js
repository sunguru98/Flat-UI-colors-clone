import React, { Component } from 'react'

class NewPaletteColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( <div style={{ background: this.props.color }}>{this.props.color}</div> );
  }
}
 
export default NewPaletteColorBox;