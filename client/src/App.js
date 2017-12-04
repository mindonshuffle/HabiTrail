import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';  

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
// import Divider from 'material-ui/Divider';
import TopBar from './components/TopBar/TopBar.js';
import HomePage from './pages/HomePage.js';
import HabitPage from './pages/HabitPage.js';

const theme = createMuiTheme();

//begin root component definiton
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={16} justify='center'>
          <TopBar />
          <Router>
            
              <Switch>          
                <Route exact path="/" component={HomePage} />
                <Route exact path="/habits" component={HabitPage} />
                <Route exact path="/history" component={HabitPage} />
              </Switch>              
        
          </Router>
        </Grid>    
      </ MuiThemeProvider>
    );
  }
}

export default App;

