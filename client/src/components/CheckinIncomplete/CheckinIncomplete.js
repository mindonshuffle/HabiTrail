import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CheckIcon from 'material-ui-icons/Check';
import CloseIcon from 'material-ui-icons/Close';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import API from '../../utils/API.js';

const styles = theme => ({
  card: {
    minWidth: 275,
    textAlign: 'center',
  },
  cardHeader: {
    backgroundColor: '#283593',
  },
  title: {
    color: 'white',
  },
  button: {
    marginTop: '12px',
  },
  rightIcon: {
    // marginLeft: theme.spacing.unit,
  },
});

function CheckinIncomplete(props) {
  const { classes } = props;
  const confirmClick = () => {
    console.log(props);
    API.addToChain(props.habitId, props.currentChain, props.longestChain);
    API.confirmCheckin(props.id)
      .then(props.loadCheckins);
  };
  const missedClick = () => {
    API.resetChain(props.habitId, props.currentChain);
    API.missedCheckin(props.id)
      .then(props.loadCheckins);
  };

  return (
    <Grid item style={{paddingTop: '16px', paddingLeft: '16px' }} xs={12} sm={12} md={6}>
      <Card className={classes.card}>
        
        <CardHeader title={props.description} classes={{title: classes.title}} className={classes.cardHeader} />
                  
        <CardContent>
          <Grid container spacing="16" justify="space-between">
            {/* <Grid item xs="3">
              <Typography type="subheading" component="h2">
                Streak: {props.currentChain}
              </Typography>
            </Grid>
            <Grid item xs="3">
              <Typography type="subheading" component="h2">
                Goal: {props.goal}
              </Typography>
            </Grid> */}
            <Grid container spacing ="16" justify="space-around">
              <Grid item>
                <Button className={classes.button} style={{backgroundColor: '#66bb6a'}} raised color="contrast" onClick={() => confirmClick()}>
                  {/* Yes */}
                  <CheckIcon className={classes.rightIcon} />
                </Button>
              </Grid>
            
              <Grid item>
                <Button className={classes.button} style={{backgroundColor: '#ef5350'}} raised color="contrast" onClick={() => missedClick()}>
                  {/* No */}
                  <CloseIcon className={classes.rightIcon} />
                </Button>
              </Grid>

            </Grid>
          </Grid>
        </CardContent>
{/* 
        <CardActions>
          <Grid container spacing="16" justify="space-around">
          </Grid>
        </CardActions> */}

      </Card>
    </Grid>
  );
}

CheckinIncomplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckinIncomplete);