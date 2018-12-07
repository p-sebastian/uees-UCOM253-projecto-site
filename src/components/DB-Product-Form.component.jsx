import React, { Component } from 'react';
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormHelperText,
  Button
} from '@material-ui/core';
import { insertProduct } from '../request';
import { TEAL, PINK, BLUE } from './theme';

class DBProductForm extends Component {
  state = {
    name: '',
    description: '',
    brand: '',
    price: '',
    id_persona: '',
    cargo: ''
  };

  get _disabled() {
    const { name, description, brand, price } = this.state;
    return !name || !description || !brand || !price;
  }

  render() {
    const { open, classes } = this.props;
    const { buttonStyle } = classes;
    
    return (
      <Dialog open={open}>
        <DialogTitle>Crear Producto</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Nombre" onChange={this._onSelect} fullWidth required />
          <TextField name="description" label="Descripcion" onChange={this._onSelect} fullWidth required />
          <TextField name="brand" label="Marca" type="email" onChange={this._onSelect} fullWidth required />
          <TextField name="price" label="Precio" type="number" onChange={this._onSelect} fullWidth required />
          <FormHelperText>* Todos los campos son requeridos.</FormHelperText>
            
        </DialogContent>
        <Button classes={{ root: buttonStyle }} onClick={this._submit} disabled={this._disabled} fullWidth>CREAR</Button>
      </Dialog>
    )
  }
  _onSelect = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }
  _submit = async () => {
    const { persona } = this.props;
    try {
      const response = await insertProduct({ ...this.state, ...persona });
      console.info(response);

      this.props.onClose();
    } catch (e) {
      console.error({ error: e });
    }
  }
}

const styles = {
  buttonStyle: {
    backgroundColor: BLUE,
    color: 'white',
    padding: '16px',
    borderRadius: 0
  }
};

export default withStyles(styles)(DBProductForm);