import React, { Component } from 'react';
import { 
  withStyles,
  Card,
  CardHeader,
  CardContent,
  TextField,
  FormHelperText,
  Button
} from '@material-ui/core';
import DBSelect from './DB-Select.component';
import { insert } from '../request';

const ITEMS = {
  ciudad: [
    { value: 'samborondon', name: 'Samborondon' },
    { value: 'guayaquil', name: 'Guayaquil' }
  ],
  cargo: [
    { value: 'gerente', name: 'Gerente' },
    { value: 'manager', name: 'Manager' },
    { value: 'servicio', name: 'Servicio Al Cliente' }
  ]
};

class DBForm extends Component {
  state = {
    nombre: '',
    apellido: '',
    email: '',
    edad: '',
    ciudad: '',
    provincia: 'Guayas',
    cargo: '',
    tel: ''
  };
  get _disabled() {
    const { apellido, ciudad, edad, email, nombre, provincia, tel, cargo } = this.state;
    return !apellido || !ciudad || !edad || !email || !nombre || !provincia || !tel || !cargo;
  }

  render() {
    const { ciudad, cargo } = ITEMS;
    const { cardTitleStyle, buttonStyle } = this.props.classes;
    return (
      <div>
        <Card raised>
          <CardHeader classes={{ title: cardTitleStyle }} title="Ingreso de Empleados" />
          <CardContent>
            <form noValidate autoComplete="off">
              <TextField name="nombre" label="Nombre" onChange={this._onSelect} fullWidth required />
              <TextField name="apellido" label="Apellido" onChange={this._onSelect} fullWidth required />
              <TextField name="email" label="Correo electronico" type="email" onChange={this._onSelect} fullWidth required />
              <TextField name="edad" label="Edad" type="number" onChange={this._onSelect} fullWidth required />
              <DBSelect name="ciudad" label="Ciudad" items={ciudad} onSelect={this._onSelect} />
              <DBSelect name="cargo" label="Cargo" items={cargo} onSelect={this._onSelect} />
              <TextField name="tel" label="Telefono" type="number" onChange={this._onSelect} fullWidth required />
              <FormHelperText>* Todos los campos son requeridos.</FormHelperText>
            </form>
          </CardContent>
          <Button classes={{ root: buttonStyle }} onClick={this._submit} disabled={this._disabled} fullWidth>INGRESAR USUARIO</Button>
        </Card>
      </div>
    )
  }
  _onSelect = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }
  _submit = async () => {
    console.info(this.state);
    try {
      const response = await insert(this.state);
      console.info(response);
      this.props.onInsert();
    } catch (e) {
      console.error({ error: e });
    }
  }
}

const styles = {
  cardTitleStyle: {
    color: '#00695f',
    textAlign: 'center'
  },
  buttonStyle: {
    backgroundColor: '#03a9f4',
    color: 'white',
    padding: '16px',
    borderRadius: 0
  }
};

export default withStyles(styles)(DBForm);