import React, { Component } from 'react';
import { 
  Grid, 
  withStyles,
  Button
} from '@material-ui/core';
import { DBForm, DBList } from './components';

class App extends Component {
  constructor(props) {
    super(props);
    this._ref = React.createRef();
  }
  render() {
    return (
      <div className={this.props.classes.appStyle}>
        <Grid
          container
          justify="space-evenly"
          alignItems="center"
          spacing={8}
        >
          <Grid xs={6} item>
            <DBForm onInsert={this._reload} />
          </Grid>
          <Grid xs={6} item>
            <DBList ref={this._ref} />
          </Grid>
        </Grid>
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
  appStyle: {
    padding: 15,
    display: 'flex',
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default withStyles(styles)(App);
