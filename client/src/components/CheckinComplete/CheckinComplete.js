import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CheckIcon from 'material-ui-icons/Check';
import CloseIcon from 'material-ui-icons/Close';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  card: {
    minWidth: 275,
    textAlign: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

function CheckinComplete(props) {
  const { classes } = props;

  return (
    <Grid item xs={12} sm={12} md={6}>
      <Card className={classes.card}>
        
        <Grid container spacing="16" justify="space-between">
            <Grid item xs="12">
              <CardHeader>
                <Typography type="display1" component="h2">
                  {props.description}
                </Typography>
              </CardHeader>
            </Grid>
          <CardContent>
            <Grid item>
              <Typography type="subheading" component="h2">
                Streak: {props.currentChain}
              </Typography>
            </Grid>
            <Grid item>
              <Typography type="subheading" component="h2">
                Goal: {props.goal}
              </Typography>
            </Grid>
          </CardContent>
        </Grid>

        <CardActions>
          <Grid container spacing="16" justify="space-around">
            <Grid item>
              <IconButton className={classes.menuButton} color="dark" aria-label="Menu">
                <CheckIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton className={classes.menuButton} color="dark" aria-label="Menu">
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