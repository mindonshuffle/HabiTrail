const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkinSchema = new Schema({
  date: { type: Date, required: true },  
  status: { type: String, default: 'Incomplete' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  habitId: { type: Schema.Types.ObjectId, ref: 'Habit' },
});

const Checkin = mongoose.model("Checkin", checkinSchema);

module.exports = Checkin;
