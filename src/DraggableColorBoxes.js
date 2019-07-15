import React from 'react'
import NewPaletteColorBox from './NewPaletteColorBox'
import { SortableContainer } from 'react-sortable-hoc'
import { withStyles } from '@material-ui/styles'
import mediaQueries from './mediaQueries'

const styles = {
  DraggableColorBoxes: {
    height: '100%', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridAutoRows: 'repeat(4, 1fr)',
    [mediaQueries.down('lg')]: {
      gridTemplateColumns: 'repeat(4, 1fr)'
    },
    [mediaQueries.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    [mediaQueries.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)'
    }
  }
}

const DraggableColorBoxes = ({ colors, deleteColor, classes }) => {
  return (
    <div className={classes.DraggableColorBoxes}>
      { colors.map((color, index) => <NewPaletteColorBox index={index} deleteColor={deleteColor} key={`${color}-${index}`} color={color} />)}
    </div>
  )
}

export default withStyles(styles)(SortableContainer(DraggableColorBoxes))