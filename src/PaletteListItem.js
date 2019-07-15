import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/styles'
import mediaQueries from './mediaQueries'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = {
  PaletteListItem: {
    height: '250px',
    overflow: 'hidden',
    background: 'white',
    padding: '8px',
    borderRadius: '6px',
    position: 'relative',
    cursor: 'pointer',
    '&:hover svg': {
      opacity: '1 !important'
    }
  },
  'PaletteListItem-colors': {
    borderRadius: '5px',
    overflow: 'hidden',
    height: '85%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)'
  },
  'PaletteListItem-info': {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'black',
    height: '15%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  'PaletteListItem-delete': {
    color: 'white',
    position: 'absolute',
    top: '0',
    right: '0',
    background: 'rgb(232, 56, 41)',
    padding: '10px',
    boxSizing: 'content-box',
    zIndex: '13',
    opacity: '0',
    [mediaQueries.down('xs')]: {
      opacity: '1'
    }
  }
}

class PaletteListItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    event.stopPropagation()
    const { palette, deletePalette } = this.props
    deletePalette(palette.id)
  }

  render () {
    console.log('Rendering again')
    const { classes, palette, handleClick } = this.props
    return (
      <div className={classes['PaletteListItem']} onClick={() => handleClick(palette.id)}>
        <DeleteIcon onClick={this.handleClick} className={classes['PaletteListItem-delete']} style={{ transition: 'all .3s ease-in-out' }}/>
        <div className={classes['PaletteListItem-colors']}>
          { palette.colors.map((color, index) => <div key={`${color}-${index}`} style={{ background: color.color}}></div>) }
        </div>
        <div className={classes['PaletteListItem-info']}>
          <span>{palette.paletteName}</span>
          <span>{palette.emoji}</span>
        </div>
      </div>
    )
  }
}

 
export default withStyles(styles)(PaletteListItem)