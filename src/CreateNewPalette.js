import React, { Component } from "react";
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
import NewPaletteColorBox from "./NewPaletteColorBox";

const drawerWidth = 340;

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

class NewPaletteForm extends Component {
  constructor (props) {
    super(props)
    this.state = { open: false, currentColor: 'red', colors: [] }
    this.changeCurrentColor = this.changeCurrentColor.bind(this)
    this.addColor = this.addColor.bind(this)
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  changeCurrentColor (colorObj) {
    this.setState({ currentColor: colorObj.hex })
  }

  addColor () {
    this.setState((curState) => { return { colors: [...curState.colors, curState.currentColor]} })
  }

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
        <Button variant='contained' color='primary' style={{ background: this.state.currentColor}} onClick={this.addColor}>Add Color</Button>
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open
        })}
        style={{ marginTop: '64px', height: 'calc(100vh - 64px)', padding: '0', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(5, 1fr)' }}
      >
        {/* <div className={classes.drawerHeader} /> */}
        {this.state.colors.map(color => <NewPaletteColorBox color={color} />)}
      </main>
    </div>
  );
}
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);