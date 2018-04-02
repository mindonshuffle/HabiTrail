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
import LoginDialog from './components/LoginDialog/LoginDialog.js';
import moment from 'moment';
import API from './utils/API.js';
import Dialog from 'material-ui/Dialog';

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
    dialogOpen: true,
    userId: '',
    userEmail: '',
    date: moment.utc().startOf('day').toString(),
  };

  // Lifecycles

  componentWillMount(){ 
    console.log('***component will mount***');
    this.checkLoginStatus();
  } 

  componentWillUpdate(){
    console.log('***app.js WILL UPDATE ***', this.state)
  }

  incDate = () => {
    let newDate = moment.utc(this.state.date).add(1, 'days').startOf('day').toString();
    this.setState({date: newDate});
  };

  decDate = () => {
    let newDate = moment.utc(this.state.date).subtract(1, 'days').startOf('day').toString();
    this.setState({date: newDate});    
  };

  //opens login/registration modal
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  //closes login/registration modal
  handleRequestClose = () => {
    if(this.state.userId !== ''){
      this.setState({ dialogOpen: false });
    }
  };

  // Check Login/Session
  checkLoginStatus = () => {
    API.getCurrentUserId()
      .then(res => {
        console.log('App.js checking user: ', res.data.user); 
        this.setState({userId: res.data.user})
      })
      .catch(err => this.setState({userEmail: '', userId: ''}));  
  };

  // Handle New User Registration
  handleRegisterSubmit = event => {
    event.preventDefault();
    API.signUp({username: this.state.registerName, email:this.state.registerEmail,  password: this.state.registerPassword})
    .then(res => {this.setState({userEmail: res.data.email, userId: res.data._id})})
  }

  // Handle Login
  handleLoginSubmit = event => {
    event.preventDefault();

    API.login({username: this.state.loginEmail, password: this.state.loginPassword})
    .then( res => {this.setState({userEmail : res.data.email, userId: res.data._id})
    console.log(this.state)})
  }

  handleLogoutSubmit = event => {
    API.logout()
    .then(res => {
      this.setState({userEmail : '', userId: '', dialogOpen: true})
      console.log('App.js Logout: ', this.state)
    })
  }

  render() {

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppDrawer handleLogoutSubmit={this.handleLogoutSubmit} />
          <Switch>
            <PropsRoute path='/habits' component={TopBar} date={null} incDate={this.incDate} decDate={this.decDate}/>
            <PropsRoute path='/' component={TopBar} date={this.state.date} incDate={this.incDate} decDate={this.decDate}/>
          </Switch>
          <Switch>          
            <PropsRoute path='/habits' component={HabitPage} userId={this.state.userId} />
            <PropsRoute path='/' component={HomePage} userId={this.state.userId} date={this.state.date} />
          </Switch>
          <Dialog open={this.state.dialogOpen} onRequestClose={this.handleRequestClose}>
            <LoginDialog 
              userId={this.state.userId} 
              handleRequestClose={this.handleRequestClose}
              checkLoginStatus={this.checkLoginStatus}
            />
          </Dialog>                
        </ MuiThemeProvider>
      </Router>
    );
  }
}

export default App;

