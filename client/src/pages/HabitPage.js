import React, { Component } from 'react';
import moment from 'moment';

import API from '../utils/API.js';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import HabitCard from '../components/HabitCard/HabitCard.js';
import AddHabit from '../components/AddHabit/AddHabit.js';
import AddHabitDialog from '../components/AddHabitDialog/AddHabitDialog.js';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

import Tooltip from 'material-ui/Tooltip';
import Dialog from 'material-ui/Dialog';

//temporary constant user
const userId = 'a1f16bae5ece1c4dc4de68e'
const styles = theme => ({
    pageFrame: {
        // position: 'absolute',
        marginLeft: '241px',
        width: `calc(100% - 255px)`,
      },
    fab: {
        backgroundColor: '#5c6bc0',
        position: 'absolute',
        right: '30px',
        bottom: '30px',
    }
});

class HabitPage extends Component {
  state = {
    // userId: this.props.userId,
    userId: 'a1f16bae5ece1c4dc4de68e',
    habits: [],
    date: moment.utc().startOf('day').toString(),
    dialogOpen: false,
    snackbarOpen: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.loadHabits();
  }

  handleSnack = () => {
    this.setState({ snackbarOpen: true });
  };

  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

// retrieve all checkins for user with current date and sort into state arrays
  loadHabits = () => {
    console.log('Getting Habits:', this.state.userId)
    API.getHabits(this.state.userId)
    .then(res => {
        console.log('Getting Habits response: ', res);
      this.setState({habits: []});
      res.data.forEach( habit =>{
        this.setState({habits: this.state.habits.concat(habit)}); 
      })
      console.log('Habits:', this.state.habits)
    })
    .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.pageFrame}>
        
          <Grid container spacing={0} justify='flex-start'>
            
            {
              this.state.habits.map(habit => {
                return (
                    <HabitCard 
                      key={habit._id}
                      id={habit._id}  
                      description={habit.description} 
                      currentChain={habit.currentChain} 
                      longestChain={habit.longestChain}
                      goal={habit.goalChain}
                      createdDate={habit.createdDate} 
                      loadHabits={this.loadHabits}
                      handleSnack={this.handleSnack} />
                )             
              })
            }      
            
            {/* <AddHabit 
              userId={this.state.userId}
              loadHabits={this.loadHabits}
            /> */}
          </Grid>  
          <Tooltip id="tooltip-top" title="Add Habit" placement="top">  
            <Button onClick={this.handleClickOpen} fab color="primary" aria-label="add" className={classes.fab}>
              <AddIcon />
            </Button>
          </Tooltip>

          <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
            <AddHabitDialog 
              userId={this.state.userId} 
              handleRequestClose={this.handleRequestClose} 
              loadHabits={this.loadHabits}
            />
          </Dialog>   

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={this.state.snackbarOpen}
            autoHideDuration={4000}
            onRequestClose={this.handleSnackClose}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Habit Deleted</span>}
            action={[
              <Button key="undo" color="accent" dense onClick={this.handleRequestClose}>
                UNDO
              </Button>,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleSnackClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        
        </div>
    );
  }
}

export default withStyles(styles)(HabitPage);

