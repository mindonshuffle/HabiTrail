const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  description: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  schedule: { type: String, required: true, default: 'daily' },
  currentChain: { type: Number, default: 0 },
  longestChain: { type: Number, default: 0 },
  goalChain: { type: Number, default: 90 },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },  
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
