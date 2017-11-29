
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  card: {
    minWidth: 275,
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

function HabitCard(props) {
  const { classes } = props;

  return (
    <Grid item xs={12} sm={10} md={5}>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body1" className={classes.title}>
            Habit #1
          </Typography>
          <Typography type="headline" component="h2">
            Do the thing and do it well.
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>Done</Button>
          <Button dense>Not Done</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

HabitCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HabitCard);