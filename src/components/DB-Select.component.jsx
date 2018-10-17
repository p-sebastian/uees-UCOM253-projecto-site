import React, { Component } from 'react';
import { 
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

class DBSelect extends Component {
  state = {
    value: ''
  };

  constructor(props) {
    super(props);
    this._id = `db-${this.props.name}`;
  }

  render() {
    const { label, name } = this.props;

    return (
      <FormControl fullWidth required>
        <InputLabel htmlFor={this._id}>{label}</InputLabel>
        <Select 
          value={this.state.value}
          name={name}
          onChange={this._onChange}
          inputProps={{
            id: this._id
          }}
        >
          <MenuItem value="">
            <em>Ninguno</em>
          </MenuItem>
          {this._renderItems()}
        </Select>
      </FormControl>
    );
  }

  _renderItems() {
    return this.props.items.map(i => (
      <MenuItem key={i.value} value={i.value}>{i.name}</MenuItem>
    ));
  }
  _onChange = (ev) => {
    this.setState({ value: ev.target.value });
    this.props.onSelect(ev);
  }
}

export default DBSelect;
