import seedPalettes from './seedPalettes'
import generateColorBreakpoints from './generateColorBreakpoints'
import React from 'react';
import './App.css'
import ColorPalette from './ColorPalette'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'

import { Switch, Route } from 'react-router-dom'

const findPalette = paletteId => {
  return generateColorBreakpoints(seedPalettes.find(palette => palette.id === paletteId))
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={routeParams => <PaletteList palettes={seedPalettes} {...routeParams} />}/>
        <Route exact path='/palette/:id' render={routeParams => <ColorPalette pallete={findPalette(routeParams.match.params.id)}/>}/>
        <Route exact path='/palette/:paletteId/:colorId' render={routeParams => <SingleColorPalette pallete={findPalette(routeParams.match.params.paletteId)} colorId={routeParams.match.params.colorId} />}/>
      </Switch>
    </div>
  );
}

export default App;
