import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';  

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
// import Divider from 'material-ui/Divider';
import TopBar from './components/TopBar/TopBar.js';
import HomePage from './pages/HomePage.js';
import HabitPage from './pages/HabitPage.js';
import AppDrawer from './components/AppDrawer/AppDrawer.js';

const theme = createMuiTheme();

const styles = theme => ({
  appFrame: {
    backgroundColor: 'black',
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
});

//begin root component definiton
class App extends Component {
  render() {

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Grid container spacing={24} justify='center'>
            <TopBar />
            <AppDrawer />
        
              <Switch>          
                <Route exact path="/" component={HomePage} />
                <Route exact path="/habits" component={HabitPage} />
                <Route exact path="/history" component={HabitPage} />
              </Switch>              
                
          </Grid>    
        </ MuiThemeProvider>
      </Router>
    );
  }
}

export default App;

