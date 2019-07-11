import React, { Component } from 'react';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './ColorPaletteNavbar.css'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import SnackBar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

class ColorPaletteNavbar extends Component {
  constructor (props) {
    super(props)
    this.state = { colorFormat: 'hex#', isSnackBarOpen: false }
    this.handleChange = this.handleChange.bind(this)
    this.closeSnackBar = this.closeSnackBar.bind(this)
  }

  handleChange (evt) {
    this.setState({ colorFormat: evt.target.value }, () => {
      this.props.changeColorFormat(evt.target.value)
      this.setState({ isSnackBarOpen: true })
    })
  }

  closeSnackBar () {
    this.setState({isSnackBarOpen: false})
  }

  render() { 
    return (
      <header className="ColorPaletteNavbar">
        <div className="ColorPaletteNavbar-logo">
          <a href="https://www.google.com" style={{textDecoration: 'none', color: 'black'}}>reactcolorpicker</a>
        </div>
        <div className="ColorPaletteNavbar-Slider">
          <span>Level: {this.props.colorLevel}</span>
          <Slider defaultValue={this.props.colorLevel} min={100} max={900} onChange={this.props.onChange} step={100} />
        </div>
        <div className="ColorPaletteNavbar-Select">
          <Select value={this.state.colorFormat} onChange={this.handleChange}>
            <MenuItem value="hex#">HEX# - #ffffff</MenuItem>
            <MenuItem value="hex">HEX - ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
        <SnackBar 
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          open={this.state.isSnackBarOpen}
          message={<span className="ColorPaletteNavbar-SnackBar-message">Format Changed to {this.state.colorFormat}</span>}
          autoHideDuration={2000}
          onClose={this.closeSnackBar}
          action={[
            <IconButton onClick={this.closeSnackBar} color='inherit'>
              <CloseIcon/>
            </IconButton>
          ]}
          />
      </header>
    );
  }
}
 
export default ColorPaletteNavbar;
