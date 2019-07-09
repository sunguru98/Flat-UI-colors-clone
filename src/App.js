import React from 'react';
import ColorPalette from './ColorPalette'
import seedPalettes from './seedPalettes'

function App() {
  return (
    <div className="App">
      <ColorPalette {...seedPalettes[3]}/>
    </div>
  );
}

export default App;
