import React, {Component} from 'react';
import './ColorBox.css'
import mediaQueries from './mediaQueries'

import CopyClipboard from 'react-copy-to-clipboard'

import {Link} from 'react-router-dom'

import chroma from 'chroma-js'

import { withStyles } from '@material-ui/styles'

const styles = {
  ColorBox: {
    display: 'inline-block',
    cursor: 'pointer',
    textTransform: 'uppercase',
    position: 'relative',
    margin: 0,
    [mediaQueries.down('md')]: {
      width: props => props.showMoreButton && '25%',
      height: props => props.showMoreButton && '30%'
    },
    [mediaQueries.down('sm')]: {
      width: props => props.showMoreButton && '50%',
      height: props => props.showMoreButton && '20%'
    },
    [mediaQueries.down('xs')]: {
      width: props => props.showMoreButton && '100%',
      height: props => props.showMoreButton && '10%'
    }
  }
}
class ColorBox extends Component {
  constructor (props) {
    super(props);
    this.state = { isCopied: false }
    this.copyHexColor = this.copyHexColor.bind(this)
  }

  copyHexColor () {
    this.setState({ isCopied: true}, () => {
      setTimeout(() => {this.setState({ isCopied: false })}, 500)
    })
  }

  render() {
    const { classes } = this.props
    const isDarkColor = chroma(this.props.color).luminance() <= 0.1
    const isLightColor = chroma(this.props.color).luminance() >= 0.7
    return ( 
      <CopyClipboard text={this.props.color} onCopy={this.copyHexColor}>
        <div className={`${classes['ColorBox']} ${this.props.showMoreButton ? 'switchMore' : ''}`} style={{ background: this.props.color.length === 6 ? `#${this.props.color}` : this.props.color }}>
          <div className={`ColorBox-overlay ${this.state.isCopied && 'show'}`} style={{ background: this.props.color.length === 6 ? `#${this.props.color}` : this.props.color }}/>
          <div className={`ColorBox-copy-msg ${this.state.isCopied && 'show'}`}>
            <h1 className={isLightColor ? 'darkColor' : undefined}>Copied !</h1>
            <p style={{marginTop: '10px'}} className={isLightColor ? 'darkColor' : undefined}>{this.props.color}</p>
          </div>
          <div className="ColorBox-box">
            <span className={`ColorBox-name ${isDarkColor && 'lightColor'}`}>{this.props.name}</span>
            { this.props.showMoreButton && <Link style={{ color: 'black' }} to={`/palette/${this.props.paletteId}/${this.props.colorId}`} onClick={event => event.stopPropagation()}><span className="ColorBox-more">MORE</span></Link>}
          </div>
          <button className={`ColorBox-copy ${isLightColor ? 'darkColor' : undefined}`}>Copy</button>
        </div>
      </CopyClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);