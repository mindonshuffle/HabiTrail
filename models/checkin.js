const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkinSchema = new Schema({
  date: { type: Date, required: true },  
  status: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  habit: { type: Schema.Types.ObjectId, ref: 'Habit' },
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
