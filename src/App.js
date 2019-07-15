import seedPalettes from './seedPalettes'
import generateColorBreakpoints from './generateColorBreakpoints'
import React, {Component} from 'react';
import './App.css'

import CreateNewPalette from './CreateNewPalette'
import ColorPalette from './ColorPalette'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'

import { Switch, Route } from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { palettes: JSON.parse(localStorage.getItem('palettes')) || seedPalettes }
    this.findPalette = this.findPalette.bind(this)
    this.savePalette = this.savePalette.bind(this)
    this.deletePalette = this.deletePalette.bind(this)
  }

  findPalette (paletteId) {
    return generateColorBreakpoints(this.state.palettes.find(palette => palette.id === paletteId))
  }

  savePalette (paletteObj) {
    this.setState(({ palettes }) => { return { palettes: [...palettes, paletteObj]} }, () => {
      localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
    })
  }

  deletePalette (paletteId) {
    this.setState(({ palettes }) => { return { palettes: palettes.filter(palette => palette.id !== paletteId) }}, () => {
      localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
    })
  } 

  render () {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/palette/new' render={routeParams => <CreateNewPalette palettes={this.state.palettes} {...routeParams} savePalette={this.savePalette} />}/>
          <Route exact path='/' render={routeParams => <PaletteList palettes={this.state.palettes} {...routeParams} deletePalette={this.deletePalette} />}/>
          <Route exact path='/palette/:id' render={routeParams => <ColorPalette pallete={this.findPalette(routeParams.match.params.id)}/>}/>
          <Route exact path='/palette/:paletteId/:colorId' render={routeParams => <SingleColorPalette pallete={this.findPalette(routeParams.match.params.paletteId)} colorId={routeParams.match.params.colorId} />}/>
        </Switch>
      </div>
    );
  }
}

export default App;
