import React, {Component} from 'react';
import ColorBox from './ColorBox'

class ColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div className="ColorPalette" style={{ height: '100vh' }}>
        <div className="ColorPalette-colors" style={{ height: '90%' }}>
          {this.props.colors.map(color => <ColorBox color={color.color} name={color.name}/>)}
        </div>
      </div>
    );
  }
}
 
export default ColorPalette;