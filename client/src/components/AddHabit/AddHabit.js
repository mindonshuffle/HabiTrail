import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
// import CheckIcon from 'material-ui-icons/Check';
// import CloseIcon from 'material-ui-icons/Close';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import API from '../../utils/API.js';
import moment from 'moment';

const styles = theme => ({
  card: {
    minWidth: 275,
    textAlign: 'center',
  },
  cardHeader: {
    textAlign: 'left',
    backgroundColor: '#5C6BC0',
  },
  title: {
    color: 'white',
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  textField: {
    
  },
});

class AddHabit extends React.Component {

  state = {

  };

  render() {
    const { classes } = this.props;
    // const confirmClick = () => {
    //   API.confirmCheckin(props.id)
    //     .then(props.loadCheckins);
    // };
    // const missedClick = () => {
    //   API.missedCheckin(props.id)
    //     .then(props.loadCheckins);
    // };

    return (
      <Grid item xs={12} sm={12} md={6}>
        <Card className={classes.card}>
          
          <CardHeader title="Add New Habit" classes={{title: classes.title}} className={classes.cardHeader} />
                    
          <CardContent>
            <Grid container spacing="16" justify="space-between">
              <Grid item xs="12">
                  <TextField
                      label="Description"
                      placeholder="ex: Take morning medicine"
                      className={classes.textField}
                      fullWidth 
                      margin="normal"
                  />
                
              </Grid>
              <Grid item xs="12">
                  <TextField
                      label="Goal"
                      type="number" 
                      defaultValue="90" 
                      className={classes.textField}
                      margin="normal"
                  />
              </Grid>
    
              <Grid item xs="6">
                <Button raised className={classes.button}>
                  Save
                </Button>
              </Grid>

              <Grid item xs="6">
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