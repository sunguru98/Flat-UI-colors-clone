import React from 'react'
import TrashIcon from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/styles'
import { SortableElement } from 'react-sortable-hoc'

const styles = {
  NewPaletteColorBox: {
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)'
    },
    cursor: 'pointer',
    textTransform: 'uppercase',
    padding: '8px', 
    color: 'rgba(0, 0, 0, 0.5)',
    fontWeight: 'bold',
    letterSpacing: '1.2px',
    background: props => props.color.color, 
    display: 'flex', 
    alignItems: 'flex-end', 
    justifyContent: 'space-between'  
  },
}

const NewPaletteColorBox = SortableElement((props) => {
  return (
    <div className={props.classes['NewPaletteColorBox']}>
      <span>{ props.color.name }</span>
      <TrashIcon style={{ transition: 'all .3s' }} onClick={() => props.deleteColor(props.color.name)}/>
    </div>
  )
})

export default withStyles(styles)(NewPaletteColorBox)