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
    opacity: '.65',
    minWidth: 275,
    textAlign: 'center',
  },
  cardHeader: {
    backgroundColor: '#5C6BC0',
  },
  title: {
    color: 'white',
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

  return (
    <Grid item xs={12} sm={12} md={6}>
      <Card className={classes.card}>
        
        <CardHeader title={props.description} classes={{title: classes.title}} className={classes.cardHeader} />
                  
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
        </CardContent>

        <CardActions>
          <Grid container spacing="16" justify="space-around">
            <Grid item>
              <IconButton className={classes.menuButton} color="dark" aria-label="Menu" onClick={() => confirmClick()}>
                <CheckIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton className={classes.menuButton} color="dark" aria-label="Menu" onClick={() => missedClick()}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>

      </Card>
    </Grid>
  );
}

CheckinComplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckinComplete);