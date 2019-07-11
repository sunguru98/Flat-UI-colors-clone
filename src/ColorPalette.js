import React, {Component} from 'react';
import ColorBox from './ColorBox'
import ColorPaletteNavbar from './ColorPaletteNavbar'

class ColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = { colorLevel: 500, colorFormat: 'hex#' }
    this.handleChange = this.handleChange.bind(this)
    this.changeColorFormat = this.changeColorFormat.bind(this)
  }

  changeColorFormat (colorFormat) {
    this.setState({ colorFormat })
  }

  handleChange (level) {
    this.setState({ colorLevel: level })
  }

  render() {
    return (
      <div className="ColorPalette" style={{ height: '100vh', overflow: 'hidden' }}>
        <ColorPaletteNavbar colorLevel={this.state.colorLevel} onChange={this.handleChange} changeColorFormat={this.changeColorFormat}/>
        <div className="ColorPalette-colors" style={{ height: '90%' }}>
          {this.props.pallete.colors[this.state.colorLevel].map(color => <ColorBox key={color.name} color={color[this.state.colorFormat]} name={color.name}/>)}
        </div>

      </div>
    );
  }
}
 
export default ColorPalette;