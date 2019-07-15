import React, { Component } from 'react';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './ColorPaletteNavbar.css'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import mediaQueries from './mediaQueries'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import SnackBar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const styles = {
  ColorPaletteNavbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '6vh',
    background: 'white',
  },
  'ColorPaletteNavbar-logo': {
    background: '#ececec',
    height: '100%',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    [mediaQueries.down('xs')]: {
      display: 'none'
    }
  },
  'ColorPaletteNavbar-Slider': {
    marginLeft: '20px',
    width: '400px',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    '& span': { 
      width: '30%', 
      [mediaQueries.down('xs')]: {
        width: '50%'
      } 
    },
    [mediaQueries.down('md')]: {
      width: '250px',
      marginLeft: '10px'
    },
    [mediaQueries.down('xs')]: {
      width: '140px',
      marginLeft: '10px'
    }
  }
}

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
    const { classes } = this.props
    return (
      <header className={ classes['ColorPaletteNavbar'] }>
        <div className={classes["ColorPaletteNavbar-logo"]}>
          <Link to='/' style={{textDecoration: 'none', color: 'black'}}>reactcolorpicker</Link>
        </div>
        { this.props.showSlider && 
        <div className={classes["ColorPaletteNavbar-Slider"]}>
          <span>Level: {this.props.colorLevel}</span>
          <Slider defaultValue={this.props.colorLevel} min={100} max={900} onChange={this.props.onChange} step={100} />
        </div>
        }
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
 
export default withStyles(styles)(ColorPaletteNavbar);
