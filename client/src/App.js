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
import moment from 'moment';

const theme = createMuiTheme();

const styles = theme => ({
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
});

//allow props through react router
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

//begin root component definiton
class App extends Component {
  state = {
    userId: '5a1f16bae5ece1c4dc4de68e',
    date: moment.utc().startOf('day').toString(),
  };

  incDate = () => {
    let newDate = moment.utc(this.state.date).add(1, 'days').startOf('day').toString();
    this.setState({date: newDate});
  };

  decDate = () => {
    let newDate = moment.utc(this.state.date).subtract(1, 'days').startOf('day').toString();
    this.setState({date: newDate});    
  };

  render() {

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppDrawer />
          <Switch>
          <PropsRoute path='/habits' component={TopBar} date={null} incDate={this.incDate} decDate={this.decDate}/>
          <PropsRoute path='/' component={TopBar} date={this.state.date} incDate={this.incDate} decDate={this.decDate}/>
          </Switch>
          <Switch>          
            <PropsRoute path='/habits' component={HabitPage} userId={this.state.userId} />
            <PropsRoute path='/' component={HomePage} userId={this.state.userId} date={this.state.date} />
          </Switch>               
        </ MuiThemeProvider>
      </Router>
    );
  }
}

export default App;

