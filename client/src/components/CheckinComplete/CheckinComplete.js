import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CheckIcon from 'material-ui-icons/Check';
import CloseIcon from 'material-ui-icons/Close';
import MoreIcon from 'material-ui-icons/MoreHoriz';
import Typography from 'material-ui/Typography';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import { LinearProgress } from 'material-ui/Progress';
import API from '../../utils/API.js';

const styles = theme => ({
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[400],
  },
  redAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: red[400],
  },
  card: {
    // opacity: '.65',
    minWidth: 275,
    textAlign: 'center',
  },
  cardHeader: {
    backgroundColor: '#5C6BC0',
  },
  title: {
    // marginRight: '8px',
    color: '#ffffff',
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

function CheckinComplete(props) {
  const { classes } = props;
  const confirmClick = () => {
    API.confirmCheckin(props.id)
      .then(props.loadCheckins);
  };
  const missedClick = () => {
    API.missedCheckin(props.id)
      .then(props.loadCheckins);
  };
  const avatar = props.status === 'Completed'? (
    <Avatar className={classes.greenAvatar}>
      <CheckIcon />
    </Avatar>
  ):(
    <Avatar className={classes.redAvatar}>
      <CloseIcon />
    </Avatar>
  );
  const progress = props.currentChain === 0 ? 0 : (props.currentChain / props.goal) * 100;

  return (
    <Grid item style={{paddingTop: '16px', paddingLeft: '16px' }} xs={12} sm={12} md={6}>
      <Card className={classes.card}>
        
        {/* <CardHeader title={props.description} avatar={avatar} classes={{title: classes.title}} className={classes.cardHeader} /> */}
        <CardContent className={classes.cardHeader}>
          <Grid container spacing="16" alignItems='center' justify="flex-start">
            {avatar}
            <Grid item>
              <Typography className={classes.title} type="headline" component="h2">
                {props.description}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>                  
        <CardContent>
          <Grid container spacing="16" justify="space-between">
            <Grid item xs="3">
              <Typography type="subheading" component="h2">
                Streak: {props.currentChain}
              </Typography>
            </Grid>
            <Grid item xs="3">
              <Typography type="subheading" component="h2">
                Goal: {props.goal}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing="16" justify="space-around">
            <Grid style={{width: '100%', margin: '15px', height: '10px'}} item >
              <LinearProgress mode="determinate" value={progress} />
            </Grid>
          </Grid>
          {/* <Grid container spacing="0" align-items="center" justify="flex-end">
            <Grid item >
              <IconButton color="default" className={classes.button}>
                <MoreIcon />
              </IconButton>
            </Grid>
          </Grid> */}
        </CardContent>

      </Card>
    </Grid>
  );
}

CheckinComplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckinComplete);