import React, { Component } from 'react'
import PaletteListItem from './PaletteListItem'
import { withStyles } from '@material-ui/styles'

const styles = {
  PaletteList: {
    width: '1200px',
    margin: '0 auto',
  },
  'PaletteList-colors': {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '10px 50px'
  }
}

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
    this.goToPallete = this.goToPallete.bind(this)
  }

  goToPallete (paletteId) {
    this.props.history.push(`/palette/${paletteId}`)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.PaletteList}>
        <h1 style={{ padding: '30px 0', color: 'white' }}>React color picker</h1>
        <div className={classes['PaletteList-colors']}>
        { this.props.palettes.map(palette => <PaletteListItem key={palette.id} palette={palette} handleClick={() => this.goToPallete(palette.id)}/>) }
        </div>
      </div>
    );
  }
}
 
export default withStyles(styles)(PaletteList)