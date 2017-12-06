import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CheckIcon from 'material-ui-icons/Check';
import DeleteIcon from 'material-ui-icons/Delete';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import API from '../../utils/API.js';
import moment from 'moment';

const styles = theme => ({
  card: {
    // minWidth: 500,
    // maxWidth: 275,
    textAlign: 'center',
  },
  cardHeader: {
    textAlign: 'left',
    backgroundColor: '#5C6BC0',
  },
  button: {
    marginTop: '12px',
  },
  title: {
    color: '#ffffff',
  },
  rightIcon: {
    color: '#616161',
    // marginLeft: theme.spacing.unit,
  }
});

function HabitCard(props) {
  const { classes } = props;

  const deleteClick = () => {
    API.deleteHabit(props.id)
    .then(props.loadHabits);
    props.handleSnack();
  };

  return (
    <Grid item style={{paddingTop: '16px', paddingLeft: '16px' }} xs={12} sm={12} md={6}>
      <Card className={classes.card}>
        
        {/* <CardHeader title={props.description} classes={{title: classes.title}} className={classes.cardHeader} /> */}
        <CardContent style={{textAlign: 'left', backgroundColor: '#ef5350'}}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item> 
              <Typography style={{color: '#ffffff', marginLeft: '0px'}} type="headline" component="h2">
                {props.description}
              </Typography>
            </Grid>
            <Grid item>
              <Button style={{backgroundColor: '#ffffff'}} raised color="default" dense onClick={() => deleteClick()}>
                <DeleteIcon className={classes.rightIcon} />
              </Button>
            </Grid>
          </Grid>
        </CardContent>          

        <CardContent>
          <Grid container spacing="16" justify="space-between">
            <Grid item xs="12" sm="4">
              <Typography type="subheading" component="h2">
                Current Streak: {props.currentChain}
              </Typography>
            </Grid>
            <Grid item xs="12" sm="4">
              <Typography type="subheading" component="h2">
                Longest Streak: {props.longestChain}
              </Typography>
            </Grid>
            <Grid item xs="12" sm="4">
              <Typography type="subheading" component="h2">
                Goal: {props.goal}
              </Typography>
            </Grid>
            <Grid item xs="12">
              <Typography type="subheading" component="h2">
                Starting Date: {moment(props.createdDate).format('MMMM Do, YYYY').toString()}
              </Typography>
            {/* <Grid item>
              <Button className={classes.button} raised color="accent" onClick={() => deleteClick()}>
                Delete
                <CloseIcon className={classes.rightIcon} />
              </Button>
            </Grid> */}
            </Grid>
          </Grid>
        </CardContent>

      </Card>
    </Grid>
  );
}

HabitCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HabitCard);