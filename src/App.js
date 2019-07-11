import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ColorPalette from './ColorPalette'
import seedPalettes from './seedPalettes'
import generateColorBreakpoints from './generateColorBreakpoints'

const findPalette = paletteId => {
  return generateColorBreakpoints(seedPalettes.find(palette => palette.id === paletteId))
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => <h1>Hi there</h1>}/>
        <Route exact path='/palette/:id' render={routeParams => <ColorPalette pallete={findPalette(routeParams.match.params.id)}/>}/>
      </Switch>
    </div>
  );
}

export default App;
