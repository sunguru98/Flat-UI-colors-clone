import React, { Component } from "react";
import DraggableColorBoxes from './DraggableColorBoxes'

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

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
const drawerWidth = 340;

class NewPaletteForm extends Component {
  constructor (props) {
    super(props)
    this.state = { open: false, currentColor: 'red', colors: [], newColorName: '', newPaletteName: '' }
    this.changeCurrentColor = this.changeCurrentColor.bind(this)
    this.addColor = this.addColor.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePaletteSave = this.handlePaletteSave.bind(this)
    this.deleteColor = this.deleteColor.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
  }

  componentDidMount () {
    ValidatorForm.addValidationRule('isColorNameUnique', value => this.state.colors.every(color => color.name.toLowerCase() !== value.toLowerCase()))
    ValidatorForm.addValidationRule('isColorUnique', () => this.state.colors.every(color => color.color !== this.state.currentColor))
    ValidatorForm.addValidationRule('isPaletteNameUnique', paletteName => this.props.palettes.every(palette => palette.paletteName.toLowerCase() !== paletteName.toLowerCase()))
  }

  handlePaletteSave () {
    const paletteName = this.state.newPaletteName
    let paletteObj = {
      paletteName,
      id: paletteName.toLowerCase().replace(/ /g, '-'),
      emoji: '👑',
      colors: this.state.colors
    }
    this.props.savePalette(paletteObj)
    this.props.history.push('/')
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

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (<div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open
        })}
        style={{ background: 'rgb(242, 242, 242)', color: 'black' }}
      >
        <Toolbar disableGutters={!open}>
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
          <ValidatorForm onSubmit={this.handlePaletteSave}>
            <TextValidator
              name='newPaletteName'
              value={this.state.newPaletteName} 
              onChange={ this.handleChange }
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Palette name is required', 'Palette name must be unique']} />
            <Button type='submit' variant='contained' color='primary'>Save Palette</Button>
          </ValidatorForm>
        </Toolbar>
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
        <Typography variant='h5'>Design your own palette</Typography>
        <div>
          <Button variant='contained' color='secondary'>Clear Palette</Button>
          <Button variant='contained' color='primary'>Random Color</Button>
        </div>
        <ChromePicker color={this.state.currentColor} onChange={ this.changeCurrentColor }/>
        <ValidatorForm onSubmit={this.addColor}>
          <TextValidator
            name='newColorName'
            value={this.state.newColorName} 
            onChange={ this.handleChange }
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['Color name is required', 'Color name must be unique', 'Color already taken']} />
          <Button type='submit' variant='contained' color='primary' style={{ background: this.state.currentColor}}>Add Color</Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open
        })}
        style={{ marginTop: '64px', height: 'calc(100vh - 64px)', padding: '0' }}
      >
        {/* <div className={classes.drawerHeader} /> */}
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