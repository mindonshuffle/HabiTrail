import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';  
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import API from '../../utils/API.js';
import moment from 'moment';


export default class LoginDialog extends React.Component {
  state = {
    signupDisplay: false,
    email: '',
    password: '',
    newEmail: '',
    newPassword: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleLoginSubmit = () =>{
    API.login(this.state.email, this.state.password);
    this.props.checkLoginStatus();
    this.props.handleRequestClose();
  }

  handleSignupSubmit = () =>{
    API.signup(this.state.newEmail, this.state.newPassword);
    this.props.checkLoginStatus();
    this.props.handleRequestClose();
  }

  handleSignupClick = () =>{
    this.setState({signupDisplay: true});
  }

  handleLoginClick = () =>{
    this.setState({signupDisplay: false});
  }

  // componentWillUpdate = () =>{
  //   switch(this.state.currentDisplay){
  //     case 'login':
  //       break;
  //     case 'signup':
  //       break;
  //   }
  // }

  render() {
    const signupDisplay = this.state.signupDisplay;

    const mainContent = signupDisplay ? (
      <CardContent>
            <Grid container spacing="16" justify="center">
              <Grid item xs="8">
                <TextField
                  // autoFocus
                  margin="dense"
                  id="newEmail"
                  label="Email Address"
                  type="text"
                  value={this.state.newEmail}
                  onChange={this.handleChange('newEmail')}
                  fullWidth
                />
              </Grid>
              <Grid item xs="8">
                <TextField
                  // autoFocus
                  margin="dense"
                  id="newPassword"
                  label="Password"
                  type="password"
                  value={this.state.newPassword}
                  onChange={this.handleChange('newPassword')}
                  fullWidth
                />
              </Grid>
              <Grid item xs="8">
                <Grid container justify="flex-end">
                  <Grid item>
                    <Button raised color="contrast" style={{backgroundColor: '#5C6BC0'}} onClick={() => this.handleSignupSubmit()}>
                      Create Account
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs="8">
                <Grid container justify="center">
                  <Grid item>
                   <Button color="primary" onClick={() => this.handleLoginClick()}>
                    Already have an account? Sign In
                  </Button> 
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        ) : 
        (
          <CardContent>
            <Grid container spacing="16" justify="center">
              <Grid item xs="8">
                <TextField
                  // autoFocus
                  margin="dense"
                  id="email"
                  label="Email Address"
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  fullWidth
                />
              </Grid>
              <Grid item xs="8">
                <TextField
                  // autoFocus
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  fullWidth
                />
              </Grid>
              <Grid item xs="8">
                <Grid container justify="flex-end">
                  <Grid item>
                    <Button raised color="contrast" style={{backgroundColor: '#5C6BC0'}} onClick={() => this.handleLoginSubmit()}>
                      Sign In
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs="8">
                <Grid container justify="center">
                  <Grid item>
                  <Button color="primary" onClick={() => this.handleSignupClick()}>
                    New User? Sign Up
                  </Button> 
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        );

    return (
      <div>
        <Card style={{width: '400px'}}>
          <CardContent style={{backgroundColor: '#5C6BC0'}}>
            <Grid container spacing="16" alignItems='center' justify="center">
              <Grid item>
                <Typography style={{color: '#ffffff'}}type="display1" component="h2">
                  Habitrail
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          {mainContent}
        </Card>
      </div>
    );
  }
}