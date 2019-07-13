import React from 'react'
import NewPaletteColorBox from './NewPaletteColorBox'
import { SortableContainer } from 'react-sortable-hoc'

const DraggableColorBoxes = ({ colors, deleteColor }) => {
  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(4, 1fr)' }}>
      { colors.map((color, index) => <NewPaletteColorBox index={index} deleteColor={deleteColor} key={`${color}-${index}`} color={color} />)}
    </div>
  )
}

export default SortableContainer(DraggableColorBoxes)