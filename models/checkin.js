const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkinSchema = new Schema({
  date: { type: Date, required: true },  
  status: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  habitId: { type: Schema.Types.ObjectId, ref: 'Habit' },
});

const Habit = mongoose.model("Checkin", checkinSchema);

module.exports = Checkin;
