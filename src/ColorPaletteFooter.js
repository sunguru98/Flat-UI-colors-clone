import React from 'react'

const ColorPaletteFooter = ({palette}) => {
  return (
    <div className="ColorPalette-footer" style={{ background: 'white', height: '4vh', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: 'bold' }}>
      {palette.paletteName}
      <span className="ColorPalette-emoji" style={{fontSize: '20px', margin: '0 5px'}}>{palette.emoji}</span>
    </div> 
  )
}
 
export default ColorPaletteFooter;