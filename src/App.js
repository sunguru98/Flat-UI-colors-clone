import React from 'react';
import ColorPalette from './ColorPalette'
import seedPalettes from './seedPalettes'
import generateColorBreakpoints from './generateColorBreakpoints'

function App() {
  console.log(generateColorBreakpoints(seedPalettes[4]))
  return (
    <div className="App">
      <ColorPalette pallete={generateColorBreakpoints(seedPalettes[3])}/>
    </div>
  );
}

export default App;
