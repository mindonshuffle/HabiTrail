import React, { Component } from 'react';
import './App.css';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import TopBar from './components/TopBar/TopBar.js';
import HabitCard from './components/HabitCard/HabitCard.js';

class App extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={16} justify='center'>
        
          
            <TopBar />
          
          
          <HabitCard />
        
          <HabitCard />
          
          <Grid item xs={12}>
            <Divider light/>
          </Grid>

          <HabitCard />
               
        </Grid>

        {/* <Grid container spacing={24}>
          <Card>
            <CardHeader title="Test Card"/>
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>

          <Card>
            <CardHeader title="Test Card"/>
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>
        </Grid> */}
      </div>
    );
  }
}

export default App;

