import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 'form',
      newPaletteName: "" 
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeToEmojiPicker = this.changeToEmojiPicker.bind(this)
    this.prepareForPaletteSubmission = this.prepareForPaletteSubmission.bind(this)
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  prepareForPaletteSubmission (emoji) {
    let paletteObj = { paletteName: this.state.newPaletteName, emoji: emoji.native }
    this.props.handleSubmit(paletteObj)
  }

  handleClose = () => {
    this.props.handleFormState(false)
  };

  changeToEmojiPicker () {
    this.setState({ phase: 'emoji' })
  }

  render() {
    const { newPaletteName } = this.state;
    return (
      <React.Fragment>
        <Dialog open={this.state.phase === 'emoji'} onClose={this.handleClose}>
          <DialogTitle id='form-dialog-title'>Create emoji for the palette</DialogTitle>
          <Picker onSelect={this.prepareForPaletteSubmission} title='Choose an emoji for the palette' />
        </Dialog>
        <Dialog open={this.state.phase === 'form'} onClose={this.handleClose} aria-labelledby='form-dialog-title'>
          <ValidatorForm onSubmit={this.changeToEmojiPicker}>
            <DialogTitle id='form-dialog-title'>Create palette name</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Unleash your widlest imaginations and choose a funky name :)
              </DialogContentText>
                <TextValidator label='Palette Name' value={newPaletteName} name='newPaletteName' fullWidth margin='normal' onChange={this.handleChange} validators={["required", "isPaletteNameUnique"]} errorMessages={["Enter Palette Name", "Name already used"]} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color='primary'>Cancel</Button>
              <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </React.Fragment>
    );
  }
}
export default PaletteMetaForm;