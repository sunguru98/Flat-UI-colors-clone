import React, {Component} from 'react';
import ColorBox from './ColorBox'
import ColorPaletteNavbar from './ColorPaletteNavbar'
import ColorPaletteFooter from './ColorPaletteFooter'

class ColorPalette extends Component {
  constructor(props) {
    super(props)
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
      <div className="ColorPalette" style={{ height: '100vh' }}>
        <ColorPaletteNavbar showSlider colorLevel={this.state.colorLevel} onChange={this.handleChange} changeColorFormat={this.changeColorFormat}/>
        <div className="ColorPalette-colors" style={{ height: '90%' }}>
          {this.props.pallete.colors[this.state.colorLevel].map(color => <ColorBox key={color.name} colorId={color.id} paletteId={this.props.pallete.id} color={color[this.state.colorFormat]} name={color.name} showMoreButton/>)}
        </div>
        <ColorPaletteFooter palette={this.props.pallete}/>
      </div>
    );
  }
}
 
export default ColorPalette;