import React from 'react';

const ColorBox = props => {
  const colorBoxStyle = {
    background: props.color,
    width: '20%',
    height: '25%',
    display: 'inline-block',
    cursor: 'pointer'
  }
  return (
    <div className="ColorBox" style={colorBoxStyle}>
      <span className="ColorBox-name">{props.name}</span>
      <span>MORE</span>
    </div>
  );
}
 
export default ColorBox;