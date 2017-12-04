import React, { Component } from 'react';
import moment from 'moment';

import API from '../utils/API.js';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
// import CheckinIncomplete from '../components/CheckinIncomplete/CheckinIncomplete.js';
// import CheckinComplete from '../components/CheckinComplete/CheckinComplete.js';
import HabitCard from '../components/HabitCard/HabitCard.js';
import AddHabit from '../components/AddHabit/AddHabit.js';

//temporary constant user
// const userId = 'a1f16bae5ece1c4dc4de68e'
const styles = theme => ({
    pageFrame: {
        // position: 'absolute',
        marginLeft: '240px',
        marginTop: '64px',
        width: `calc(100% - 290px)`,
        // backgroundColor: "red",
      },
});

class HabitPage extends Component {
  state = {
    userId: '5a1f16bae5ece1c4dc4de68e',
    habits: [],
    date: moment.utc().startOf('day').toString()
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
        {/* <Grid item xs={12} sm={10}> */}
          <Grid container spacing={16} justify='flex-start'>
            
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

            <AddHabit 
                userId={this.state.userId}
                loadHabits={this.loadHabits}
            />
          </Grid>     
        {/* </Grid> */}
        </div>
    );
  }
}

export default withStyles(styles)(HabitPage);

