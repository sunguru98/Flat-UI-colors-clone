import React from 'react';
import './App.css'
import { Switch, Route } from 'react-router-dom'
import ColorPalette from './ColorPalette'
import PaletteList from './PaletteList'
import seedPalettes from './seedPalettes'
import generateColorBreakpoints from './generateColorBreakpoints'

const findPalette = paletteId => {
  return generateColorBreakpoints(seedPalettes.find(palette => palette.id === paletteId))
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={(routeParams) => <PaletteList palettes={seedPalettes} {...routeParams} />}/>
        <Route exact path='/palette/:id' render={routeParams => <ColorPalette pallete={findPalette(routeParams.match.params.id)}/>}/>
      </Switch>
    </div>
  );
}

export default App;
