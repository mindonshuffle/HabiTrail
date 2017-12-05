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

import Tooltip from 'material-ui/Tooltip';
import Dialog from 'material-ui/Dialog';

//temporary constant user
// const userId = 'a1f16bae5ece1c4dc4de68e'
const styles = theme => ({
    pageFrame: {
        // position: 'absolute',
        marginLeft: '241px',
        width: `calc(100% - 255px)`,
      },
    fab: {
        position: 'absolute',
        right: '30px',
        bottom: '30px',
    }
});

class HabitPage extends Component {
  state = {
    userId: '5a1f16bae5ece1c4dc4de68e',
    habits: [],
    date: moment.utc().startOf('day').toString(),
    dialogOpen: false,
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

// retrieve all checkins for user with current date and sort into state arrays
  loadHabits = () => {
    console.log('Getting Habits:')
    API.getHabits(this.state.userId)
    .then(res => {
        console.log(res);
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
                      loadHabits={this.loadHabits} />
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
        
        </div>
    );
  }
}

export default withStyles(styles)(HabitPage);

