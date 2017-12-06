import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import ListIcon from 'material-ui-icons/List';
import { Link } from "react-router-dom";
import Grid from 'material-ui/Grid';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';

const drawerWidth = '240px';

const styles = theme => ({
  drawerPaper: {
    // display: "hidden",
    position: 'absolute',
    height: '100%',
    width: drawerWidth,
    // backgroundColor: "red",
  },
  drawerHeader: theme.mixins.toolbar,
  content: {
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    // [theme.breakpoints.up('sm')]: {
    //   height: 'calc(100% - 64px)',
    //   marginTop: 64,
    // },
  },
});

class AppDrawer extends React.Component {
 
  homeClick = () => {
    console.log('Ding!');
  };
  habitClick = () => {
    console.log('Dong!');
  };

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        type="permanent"
        style={{ position: 'fixed', height: '100%', left: 0, top: 0 }}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.drawerHeader}>
        </div>
        <Divider />

        {/* <Grid container direction="column" justify="spaceBetween"> */}
        {/* <Grid item xs={12}> */}
          <Link style={{ textDecoration: 'none' }} to="/">
            <ListItem button onClick={this.homeClick}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/habits">
            <ListItem button onClick={this.habitClick}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Habits" />
            </ListItem>
          </Link>
          
        {/* </Grid>
        <Grid item xs={12}> */}
        <div style={{position: 'absolute', bottom: '0', width: '240px'}}>
            <Divider />
            <ListItem button onClick={this.homeClick}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
        </div>
          {/* </Grid> */}
        {/* </Grid> */}
      </Drawer>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppDrawer);