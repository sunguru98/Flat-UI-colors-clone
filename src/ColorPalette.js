import React, {Component} from 'react';
import ColorBox from './ColorBox'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

class ColorPalette extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = { colorLevel: 500 }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (level) {
    this.setState({ colorLevel: level })
  }

  render() {
    return (
      <div className="ColorPalette" style={{ height: '100vh', overflow: 'hidden' }}>
        <Slider defaultValue={this.state.colorLevel} min={100} max={900} onChange={this.handleChange} step={100} />
        <div className="ColorPalette-colors" style={{ height: '90%' }}>
          {this.props.pallete.colors[this.state.colorLevel].map(color => <ColorBox key={color.name} color={color.hex} name={color.name}/>)}
        </div>
      </div>
    );
  }
}
 
export default ColorPalette;