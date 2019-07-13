import React, { Component } from 'react'

class NewPaletteColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( <div style={{ background: this.props.color.color }}>{ this.props.color.name }</div> );
  }
}
 
export default NewPaletteColorBox;