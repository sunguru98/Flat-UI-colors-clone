import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.isFormShowing,
      newPaletteName: "" 
    };
    this.handleChange = this.handleChange.bind(this);
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

  handleClose = () => {
    this.props.handleFormState(false)
  };

  render() {
    const { newPaletteName } = this.state;

    return (
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby='form-dialog-title'>
        <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
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
    );
  }
}
export default PaletteMetaForm;