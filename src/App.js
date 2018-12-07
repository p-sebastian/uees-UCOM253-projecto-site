import React, { Component } from 'react';
import { 
  Grid, 
  withStyles,
  AppBar,
  Toolbar,
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { DBForm, DBList, DBProduct, DBProductForm } from './components';
import { BLUE } from './components/theme';

class App extends Component {
  state = { selected: null, isOpen: false };

  constructor(props) {
    super(props);
    this._ref = React.createRef();
    this._tableRef = React.createRef();
  }
  render() {
    const { appBarStyle, productStyle } = this.props.classes;
    return (
      <div>
        <AppBar classes={{ colorPrimary: appBarStyle }} color="primary" position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Projecto Base de Datos
            </Typography>
          </Toolbar>
        </AppBar>
        {this._renderButton()}
      
        <div className={this.props.classes.appStyle}>
          <Grid
            container
            justify="space-evenly"
            alignItems="center"
            spacing={8}
          >
            <Grid md={6} sm={12} xs={12} item>
              <DBForm onInsert={this._reload} />
            </Grid>
            <Grid md={6} sm={12} xs={12} item>
              <DBList onClick={this._showAndFilter} ref={this._ref} />
            </Grid>
          </Grid>
        </div>
        <div className={productStyle}>
          <DBProduct ref={this._tableRef} />
        </div>
        <DBProductForm
          open={this.state.isOpen}
          persona={this.state.selected}
          onClose={this._onDialogClose}
        />
      </div>
    );
  }
  _renderButton() {
    const { selected } = this.state;
    if (selected && selected.cargo === 'gerente' ) {
      return (
        <Button 
          variant="fab" 
          className={this.props.classes.fabStyle}
          onClick={() => this.setState({ isOpen: true })}
        >
          <AddIcon style={{ color: 'white' }} />        
        </Button>
      );
    }
  }
  _onDialogClose = () => {
    this.setState({ isOpen: false });
    this._reload();
  }
  _reload = () => {
    console.info('reloaded');
    // reload list
    this._ref.current.componentWillMount();
    this._tableRef.current.componentWillMount();
  }
  _showAndFilter = (selected) => {
    this.setState({ selected })
    console.info(selected);
  }
}

const styles = {
  appBarStyle: {
    background: '#009688'
  },
  appStyle: {
    marginTop: 50,
    padding: 15,
    display: 'flex',
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productStyle: {
    padding: 15,
  },
  fabStyle: {
    position: 'absolute',
    right: 10,
    top: 35,
    background: BLUE
  }
};

export default withStyles(styles)(App);
