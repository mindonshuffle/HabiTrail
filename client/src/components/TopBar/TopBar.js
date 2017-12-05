import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Grid from 'material-ui/Grid';
import moment from 'moment';

const styles = theme => ({
  flex: {
    // flex: 1,
  },
  TopBar: {
    position: 'relative',
    width: `calc(100% - 241px)`,
    marginLeft: '240px',
    top: '0',
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 0,
  },
});

function ButtonAppBar(props) {
  const { classes } = props;
  const displayDate = moment(props.date).format('dddd, MMMM Do YYYY').toString();

  const DatePicker = (
    <Toolbar>
      <IconButton className={classes.menuButton} onClick={props.decDate} color="contrast" aria-label="Menu">
        <ChevronLeftIcon />
      </IconButton>
      <Typography type="title" color="inherit" className={classes.flex}>
        {displayDate}
      </Typography>
      <IconButton className={classes.menuButton} onClick={props.incDate} color="contrast" aria-label="Menu">
        <ChevronRightIcon />
      </IconButton>
    </Toolbar>
  )
  
  const HabitLabel = (
    <Toolbar>
      <IconButton className={classes.menuButton} onClick={props.incDate} color="contrast" aria-label="Menu">
      </IconButton>
      <Typography type="title" color="inherit" className={classes.flex}>
        Manage Habits
      </Typography>
      <IconButton className={classes.menuButton} onClick={props.incDate} color="contrast" aria-label="Menu">
      </IconButton>
    </Toolbar>
  )

  return (
    <Grid item xs={12} className={classes.root}>
      <AppBar className={classes.TopBar} position="static">
         {props.date ? DatePicker : HabitLabel}  
      </AppBar>
    </Grid>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);