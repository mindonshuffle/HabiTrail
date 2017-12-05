
import React, { Component } from 'react';
import moment from 'moment';
// import './App.css';
import API from '../utils/API.js';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
// import TopBar from '../components/TopBar/TopBar.js';
import CheckinIncomplete from '../components/CheckinIncomplete/CheckinIncomplete.js';
import CheckinComplete from '../components/CheckinComplete/CheckinComplete.js';

//temporary constant user
// const userId = 'a1f16bae5ece1c4dc4de68e'

const styles = theme => ({
  pageFrame: {
      marginLeft: '241px',
      marginTop: '0',
      width: `calc(100% - 255px)`,
    },
});

class HomePage extends Component {
  state = {
    userId: '5a1f16bae5ece1c4dc4de68e',
    pendingCheckins: [],
    completedCheckins: [],
    date: moment().startOf('day').toString()
  };

  componentDidMount() {
    this.loadCheckins();
  }

// retrieve all checkins for user with current date and sort into state arrays
  loadCheckins = () => {
    console.log(this.state.date)
    API.getCheckins(this.state.userId, '20171204')
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
    const { classes } = this.props;    

    return (
        <div className={ classes.pageFrame }>
          <Grid container spacing={0} justify='flex-start'>
          {/* Only display Pending Section if checkins exist */}
                
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
            {
              this.state.pendingCheckins[0] ? 
                (<Grid item xs={12}>        
                  <Divider light style={{marginTop: '16px', marginLeft: '16px'}}/>
                </Grid>)
                :
                (<Grid item hidden={{xsUp: true}} xs={12}>
                  <Divider light/>
                </Grid>)    
            }

            {
              this.state.completedCheckins.map(checkin => {
                return (
                    <CheckinComplete 
                      key={checkin._id}
                      id={checkin._id}  
                      status={checkin.status}
                      description={checkin.habitId.description} 
                      currentChain={checkin.habitId.currentChain} 
                      goal={checkin.habitId.goalChain}
                      loadCheckins={this.loadCheckins} />
                )             
              })
            }  

          </Grid>     
        </div>
    );
  }
}

export default withStyles(styles)(HomePage);


