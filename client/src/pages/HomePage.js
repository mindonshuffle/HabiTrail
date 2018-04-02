
import React, { Component } from 'react';
import moment from 'moment';
import API from '../utils/API.js';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import CheckinIncomplete from '../components/CheckinIncomplete/CheckinIncomplete.js';
import CheckinComplete from '../components/CheckinComplete/CheckinComplete.js';

const styles = theme => ({
  pageFrame: {
      marginLeft: '241px',
      marginTop: '0',
      width: `calc(100% - 255px)`,
    },
  prompt: {
    color: '#616161',
    marginLeft: '16px',
    marginTop: '16px',
    marginBottom: '0px',
  }
});

class HomePage extends Component {
  state = {
    userId: this.props.userId,
    pendingCheckins: [],
    completedCheckins: [],
    date: null,
  };

  componentWillMount() {
    console.log('Did receive (load):', this.props.date);
    let newDate = moment.utc(this.props.date).format('YYYYMMDD').toString();
    console.log('newDate: ', newDate);
    this.setState({date: newDate});
  }

  componentDidMount() {
    console.log('didMount date: ', this.state.date);
    this.loadCheckins(this.state.date, this.state.userId);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps){
      console.log('nextprops: ', nextProps.userId)
      let newDate = moment.utc(nextProps.date).format('YYYYMMDD').toString();
      this.setState({
        date: newDate,
        userId: nextProps.userId,
      });
      this.loadCheckins(newDate, nextProps.userId);
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(this.state, nextState)
  //   if( this.state.userId !== nextState.userId || this.state.date !== nextState.date ){
 
  //     return true;
  //   }
  //   return false;
  // }

  // componentDidUpdate() {
  //   console.log('updated userId: ', this.state.userId)
  //   this.loadCheckins(this.state.date, this.state.userId);
  // }

// retrieve all checkins for user with current date and sort into state arrays
  loadCheckins = (newDate, newId) => {
    console.log('Load checkins (current): ',newDate)
    console.log('Load checkins (fromState): ',this.state.date)
    console.log('Load userId: ', newId)
    
    API.getCheckins(this.state.userId, typeof newDate === 'string' ? newDate : this.state.date )
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
          
          {/* Show prompt only if pending checkins exist */}
          {this.state.pendingCheckins[0] ? (
            <Grid item xs={12}>
              <Typography className={classes.prompt} type="headline" component="h2">
                Today, did you...
              </Typography>
            </Grid>
          ):
          (<Grid />)}
        
          {
            this.state.pendingCheckins.map(checkin => {
              return (
                <CheckinIncomplete 
                key={checkin._id}
                id={checkin._id}  
                description={checkin.habitId.description} 
                habitId={checkin.habitId._id}
                longestChain={checkin.habitId.longestChain} 
                currentChain={checkin.habitId.currentChain} 
                goal={checkin.habitId.goalChain}
                loadCheckins={this.loadCheckins} />
              )             
            })
          }      
          
          {/* Only display Divider if checkins exist */}
          {
            this.state.pendingCheckins[0] ? 
              (<Grid item xs={12}>        
                <Divider style={{marginTop: '16px', marginLeft: '16px'}}/>
              </Grid>)
              :
              (<Grid item hidden={{xsUp: true}} xs={12}>
                <Divider />
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


