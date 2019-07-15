import React, { Component } from 'react'
import PaletteListItem from './PaletteListItem'
import { withStyles } from '@material-ui/styles'
import mediaQueries from './mediaQueries'
import { Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const styles = {
  '@global': {
    '.fade-exit': {
      opacity: 1
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity .3s ease-in-out'
    }
  },
  PaletteList: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1% 0',
    [mediaQueries.down('lg')]: {
      padding: '1% 20px'
    }
  },
  'PaletteList-colors': {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    [mediaQueries.down('lg')]: {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    [mediaQueries.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 1fr)'
    },
    gridTemplateRows: 'repeat(4, 1fr)',
    gridGap: '10px 50px'
  }
}

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
    this.goToPallete = this.goToPallete.bind(this)
  }

  goToPallete (paletteId) {
    this.props.history.push(`/palette/${paletteId}`)
  }

  render() {
    const { classes, deletePalette } = this.props
    return (
      <div className={classes.PaletteList}>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ padding: '30px 0', color: 'white' }}>React color picker</h1>
            <Link style={{ color: 'white' }} to="/palette/new">Create palette</Link>
          </nav>
          <TransitionGroup className={classes['PaletteList-colors']}>
            { this.props.palettes.map(palette => <CSSTransition key={palette.id} classNames='fade' timeout={300}>
              <PaletteListItem deletePalette={deletePalette} palette={palette} handleClick={this.goToPallete}/>
            </CSSTransition>) }
          </TransitionGroup>
      </div>
    );
  }
}
 
export default withStyles(styles)(PaletteList)