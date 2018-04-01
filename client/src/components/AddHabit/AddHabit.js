import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
// import CheckIcon from 'material-ui-icons/Check';
import CloseIcon from 'material-ui-icons/Close';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import API from '../../utils/API.js';
import moment from 'moment';

const styles = theme => ({
  card: {
    minWidth: 275,
    // textAlign: 'center',
  },
  cardHeader: {
    textAlign: 'left',
    backgroundColor: '#5C6BC0',
  },
  title: {
    color: 'white',
  },
});

class AddHabit extends React.Component {

  state = {
    userId: this.props.userId,
    description: '',
    goal: '90',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    const saveClick = () => {
      console.log(this.state)
      API.createHabit(this.state.userId, this.state.description, this.state.goal)
        .then(this.props.loadHabits);
      this.setState({description: '', goal: '90'});
    };
    const cancelClick = () => {
      this.setState({description: '', goal: '90'});
    };
    
    return (
      <Grid item style={{paddingTop: '16px', paddingLeft: '16px' }} xs={12} sm={12} md={6}>
        <Card className={classes.card}>
          
          <CardHeader title="Add New Habit" classes={{title: classes.title}} className={classes.cardHeader} />
                    
          <CardContent>
            <Grid container spacing="16" justify="flex-start">
              <Grid item xs="12">
                  <TextField
                      label="Description"
                      value={this.state.description} 
                      onChange={this.handleChange('description')} 
                      placeholder="ex: Take morning medicine"
                      className={classes.textField}
                      fullWidth 
                      margin="normal"
                  />
                
              </Grid>
              <Grid item xs="12">
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="goal">
                      Goal
                    </InputLabel>
                    <Input
                      id="goal"
                      value={this.state.goal}
                      onChange={this.handleChange('goal')}
                      type="number" 
                      endAdornment={<InputAdornment position="end">Days</InputAdornment>}
                    />
                  </FormControl>
              </Grid>
              
              <Grid item xs="2">
                <Button raised className={classes.button} onClick={() => saveClick()}>
                  Save
                </Button>
              </Grid>

              <Grid item xs="1">
                
              </Grid>

              <Grid item xs="2">
                <Button raised className={classes.button}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </CardContent>

        </Card>
      </Grid>
    );
  }
}

AddHabit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddHabit);