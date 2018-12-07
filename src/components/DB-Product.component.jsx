import React, { Component } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { selectProduct } from '../request';
import { TEAL, PINK, BLUE } from './theme';

class DBProduct extends Component {
  state = {
    products: []
  };
  async componentWillMount() {
    let response = await selectProduct();
    console.info(response.data);
    this.setState({ products: response.data });
  }

  render() {
    return (
      <div>
        <Paper>
          <Table>
            <TableHead style={{ background: TEAL, color: 'white' }}>
              <TableRow>
                <TableCell style={{ color: 'white' }} numeric>ID</TableCell>
                <TableCell style={{ color: 'white' }}>Nombre</TableCell>
                <TableCell style={{ color: 'white' }}>Descripcion</TableCell>
                <TableCell style={{ color: 'white' }}>Marca</TableCell>
                <TableCell style={{ color: 'white' }} numeric>Precio ($)</TableCell>
                <TableCell style={{ color: 'white' }}>Creado Por</TableCell>
                <TableCell style={{ color: 'white' }}>Contacto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this._renderItems()}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
  _renderItems() {
    return this.state.products.map(({ id_productos, nombre, apellido, name, brand, description, price, tel }) => (
      <TableRow key={id_productos}>
        <TableCell style={{ color: BLUE }} numeric>{id_productos}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell style={{ color: PINK }}>{brand}</TableCell>
        <TableCell style={{ color: TEAL }} numeric>${price}</TableCell>
        <TableCell>{nombre} {apellido}</TableCell>
        <TableCell>{tel}</TableCell>
      </TableRow>
    ));
  }
}

export default DBProduct;