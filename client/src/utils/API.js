import axios from "axios";

export default {
  // Gets all books
  getCheckins: function(userId, date) {
    return axios.get(`/api/user/${userId}/checkin/${date}`);
  },
  confirmCheckin: function(checkinId){
    return axios.put(`/api/checkin/${checkinId}`, {status: 'Completed'});
  },
  missedCheckin: function(checkinId){
    return axios.put(`/api/checkin/${checkinId}`, {status: 'Missed'});
  },
  getHabits: function(userId){
    return axios.get(`/api/user/${userId}/habit`);
  },
  createHabit: function(userId, description, goal){
    return axios.post('/api/habit', {
      userId: userId,
      description: description,
      goalChain: goal,
    });
  },
  deleteHabit: function(habitId){
    return axios.delete(`/api/habit/${habitId}`)
  },
  addToChain: function(habitId, currentChain, longestChain){
    if(currentChain+1 > longestChain){
      longestChain = currentChain+1;
    }
    return axios.put(`/api/habit/${habitId}`, {currentChain: currentChain+1, longestChain: longestChain});
  },
  resetChain: function(habitId, currentChain){
    return axios.put(`/api/habit/${habitId}`, {currentChain: 0});
  }

};