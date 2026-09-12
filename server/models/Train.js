const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  source: { type: String, required: true },      // e.g. "Delhi"
  destination: { type: String, required: true }, // e.g. "Mumbai"
  stations: [{ type: String }],                  // route ke beech ke stations
  departureTime: { type: String, required: true }, // "14:30"
  arrivalTime: { type: String, required: true },
  daysOfRun: [{ type: String }],  // ["Mon","Wed","Fri"]
  classes: [
    {
      type: { type: String, enum: ['SL', '3AC', '2AC', '1AC'], required: true },
      totalSeats: { type: Number, required: true },
      fare: { type: Number, required: true },
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Train', trainSchema);