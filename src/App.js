import React, { Component } from 'react';
import { 
  Grid, 
  withStyles,
  AppBar,
  Toolbar
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { DBForm, DBList } from './components';

class App extends Component {
  constructor(props) {
    super(props);
    this._ref = React.createRef();
  }
  render() {
    const { appBarStyle } = this.props.classes;
    return (
      <div>
        <AppBar classes={{ colorPrimary: appBarStyle }} color="primary" position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Photos
            </Typography>
          </Toolbar>
        </AppBar>
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
              <DBList ref={this._ref} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
  _reload = () => {
    console.info('reloaded');
    // reload list
    this._ref.current.componentWillMount();
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
  }
};

export default withStyles(styles)(App);
