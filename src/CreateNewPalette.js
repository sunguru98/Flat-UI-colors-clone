import React, { Component } from "react";
import DraggableColorBoxes from './DraggableColorBoxes'
import PaletteMetaForm from './PaletteMetaForm'

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from '@material-ui/core/Button'

import { ChromePicker } from 'react-color'

import arrayMove from 'array-move'
import { Link } from 'react-router-dom'

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
const drawerWidth = 340;

class NewPaletteForm extends Component {
  static defaultProps = { maxColors: 20 }
  constructor (props) {
    super(props)
    this.state = { 
      open: false, 
      currentColor: 'red', 
      colors: this.props.palettes[0].colors, // default colors are material-ui colors
      newColorName: '',
      isFormShowing: false
    }
    this.changeCurrentColor = this.changeCurrentColor.bind(this)
    this.addColor = this.addColor.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePaletteSave = this.handlePaletteSave.bind(this)
    this.deleteColor = this.deleteColor.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
    this.pickRandomColor = this.pickRandomColor.bind(this)
    this.clearPalette = this.clearPalette.bind(this)
    this.handleIsFormShowing = this.handleIsFormShowing.bind(this)
  }

  componentDidMount () {
    ValidatorForm.addValidationRule('isColorNameUnique', value => this.state.colors.every(color => color.name.toLowerCase() !== value.toLowerCase()))
    ValidatorForm.addValidationRule('isColorUnique', () => this.state.colors.every(color => color.color !== this.state.currentColor))
  }

  handlePaletteSave (paletteObj) {
    paletteObj.id = paletteObj.paletteName.toLowerCase().replace(/ /g, '-')
    paletteObj.colors = this.state.colors
    this.props.savePalette(paletteObj)
    this.props.history.push('/')
  }

  handleIsFormShowing (booleanValue) {
    this.setState({ isFormShowing: booleanValue })
  }

  onSortEnd ({oldIndex, newIndex}) {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  }

  deleteColor (colorName) { this.setState(({ colors }) => { return { colors: colors.filter(color => color.name !== colorName) } })}
  handleChange (event) { this.setState({ [event.target.name]: event.target.value })}
  handleDrawerOpen = () => { this.setState({ open: true }) }
  handleDrawerClose = () => { this.setState({ open: false }) }
  changeCurrentColor (colorObj) { this.setState({ currentColor: colorObj.hex }) }
  addColor () { this.setState((curState) => { return { colors: [...curState.colors, { color: curState.currentColor, name: curState.newColorName }], newColorName: '' } }) }

  pickRandomColor () {
    const allColors = this.props.palettes.map(palette => palette.colors).flat(),
          randomColorIndex = Math.floor(Math.random() * allColors.length),
          randomColor = allColors[randomColorIndex]
    this.setState(({ colors }) => { return { colors: [...colors, randomColor] } })
  }

  clearPalette () {
    this.setState({ colors: [] })
  }

  render() {
    const { classes, maxColors } = this.props;
    const { open, colors } = this.state;
    const isPaletteFull = colors.length >= maxColors
    return (<div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open
        })}
        style={{ background: 'rgb(242, 242, 242)', color: 'black' }}
      >
        <Toolbar disableGutters={!open} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Persistent drawer
            </Typography>
          </div>
          <div style={{ display: 'flex', marginRight: '20px' }}>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button variant='contained' color='secondary' style={{marginRight: '10px'}}>Go back</Button>
            </Link>
            <Button variant='contained' color='primary' onClick={() => this.handleIsFormShowing(true)}>Save Palette</Button>
          </div>
        </Toolbar>
        { this.state.isFormShowing && <PaletteMetaForm handleFormState={this.handleIsFormShowing} palettes={this.props.palettes} isFormShowing={this.state.isFormShowing} handleSubmit={this.handlePaletteSave} /> }
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div style={{ padding: '0 15px', height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h4'>Design your Palette</Typography>
          <div style={{ width: '100%', display: 'flex', margin: '10px 0 25px 0' }}>
            <Button style={{ flex: '1' }} variant='contained' color='secondary' onClick={this.clearPalette}>Clear Palette</Button>
            <Button style={{ flex: '1' }} disabled={isPaletteFull} variant='contained' color='primary' onClick={this.pickRandomColor}>Random Color</Button>
          </div>
          <ChromePicker className={classes.ChromePicker} color={this.state.currentColor} onChange={ this.changeCurrentColor }/>
          <ValidatorForm onSubmit={this.addColor} style={{ width: '100%' }}>
            <TextValidator
              variant='filled'
              style={{ width: '100%', marginTop: '15px' }}
              name='newColorName'
              value={this.state.newColorName} 
              onChange={ this.handleChange }
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={['Color name is required', 'Color name must be unique', 'Color already taken']} />
            <Button 
              disabled={isPaletteFull} 
              type='submit' 
              variant='contained'
              style={{ display: 'block', width: '100%', marginTop: '30px', padding: '15px 0', fontSize: '20px', background: !isPaletteFull ? this.state.currentColor : 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
              { !isPaletteFull ? 'Add Color' : 'Palette Full' }
            </Button>
          </ValidatorForm>
        </div>
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open
        })}
        style={{ marginTop: '64px', height: 'calc(100vh - 64px)', padding: '0' }}
      >
        <DraggableColorBoxes onSortEnd={this.onSortEnd} axis='xy' colors={this.state.colors} deleteColor={this.deleteColor}/>
      </main> 
    </div>
  );
}
}


const styles = theme => ({
  root: {
    display: "flex",
    background: 'white'
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  ChromePicker: {
    width: '100% !important'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

export default withStyles(styles, { withTheme: true })(NewPaletteForm);