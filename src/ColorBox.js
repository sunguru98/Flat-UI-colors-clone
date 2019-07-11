import React, {Component} from 'react';
import './ColorBox.css'
import CopyClipboard from 'react-copy-to-clipboard'

class ColorBox extends Component {
  constructor (props) {
    super(props);
    this.state = { isCopied: false }
    this.copyHexVal = this.copyHexVal.bind(this)
  }

  copyHexVal () {
    this.setState({ isCopied: true}, () => {
      setTimeout(() => {this.setState({ isCopied: false })}, 500)
    })
  }

  render() { 
    return ( 
      <CopyClipboard text={this.props.color} onCopy={this.copyHexVal}>
        <div className="ColorBox" style={{ background: this.props.color }}>
          <div className={`ColorBox-overlay ${this.state.isCopied && 'show'}`} style={{ background: this.props.color }}/>
          <div className={`ColorBox-copy-msg ${this.state.isCopied && 'show'}`}>
            <h1>Copied !</h1>
            <p style={{marginTop: '0'}}>{this.props.color}</p>
          </div>
          <div className="ColorBox-box">
            <span className="ColorBox-name">{this.props.name}</span>
            <span className="ColorBox-more">MORE</span>
          </div>
          <button className="ColorBox-copy">Copy</button>
        </div>
      </CopyClipboard>
    );
  }
}

export default ColorBox;