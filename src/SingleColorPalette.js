import React, { Component } from 'react'
import ColorPaletteNavBar from './ColorPaletteNavbar'
import ColorPaletteFooter from './ColorPaletteFooter'
import ColorBox from './ColorBox'

import { withStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import mediaQueries from './mediaQueries'

const styles = {
  'SingleColorPalette-colors': {
    height: '90%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridAutoRows: 'repeat(2, 1fr)',
    [mediaQueries.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    [mediaQueries.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 1fr)'
    }
  }
}

class SingleColorPalette extends Component {
  constructor(props) {
    super(props)
    this._singleColorLevels = this.extractColorOfDifferentShades(this.props.pallete, this.props.colorId)
    this.state = { colorFormat: 'hex#' }
    this.handleColorFormat = this.handleColorFormat.bind(this)
  }

  handleColorFormat (colorFormat) {
    this.setState({ colorFormat })
  }

  extractColorOfDifferentShades (paletteObj, colorId) {
    let specificColorShades = []
    for (let colorLevel in paletteObj.colors) specificColorShades.push(paletteObj.colors[colorLevel].find(color => color.id === colorId))
    return specificColorShades.slice(1)
  }

  render() {
    const { classes, pallete } = this.props 
    return (
      <div className="SingleColorPalette" style={{ height: '100vh', overflow: 'hidden' }}>
        <ColorPaletteNavBar showSlider={false} changeColorFormat={this.handleColorFormat}/>
        <div className={ classes['SingleColorPalette-colors'] }>
          { this._singleColorLevels.map(color => <ColorBox key={color.name} style={{ height: '100%', width: '100%' }} name={color.name} color={color[this.state.colorFormat]} showMoreButton={false} />) }
          <div style={{ background: 'black', position: 'relative' }}>
            <Link style={{ color: 'white' }} to={`/palette/${this.props.pallete.id}`}><span className="ColorBox-more" style={{ height: '30px', cursor: 'pointer', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>GO BACK</span></Link>
          </div>
        </div>
        <ColorPaletteFooter palette={pallete}/>
      </div>
    );
  }
}
 
export default withStyles(styles)(SingleColorPalette);