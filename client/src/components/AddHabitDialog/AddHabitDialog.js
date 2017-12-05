import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import API from '../../utils/API.js';
import moment from 'moment';

export default class AddHabitDialog extends React.Component {
  state = {
    userId: this.props.userId,
    description: '',
    goal: '90',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {

    const saveClick = () => {
        console.log(this.state)
        API.createHabit(this.state.userId, this.state.description, this.state.goal)
          .then(this.props.loadHabits);
        this.setState({description: '', goal: '90'});
        this.props.handleRequestClose();
    };
    const cancelClick = () => {
        this.setState({description: '', goal: '90'});
        this.props.handleRequestClose();
    };

    return (
      <div>
          <DialogTitle>Add New Habit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a brief description of the new daily habit you wish to begin tracking.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              placeholder="e.g. Take morning medicine"
              type="text"
              value={this.state.description}
              onChange={this.handleChange('description')}
              fullWidth
            />
            <FormControl>
                <InputLabel htmlFor="goal">
                    Goal
                </InputLabel>
                <Input
                    id="goal"
                    value={this.state.goal}
                    onChange={this.handleChange('goal')}
                    type="number" 
                    endAdornment={<InputAdornment position="end">Days</InputAdornment>}
                />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => saveClick()} color="primary">
              Add
            </Button>
            <Button onClick={() => cancelClick()} color="primary">
              Cancel
            </Button>
          </DialogActions>
      </div>
    );
  }
}