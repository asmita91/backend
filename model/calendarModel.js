const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true,
  },
  events: [{
    type: {
      type: String,
      enum: ['periodStart', 'periodEnd', 'fertileWindowStart', 'fertileWindowEnd'],
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  }]
}, { timestamps: true });

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
