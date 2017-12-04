
import React, { Component } from 'react';
import moment from 'moment';
// import './App.css';
import API from '../utils/API.js';

import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
// import TopBar from '../components/TopBar/TopBar.js';
import CheckinIncomplete from '../components/CheckinIncomplete/CheckinIncomplete.js';
import CheckinComplete from '../components/CheckinComplete/CheckinComplete.js';

//temporary constant user
// const userId = 'a1f16bae5ece1c4dc4de68e'

class HomePage extends Component {
  state = {
    userId: '5a1f16bae5ece1c4dc4de68e',
    pendingCheckins: [],
    completedCheckins: [],
    date: moment.utc().startOf('day').toString()
  };

  componentDidMount() {
    this.loadCheckins();
  }

// retrieve all checkins for user with current date and sort into state arrays
  loadCheckins = () => {
    console.log(this.state.date)
    API.getCheckins(this.state.userId, '20171202')
    .then(res => {
      this.setState({pendingCheckins: [], completedCheckins: []});
      res.data.forEach( checkin =>{
        if(checkin.status === 'Incomplete'){
          this.setState({pendingCheckins: this.state.pendingCheckins.concat(checkin)});
        }
        else{
          this.setState({completedCheckins: this.state.completedCheckins.concat(checkin)});
        }
      })
      console.log('Pending:', this.state.pendingCheckins, 'Completed:', this.state.completedCheckins)
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
        <Grid item xs={12} sm={10}>
          <Grid container spacing={16} justify='flex-start'>
            
            {
              this.state.pendingCheckins.map(checkin => {
                return (
                    <CheckinIncomplete 
                      key={checkin._id}
                      id={checkin._id}  
                      description={checkin.habitId.description} 
                      currentChain={checkin.habitId.currentChain} 
                      goal={checkin.habitId.goalChain}
                      loadCheckins={this.loadCheckins} />
                )             
              })
            }      

            <Grid item xs={12}>
              <Divider light/>
            </Grid>

            {
              this.state.completedCheckins.map(checkin => {
                return (
                    <CheckinComplete 
                      key={checkin._id}
                      id={checkin._id}  
                      description={checkin.habitId.description} 
                      currentChain={checkin.habitId.currentChain} 
                      goal={checkin.habitId.goalChain}
                      loadCheckins={this.loadCheckins} />
                )             
              })
            }  

          </Grid>     
        </Grid>
    );
  }
}

export default HomePage;

