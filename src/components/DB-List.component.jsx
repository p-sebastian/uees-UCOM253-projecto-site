import React, { Component } from 'react';
import {
  Card,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { select } from '../request';
import { BLUE, PINK, TEAL} from './theme';

class DBList extends Component {
  state = {
    items: []
  };
  async componentWillMount() {
    let response = await select();
    console.info(response.data);
    this.setState({ items: response.data });
  }

  render() {
    return (
      <div>
        <Card>
          <List component="nav">
            {this._renderItems()}
          </List>
        </Card>
      </div>
    )
  }
  _renderItems() {
    return this.state.items.map(({ id_empleado, nombre, apellido, provincia, ciudad, email, cargo }) => (
      <ListItem key={id_empleado}>
        <ListItemText
          style={{ textTransform: 'capitalize' }}
          primary={`${nombre} ${apellido}`}
          secondary={`${email}; ${provincia}, ${ciudad}`} 
        />
        <p style={{ textTransform: 'capitalize', color: color(cargo) }}>{cargo}</p>
      </ListItem>
    ));
  }
}

const color = (cargo) => {
  switch (cargo) {
    case 'gerente': return BLUE;
    case 'manager': return TEAL;
    case 'servicio': return PINK;
    default: return BLUE;
  }
}
export default DBList;