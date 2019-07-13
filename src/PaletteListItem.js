import React from 'react'
import { withStyles } from '@material-ui/styles'

const styles = {
  PaletteListItem: {
    height: '250px',
    background: 'white',
    padding: '8px',
    borderRadius: '6px',
    '&:hover': { cursor: 'pointer' }
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
  }
}

const PaletteListItem = ({ classes, palette, handleClick }) => {
  return (
    <div className={classes['PaletteListItem']} onClick={handleClick}>
      <div className={classes['PaletteListItem-colors']}>
        { palette.colors.map((color, index) => <div key={`${color}-${index}`} style={{ background: color.color}}></div>) }
      </div>
      <div className={classes['PaletteListItem-info']}>
        <span>{palette.paletteName}</span>
        <span>{palette.emoji}</span>
      </div>
    </div>
  );
}
 
export default withStyles(styles)(PaletteListItem)